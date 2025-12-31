import ExpectedError from "@/components/ExpectedError";
import prisma from "@/lib/prisma";
import { getPublicResultMatrix, type Matrix } from "@/utils/get-result-matrix";
import { getPublicTests } from "@/utils/get-tests";
import { tryCatch } from "@/utils/try-catch";
import { notFound } from "next/navigation";

type Props = {
	params: Promise<{ link: string[] }>;
};

export default async function PublicTestPage({ params }: Props) {
	const linkParam = (await params).link.join("/");

	const request = await tryCatch(
		prisma.publicUrl.findFirst({
			where: { link: linkParam },
			select: { id: true, createdAt: true, actualUrl: true },
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
		<div>
			<pre>{JSON.stringify(link, null, 2)}</pre>
			<hr />
			<pre>{JSON.stringify(matrixResult, null, 2)}</pre>
			<hr />
			<pre>{JSON.stringify(testsResult, null, 2)}</pre>
		</div>
	);
}
