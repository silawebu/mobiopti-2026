"use server";

import * as z from "zod";
import { linkSchema } from "./_components/HomeLinkInput";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getIp } from "@/utils/get-ip";
import { validateLink } from "@/utils/url/validator";

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

	return {
		redirect: "/test/zsf.cz/kontakt",
		error: null,
	};
}
