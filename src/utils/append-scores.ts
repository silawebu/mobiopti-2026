import "server-only";

import type { Url } from "@/generated/prisma/client";

import { Redis } from "@upstash/redis";

export type UrlWithScore = Url & { score: number | "error" | undefined };

const redis = Redis.fromEnv();

export async function appendScores(urls: Url[]): Promise<UrlWithScore[]> {
	if (urls.length === 0) return [];

	const keys = urls.map((url) => `mobiopti:linkscore:${url.id}`);
	const values = await redis.mget<string[]>(...keys);

	return urls.map((url, i) => {
		const kv = values[i];
		let score: UrlWithScore["score"] = undefined;

		if (kv === "error") {
			score = "error";
		} else if (kv !== null) {
			score = Math.round(parseFloat(kv));
		}

		return { ...url, score };
	});
}
