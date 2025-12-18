import ExpectedError from "@/components/ExpectedError";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { hasFeature } from "@/utils/subscription";
import { tryCatch } from "@/utils/try-catch";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Details from "./_components/Details";

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

	const { data: link, error } = await tryCatch(
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
	);

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

	const isSubscribed: boolean = await hasFeature(session.user.id, "paid_tests");

	return (
		<div>
			<pre>{JSON.stringify(link, null, 2)}</pre>
		</div>
	);
}
