import { auth } from "@/lib/auth";
import { getUserSubscription } from "@/utils/subscription";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import SuccessInterface from "./_components/SuccessInterface";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function SubscriptionSuccessPage({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session) {
		redirect("/");
	}

	const subscription = await getUserSubscription(session.user.id);

	if (!subscription?.periodStart) {
		notFound();
	}

	if (!isWithinLastHour(subscription.periodStart)) {
		notFound();
	}

	const { redirect: redirectTo } = await searchParams;

	const redirectPath =
		typeof redirectTo === "string" ? redirectTo : "/dashboard/links";

	return <SuccessInterface redirectTo={redirectPath} />;
}

function isWithinLastHour(date: Date): boolean {
	const ONE_HOUR_MS = 60 * 60 * 1000;
	return Date.now() - date.getTime() < ONE_HOUR_MS;
}
