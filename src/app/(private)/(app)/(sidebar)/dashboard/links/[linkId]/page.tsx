import ExpectedError from "@/components/ExpectedError";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { hasFeature } from "@/utils/subscription";
import { tryCatch } from "@/utils/try-catch";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Details from "./_components/Details";
import { getLinkScore } from "@/utils/link-score";
import ResultMatrix from "./_components/ResultMatrix";
import { getResultMatrix, type Matrix } from "@/utils/get-result-matrix";
import { getTests } from "@/utils/get-tests";
import TestsView from "./_components/TestsView";
import SubscribeToSeeAllTests from "./_components/TestsView/SubscribeToSeeAllTests";

export const dynamic = "force-dynamic";

type Props = {
	params: Promise<{ linkId: string }>;
};

export default async function LinkDetailPage({ params }: Props) {
	const { linkId } = await params;

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect(
			`/login?redirect=${encodeURIComponent(`/dashboard/links/${linkId}`)}`
		);
	}

	const [{ data: link, error }, isSubscribed] = await Promise.all([
		tryCatch(
			prisma.url.findUnique({
				where: {
					id: linkId,
					userId: session.user.id,
				},
				select: {
					url: true,
					createdAt: true,
				},
			})
		),
		hasFeature(session.user.id, "paid_tests"),
	]);

	if (error) {
		console.error(error);
		return (
			<ExpectedError
				link={{ href: "/dashboard/links", text: "Back to all links" }}
				message="Failed to check if the link exists"
			/>
		);
	}

	if (!link) {
		notFound();
	}

	const [score, matrixResult, testsResult] = await Promise.all([
		getLinkScore(linkId),
		tryCatch(getResultMatrix(linkId)),
		tryCatch(getTests(linkId, isSubscribed)),
	]);

	const description: string | null = getSubscribeBannerDescription(
		matrixResult.data
	);

	return (
		<div className="flex flex-col gap-5">
			<Details {...link} score={score} linkId={linkId} />
			<ResultMatrix matrixResult={matrixResult} linkId={linkId} />
			<TestsView
				view="private"
				testsResult={testsResult}
				bottom={
					isSubscribed ? (
						<SubscribeToSeeAllTests linkId={linkId} description={description} />
					) : null
				}
				linkId={linkId}
			/>
		</div>
	);
}

function getSubscribeBannerDescription(matrix: Matrix | null): string | null {
	if (matrix == null) {
		return null;
	}

	let ok = 0;
	let warning = 0;
	let critical = 0;

	for (const category of matrix) {
		for (const severity of Object.values(category.severities)) {
			ok += severity.ok;
			warning += severity.warning;
			critical += severity.critical;
		}
	}

	return `To see ${critical} critical, ${warning} warnings, ${ok} okay test results`;
}
