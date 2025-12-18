import "server-only";

import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export type LinkScore = number | "error" | undefined;

export async function getLinkScore(linkId: string): Promise<LinkScore> {
	const kv = await redis.get<string>(`mobiopti:linkscore:${linkId}`);

	let score: LinkScore = undefined;

	if (kv === "error") {
		score = "error";
	} else if (kv !== null) {
		score = Math.round(parseFloat(kv));
	}

	return score;
}
