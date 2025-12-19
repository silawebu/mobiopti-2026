import "server-only";

import type { Test, UrlTest } from "@/generated/prisma/client";

import prisma from "@/lib/prisma";

export type TestWithLastRun = Test & { lastRun: UrlTest | null };

export async function getTests(
	linkId: string,
	viewPaidTests: boolean
): Promise<TestWithLastRun[]> {
	const tests = await prisma.test.findMany({
		where: viewPaidTests ? {} : { isPaid: false },
		include: {
			urlTests: {
				where: { urlId: linkId },
				orderBy: { createdAt: "desc" },
				take: 1,
			},
		},
	});

	return tests.map(({ urlTests, ...test }) => ({
		...test,
		lastRun: urlTests[0] ?? null,
	}));
}
