import "server-only";

import type { UrlTestStatus } from "@/generated/prisma/enums";

import prisma from "@/lib/prisma";

export type TestWithLastRun = {
	severity: number;
	description: string | null;
	title: string;
	lastRun: {
		status: UrlTestStatus;
		content: string | null;
	} | null;
};

export async function getTests(
	linkId: string,
	viewPaidTests: boolean
): Promise<TestWithLastRun[]> {
	const tests = await prisma.test.findMany({
		where: viewPaidTests ? {} : { isPaid: false },
		select: {
			severity: true,
			description: true,
			title: true,
			urlTests: {
				where: { urlId: linkId },
				orderBy: { createdAt: "desc" },
				take: 1,
				select: {
					status: true,
					content: true,
				},
			},
		},
	});

	return tests.map(({ urlTests, ...test }) => ({
		...test,
		lastRun: urlTests[0] ?? null,
	}));
}

export async function getPublicTests(
	linkId: string
): Promise<TestWithLastRun[]> {
	const tests = await prisma.test.findMany({
		where: { isPaid: false },
		select: {
			severity: true,
			description: true,
			title: true,
			publicUrlTests: {
				where: { urlId: linkId },
				orderBy: { createdAt: "desc" },
				take: 1,
				select: {
					status: true,
					content: true,
				},
			},
		},
	});

	return tests.map(({ publicUrlTests, ...test }) => ({
		...test,
		lastRun: publicUrlTests[0] ?? null,
	}));
}
