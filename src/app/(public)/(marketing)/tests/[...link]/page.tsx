import ResultMatrix from "@/app/(private)/(app)/(sidebar)/dashboard/links/[linkId]/_components/ResultMatrix";
import TestsView from "@/app/(private)/(app)/(sidebar)/dashboard/links/[linkId]/_components/TestsView";
import ExpectedError from "@/components/ExpectedError";
import {
	getCachedPublicUrl,
	getCachedResultMatrix,
	getCachedTests,
} from "@/lib/cache/public-tests";
import { tryCatch } from "@/utils/try-catch";
import { notFound } from "next/navigation";
import Details from "./_components/Details";
import SignInBanner from "./_components/SignInBanner";

type Props = {
	params: Promise<{ link: string[] }>;
};

export default async function PublicTestPage({ params }: Props) {
	const linkParam = (await params).link.join("/");

	const request = await tryCatch(getCachedPublicUrl(linkParam));

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
		tryCatch(getCachedResultMatrix(link.id, linkParam)),
		tryCatch(getCachedTests(link.id, linkParam)),
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
				view={"public"}
				testsResult={testsResult}
				bottom={<SignInBanner actualUrl={link.actualUrl} />}
				linkId=""
			/>
		</div>
	);
}
