import "server-only";

import type { Severity } from "@/utils/types";
import type { UrlTestStatus } from "@/generated/prisma/enums";

import prisma from "@/lib/prisma";

export type Matrix = {
	name: string;
	severities: Record<Severity, Record<UrlTestStatus, number>>;
}[];

function blankCounters(): Record<Severity, Record<UrlTestStatus, number>> {
	return {
		1: { ok: 0, warning: 0, critical: 0 },
		2: { ok: 0, warning: 0, critical: 0 },
		3: { ok: 0, warning: 0, critical: 0 },
		4: { ok: 0, warning: 0, critical: 0 },
		5: { ok: 0, warning: 0, critical: 0 },
	};
}

export async function getResultMatrix(linkId: string): Promise<Matrix> {
	const [categories, urlTests] = await Promise.all([
		prisma.testCategory.findMany({
			select: { name: true },
		}),
		prisma.urlTest.findMany({
			where: { urlId: linkId },
			select: {
				status: true,
				test: {
					select: {
						severity: true,
						category: {
							select: { name: true },
						},
					},
				},
			},
		}),
	]);

	const rowsByCategory = new Map<string, Matrix[number]>(
		categories.map((c) => [
			c.name,
			{ name: c.name, severities: blankCounters() },
		])
	);

	for (const { status, test } of urlTests) {
		const severity = test.severity as Severity;
		const row = rowsByCategory.get(test.category.name);
		if (row) {
			row.severities[severity][status]++;
		}
	}

	return Array.from(rowsByCategory.values());
}
