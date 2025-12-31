"use server";

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
import { revalidateTag } from "next/cache";

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
	const html = urlRequest.data;

	const { data: urlRecord, error: urlError } = await tryCatch(
		prisma.publicUrl.upsert({
			where: { actualUrl_link: { actualUrl, link } },
			create: { actualUrl, link, ip },
			update: {},
			select: {
				id: true,
				link: true,
				publicUrlTests: {
					select: { createdAt: true },
					orderBy: { createdAt: "desc" },
					take: 1,
				},
			},
		})
	);

	if (urlError || !urlRecord) {
		console.error(urlError);
		return {
			redirect: null,
			error: "Failed to process link in the database",
		};
	}

	const urlId = urlRecord.id;
	const hasExistingTests = urlRecord.publicUrlTests.length > 0;

	if (hasExistingTests) {
		const latestTestDate = urlRecord.publicUrlTests[0].createdAt;
		const daysSinceLatestTest =
			(Date.now() - latestTestDate.getTime()) / (1000 * 60 * 60 * 24);
		if (daysSinceLatestTest < REFRESH_EXISTING_AFTER_DAYS) {
			return {
				redirect: `/tests/${urlRecord.link}?info=recent`,
				error: null,
			};
		}
	}

	const { data: tests, error: testsErr } = await tryCatch(
		evaluateTests(html, urlId)
	);

	if (testsErr) {
		return {
			redirect: `/tests/${link}?error=tests-failed`,
			error: null,
		};
	}

	if (!tests || tests.length === 0) {
		return {
			redirect: `/tests/${link}?error=no-tests`,
			error: null,
		};
	}

	const { data: score, error: scoreError } = await tryCatch(
		calculateScore(tests)
	);

	const { error: insertError } = await tryCatch(
		prisma.$transaction([
			prisma.publicUrl.update({
				data: { score: scoreError ? 0 : score ?? null },
				where: { id: urlId },
			}),
			prisma.publicUrlTest.deleteMany({ where: { urlId } }),
			prisma.publicUrlTest.createMany({ data: tests }),
		])
	);

	if (insertError) {
		console.error(insertError);
		return {
			redirect: `/tests/${link}?error=failed-to-insert`,
			error: null,
		};
	}

	// Invalidate the cache for this link so fresh data is fetched
	revalidateTag(`public-test:${link}`, "max");

	return {
		redirect: `/tests/${link}`,
		error: null,
	};
}
