import "server-only";

import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { getPublicResultMatrix } from "@/utils/get-result-matrix";
import { getPublicTests } from "@/utils/get-tests";

const CACHE_REVALIDATE_SECONDS = 3600;

export function getCachedPublicUrl(linkParam: string) {
	return unstable_cache(
		async () => {
			return prisma.publicUrl.findFirst({
				where: { link: linkParam },
				select: {
					id: true,
					createdAt: true,
					actualUrl: true,
					score: true,
					publicUrlTests: {
						select: { createdAt: true },
						orderBy: { createdAt: "desc" },
						take: 1,
					},
				},
			});
		},
		["public-url", linkParam],
		{
			revalidate: CACHE_REVALIDATE_SECONDS,
			tags: [`public-test:${linkParam}`],
		}
	)();
}

export function getCachedResultMatrix(linkId: string, linkParam: string) {
	return unstable_cache(
		async () => getPublicResultMatrix(linkId),
		["public-matrix", linkId],
		{
			revalidate: CACHE_REVALIDATE_SECONDS,
			tags: [`public-test:${linkParam}`],
		}
	)();
}

export function getCachedTests(linkId: string, linkParam: string) {
	return unstable_cache(
		async () => getPublicTests(linkId),
		["public-tests-list", linkId],
		{
			revalidate: CACHE_REVALIDATE_SECONDS,
			tags: [`public-test:${linkParam}`],
		}
	)();
}
