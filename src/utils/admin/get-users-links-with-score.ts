import "server-only";

import { appendScores, type UrlWithScore } from "../link-score";

import prisma from "@/lib/prisma";
import { tryCatch } from "../try-catch";

export async function getUsersLinksWithScore(
	userId: string
): Promise<UrlWithScore[]> {
	const urls = await prisma.url.findMany({ where: { userId: userId } });

	if (urls.length == 0) {
		return [];
	}

	const linksWithScore = await tryCatch(appendScores(urls));

	if (linksWithScore.error) {
		console.error(`[getUsersLinksWithScore:${userId}]`, linksWithScore.error);
		throw new Error("Failed to append scores to links");
	}

	return linksWithScore.data;
}
