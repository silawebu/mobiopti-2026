import "server-only";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { PLANS, type PlanId, type Feature } from "./plans";

export async function getUserSubscription(userId: string) {
	const subscriptions = await auth.api.listActiveSubscriptions({
		query: { referenceId: userId },
		headers: await headers(),
	});

	return subscriptions.find((sub) => sub.status === "active") ?? null;
}

export async function getUserPlan(userId: string): Promise<PlanId> {
	const subscription = await getUserSubscription(userId);
	return (subscription?.plan as PlanId) ?? "free";
}

export async function hasFeature(userId: string, feature: Feature) {
	const plan = await getUserPlan(userId);
	return (PLANS[plan].features as readonly Feature[]).includes(feature);
}

export async function hasPlan(userId: string, requiredPlan: PlanId) {
	const plan = await getUserPlan(userId);
	const planOrder: PlanId[] = ["free", "premium"];
	return planOrder.indexOf(plan) >= planOrder.indexOf(requiredPlan);
}
