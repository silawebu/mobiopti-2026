"use server";

import { Prisma } from "@/generated/prisma/client";
import * as z from "zod";
import { linkSchema } from "./_components/HomeLinkInput";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getIp } from "@/utils/get-ip";
import { validateLink } from "@/utils/url/validator";
import axios, { type AxiosResponse } from "axios";
import { fetchPage } from "@/utils/url/fetcher";
import { ERROR_MESSAGES } from "@/utils/url/error-messages";
import { tryCatch } from "@/utils/try-catch";
import prisma from "@/lib/prisma";
import { calculateScore, evaluateTests } from "@/lib/tests";

const REFRESH_EXISTING_AFTER_DAYS = 3;

const rateLimit = new Ratelimit({
	redis: Redis.fromEnv(),
	limiter: Ratelimit.slidingWindow(3, "10 s"),
	prefix: "mobiopti",
});

export async function executePublicTests(values: z.infer<typeof linkSchema>) {
	const isDev = process.env.NODE_ENV === "development";

	const rawIp = await getIp();
	const ip = rawIp ?? (isDev ? "127.0.0.1" : null);

	if (!ip) {
		return {
			redirect: null,
			error: "Unable to verify the source of the request",
		};
	}

	const { success } = await rateLimit.limit(ip);

	if (!success) {
		return {
			redirect: null,
			error: "Slow down! You can add only couple of links after each other",
		};
	}

	const validate = validateLink(values.link);

	if (!validate.success) {
		return {
			redirect: null,
			error: validate.error,
		};
	}

	const { url } = validate;

	let html: null | string = null;

	let urlRequest: AxiosResponse;

	try {
		urlRequest = await fetchPage(url);
	} catch (err) {
		if (axios.isAxiosError(err)) {
			const key = err.code ?? err.response?.status?.toString();
			const message = ERROR_MESSAGES[key ?? ""] ?? ERROR_MESSAGES.default;
			return { redirect: null, error: message };
		}
		return { redirect: null, error: ERROR_MESSAGES.default };
	}

	if (!urlRequest?.data || !urlRequest.request.res.responseUrl) {
		return {
			redirect: null,
			error: "Failed to retrieve link data",
		};
	}

	const actualUrl: string = urlRequest.request.res.responseUrl;
	const link = actualUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

	const exists = await tryCatch(
		prisma.publicUrl.findFirst({
			where: {
				link: link,
			},
			select: {
				id: true,
				link: true,
				updatedAt: true,
			},
		})
	);

	if (exists.error) {
		return {
			redirect: null,
			error: "Failed to check if this link already exists",
		};
	}

	if (exists.data && exists.data.updatedAt) {
		const daysSinceUpdate =
			(Date.now() - exists.data.updatedAt.getTime()) / (1000 * 60 * 60 * 24);
		if (daysSinceUpdate < REFRESH_EXISTING_AFTER_DAYS) {
			return {
				redirect: `/tests/${exists.data.link}?warning=old-results`,
				error: null,
			};
		}
	}

	html = urlRequest.data;

	if (!html) {
		return {
			redirect: null,
			error: "Could not load the website's content",
		};
	}

	let urlId: string | null = null;

	if (exists.data) {
		urlId = exists.data.id;
	} else {
		const { data: newUrl, error: newUrlError } = await tryCatch(
			prisma.publicUrl.create({
				data: {
					actualUrl: actualUrl,
					link: link,
					ip: ip,
				},
				select: { id: true },
			})
		);

		if (!newUrl || newUrlError) {
			console.error(newUrlError);
			return {
				redirect: null,
				error: "Failed to add new link to the database",
			};
		}

		urlId = newUrl.id;
	}

	const { data: tests, error: testsErr } = await tryCatch(
		evaluateTests(html, urlId)
	);

	if (testsErr) {
		return {
			redirect: `/tests/${link}?warning=tests-failed`,
			error: null,
		};
	}

	const { data: score, error: scoreError } = await tryCatch(
		calculateScore(tests)
	);

	await prisma.publicUrl.update({
		data: { score: scoreError ? 0 : score ?? null },
		where: {
			id: urlId,
		},
	});

	const { error: insertError } = await tryCatch(
		prisma.publicUrlTest.createMany({ data: tests })
	);

	if (insertError) {
		console.error(insertError);
		return {
			redirect: `/tests/${link}?warning=tests-failed-to-insert`,
			error: null,
		};
	}

	return {
		redirect: `/tests/${link}`,
		error: null,
	};
}
