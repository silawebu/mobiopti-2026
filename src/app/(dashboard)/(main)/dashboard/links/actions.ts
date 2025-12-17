"use server";

import * as z from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { linkFormSchema } from "./_components/NewLinkDialog";
import { getIp } from "@/utils/get-ip";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { hasFeature } from "@/utils/subscription";
import prisma from "@/lib/prisma";
import { tryCatch } from "@/utils/try-catch";
import { MAXIMUM_PROJECTS } from "@/lib/settings";
import { isValidPageUrl } from "@/utils/url/validator";
import { ERROR_MESSAGES } from "@/utils/url/error-messages";
import axios, { type AxiosResponse } from "axios";
import { fetchPage } from "@/utils/url/fetcher";
import { Prisma } from "@/generated/prisma/client";
import { evaluateTests, calculateScore } from "@/lib/tests";
import { revalidatePath } from "next/cache";

const redis = Redis.fromEnv();

const rateLimit = new Ratelimit({
	redis: redis,
	limiter: Ratelimit.slidingWindow(3, "10 s"),
	prefix: "mobiopti:addlink",
});

const delRateLimit = new Ratelimit({
	redis: redis,
	limiter: Ratelimit.slidingWindow(5, "60 s"),
	prefix: "mobiopti:deletelink",
});

export async function addLink(values: z.infer<typeof linkFormSchema>) {
	const isDev = process.env.NODE_ENV === "development";

	const rawIp = await getIp();
	const ip = rawIp ?? (isDev ? "127.0.0.1" : null);

	if (!ip) {
		return {
			error: "Unable to verify the source of the request",
		};
	}

	const { success } = await rateLimit.limit(ip);

	if (!success) {
		return {
			error: "Slow down! You can add only couple of links after each other",
		};
	}

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return { error: "Only authenticated users can add link" };
	}

	const allowedToAdd = await hasFeature(session.user.id, "add_link");

	if (!allowedToAdd) {
		return { error: "You are not allowed to add new links" };
	}

	const { data: urlCount, error: urlCountError } = await tryCatch(
		prisma.url.count({
			where: {
				userId: session.user.id,
			},
		})
	);

	if (urlCountError) {
		return { error: "Failed to check number of links you already use" };
	}

	if (urlCount && urlCount >= MAXIMUM_PROJECTS) {
		return {
			error: "You already have maximum number of allowed links",
		};
	}

	if (!isValidPageUrl(values.url)) {
		return {
			error: "Link you have provided is not valid",
		};
	}

	const url = values.url.trim();

	let html: null | string = null;

	let urlRequest: AxiosResponse;

	try {
		urlRequest = await fetchPage(url);
	} catch (err) {
		if (axios.isAxiosError(err)) {
			const key = err.code ?? err.response?.status?.toString();
			const message = ERROR_MESSAGES[key ?? ""] ?? ERROR_MESSAGES.default;
			return { error: message };
		}
		return { error: ERROR_MESSAGES.default };
	}

	if (!urlRequest?.data || !urlRequest.request.res.responseUrl) {
		return {
			error: "Failed to retrieve link data",
		};
	}

	html = urlRequest.data;

	if (!html) {
		return {
			error: "Could not load the website HTML content",
		};
	}

	const { data: newProject, error: newProjectErr } = await tryCatch(
		prisma.url.create({
			data: {
				url: urlRequest.request.res.responseUrl,
				userId: session.user.id,
			},
			select: { id: true },
		})
	);

	if (!newProject || newProjectErr) {
		console.error(newProjectErr);

		if (
			newProjectErr instanceof Prisma.PrismaClientKnownRequestError &&
			newProjectErr.code === "P2002"
		) {
			return {
				error:
					"You already have this link - you cannot add the same URLs twice",
			};
		}

		return {
			error: "Failed to add new project to the database",
		};
	}

	const { data: tests, error: testsErr } = await tryCatch(
		evaluateTests(html, newProject.id)
	);

	if (testsErr) {
		revalidatePath("/dashboard/links");
		return {
			error:
				"Link was succefully added but the initial tests failed. Try again from the dashboard!",
		};
	}

	const { data: score, error: scoreError } = await tryCatch(
		calculateScore(tests)
	);

	if (scoreError) {
		await redis.set(`mobiopti:linkscore:${newProject.id}`, "error");
	} else {
		await redis.set(`mobiopti:linkscore:${newProject.id}`, score.toString());
	}

	const { error: insertError } = await tryCatch(
		prisma.urlTest.createMany({ data: tests })
	);

	if (insertError) {
		console.error(insertError);
		revalidatePath("/dashboard/links");
		return {
			error:
				"Link was succefully added but the initial tests failed while saving to the databse. Try again from the dashboard!",
		};
	}

	revalidatePath("/dashboard/links");

	return {
		error: null,
	};
}

export async function deleteLink(urlId: string) {
	const isDev = process.env.NODE_ENV === "development";

	const rawIp = await getIp();
	const ip = rawIp ?? (isDev ? "127.0.0.1" : null);

	if (!ip) {
		return {
			error: "Unable to verify the source of the request",
		};
	}

	const { success } = await delRateLimit.limit(ip);

	if (!success) {
		return {
			error: "Slow down! You can delete only couple of links after each other",
		};
	}

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return { error: "Only authenticated users can delete a link" };
	}

	const linkExists = await tryCatch(
		prisma.url.findUnique({
			where: {
				id: urlId,
				userId: session.user.id,
			},
		})
	);

	if (linkExists.error) {
		console.error(linkExists.error);
		return {
			error: "Failed to check if the link exists",
		};
	}

	if (linkExists.data == null) {
		return {
			error: "Link you want to delete does not exist",
		};
	}

	const { error: deleteLink } = await tryCatch(
		prisma.url.delete({ where: { id: urlId, userId: session.user.id } })
	);

	if (deleteLink) {
		console.error(deleteLink);
		return {
			error: "Failed to delete the link",
		};
	}

	await redis.del(`mobiopti:linkscore:${urlId}`);

	revalidatePath("/dashboard/links");

	return {
		error: null,
	};
}
