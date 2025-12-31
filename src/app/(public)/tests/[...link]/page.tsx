import ResultMatrix from "@/app/(private)/(app)/(sidebar)/dashboard/links/[linkId]/_components/ResultMatrix";
import TestsView from "@/app/(private)/(app)/(sidebar)/dashboard/links/[linkId]/_components/TestsView";
import ExpectedError from "@/components/ExpectedError";
import prisma from "@/lib/prisma";
import { getPublicResultMatrix, type Matrix } from "@/utils/get-result-matrix";
import { getPublicTests } from "@/utils/get-tests";
import { tryCatch } from "@/utils/try-catch";
import { notFound } from "next/navigation";
import Details from "./_components/Details";

type Props = {
	params: Promise<{ link: string[] }>;
};

export default async function PublicTestPage({ params }: Props) {
	const linkParam = (await params).link.join("/");

	const request = await tryCatch(
		prisma.publicUrl.findFirst({
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
		})
	);

	if (request.error) {
		console.error(request.error);
		return (
			<ExpectedError
				link={{ href: "/dashboard/links", text: "Back to homepage" }}
				message="Failed to check if the link exists"
			/>
		);
	}

	const { data: link } = request;

	if (!link) {
		notFound();
	}

	const [matrixResult, testsResult] = await Promise.all([
		tryCatch(getPublicResultMatrix(link.id)),
		tryCatch(getPublicTests(link.id)),
	]);

	return (
		<div className="flex flex-col gap-5">
			<Details
				url={link.actualUrl}
				createdAt={link.createdAt}
				score={link.score}
				linkId={link.id}
				lastTestRun={link.publicUrlTests[0].createdAt ?? null}
			/>
			<ResultMatrix matrixResult={matrixResult} linkId={link.id} />
			<TestsView
				testsResult={testsResult}
				subscription={{
					description: null,
					isSubscribed: true,
					linkId: link.id,
				}}
			/>
		</div>
	);
}
