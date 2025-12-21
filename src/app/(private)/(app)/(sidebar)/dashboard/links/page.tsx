import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { tryCatch } from "@/utils/try-catch";
import prisma from "@/lib/prisma";
import ExpectedError from "@/components/ExpectedError";
import PageLayout from "./_components/PageLayout";
import { appendScores, type UrlWithScore } from "@/utils/link-score";
import UrlSlotCard from "./_components/UrlSlotCard";
import { hasFeature } from "@/utils/subscription";
import SubscribeBanner from "@/components/Subscription/SubscribeBanner";


export type LinkSlot = UrlWithScore | null;

export default async function LinksPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect(`/login?redirect=${encodeURIComponent("/dashboard/links")}`);
	}

	const isSubscribed: boolean = await hasFeature(session.user.id, "paid_tests");

	const { data, error } = await tryCatch(
		prisma.url.findMany({
			where: { userId: session.user.id },
			orderBy: { createdAt: "asc" },
		})
	);

	if (error) {
		return (
			<PageLayout actionDisabled={true}>
				<ExpectedError
					message="Failed to fetch your links"
					link={{ text: "Go to dashboard", href: "/dashboard" }}
				/>
			</PageLayout>
		);
	}

	const linksWithScore = await tryCatch(appendScores(data));

	if (linksWithScore.error) {
		return (
			<PageLayout actionDisabled={true}>
				<ExpectedError
					message="Failed to fetch score of your links"
					link={{ text: "Go to dashboard", href: "/dashboard" }}
				/>
			</PageLayout>
		);
	}

	let links: LinkSlot[] = linksWithScore.data;

	while (links.length < 5) {
		links.push(null);
	}

	return (
		<PageLayout actionDisabled={data.length >= 5}>
			<div className="flex flex-col">
				{!isSubscribed && (
					<section>
						<SubscribeBanner />
					</section>
				)}
				<section className="flex flex-col gap-4 md:gap-6">
					{links.slice(0, 5).map((slot, index) => (
						<UrlSlotCard
							key={slot?.id ?? `empty-${index}`}
							slot={slot}
							index={index}
						/>
					))}
				</section>
			</div>
		</PageLayout>
	);
}
