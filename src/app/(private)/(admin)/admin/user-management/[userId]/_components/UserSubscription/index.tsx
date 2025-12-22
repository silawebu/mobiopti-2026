import type { Subscription } from "@/generated/prisma/client";

import SubLayout from "./SubLayout";
import SubError from "./SubError";
import StripeLink from "../StripeLink";
import SubCard from "@/app/(private)/(app)/(sidebar)/dashboard/account/_components/Subscription/SubCard";
import { Circle } from "lucide-react";
import ManualAccess from "./ManualAccess";

type SubscriptionResult =
	| { data: Subscription | null; error: null }
	| { data: null; error: Error };

type Props = {
	subscriptionResult: SubscriptionResult;
	userId: string;
};

export default function UserSubscription({
	subscriptionResult,
	userId,
}: Props) {
	const { data: subscription, error } = subscriptionResult;

	if (error) {
		return (
			<SubLayout>
				<SubError />
			</SubLayout>
		);
	}

	if (!subscription) {
		return (
			<SubLayout actions={<ManualAccess action="grant" userId={userId} />}>
				<div className="flex flex-col gap-8 xl:flex-row xl:items-center md:gap-4 py-3 md:py-0 xl:gap-8">
					<div className="flex items-center justify-start gap-3.5 relative">
						<div className="hidden sm:flex rounded-md shrink-0 bg-accent/25 border-border/75 border w-14 h-14 md:w-16 md:h-16 items-center justify-center">
							<Circle />
						</div>
						<div className="flex flex-col gap-1.5">
							<p className="text-xs leading-none">Current plan</p>
							<h2 className="text-lg md:text-xl flex items-center gap-2 font-bold w-full leading-none truncate capitalize">
								Free
							</h2>
						</div>
					</div>
				</div>
			</SubLayout>
		);
	}

	return (
		<SubLayout
			actions={
				subscription.stripeSubscriptionId === null && (
					<ManualAccess action="revoke" userId={userId} />
				)
			}
			footer={
				subscription.stripeSubscriptionId && (
					<StripeLink
						type="subscriptions"
						value={subscription.stripeSubscriptionId}
					/>
				)
			}
		>
			<div>
				<SubCard
					cancelAtPeriodEnd={subscription.cancelAtPeriodEnd}
					periodEnd={subscription.periodEnd}
					periodStart={subscription.periodStart}
					plan={subscription.plan}
				/>
			</div>
		</SubLayout>
	);
}
