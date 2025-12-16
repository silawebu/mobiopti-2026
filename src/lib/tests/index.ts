import "server-only";

import * as cheerio from "cheerio";
import { testDefinitions } from "./definitions";
import { UrlTest } from "@/generated/prisma/client";
import prisma from "../prisma";
import { tryCatch } from "@/utils/try-catch";

export async function evaluateTests(
	html: string,
	urlId: string
): Promise<UrlTest[]> {
	const $ = cheerio.load(html);

	const createdAt = new Date();

	const tests = await Promise.all(
		testDefinitions.map(async (def) => {
			const { status, message, content } = await def.evaluate($);

			const insert: UrlTest = {
				testId: def.id,
				urlId: urlId,
				createdAt,
				status,
				message,
				content,
			};

			return insert;
		})
	);

	return tests;
}

export async function calculateScore(tests: UrlTest[]): Promise<number> {
	const { data: testDefs, error: testDefsErr } = await tryCatch(
		prisma.test.findMany()
	);

	if (!testDefs || testDefsErr) {
		throw new Error(
			"Failed to fetch test. Either they do not yet exists or it failed to fetch them."
		);
	}

	const maxPoints = testDefs.reduce((acc, cur) => acc + cur.maxPoints, 0);
	let points: number = 0;

	for (let i = 0; i < testDefs.length; i++) {
		const test = tests.find((t) => t.testId == testDefs[i].id);

		if (test === undefined) continue;

		switch (test.status) {
			case "ok":
				points = points + testDefs[i].maxPoints;
				break;
			case "warning":
				points = points + testDefs[i].maxPoints * 0.5;
				break;
		}
	}

	const score: number = points * (100 / maxPoints);

	return score;
}
