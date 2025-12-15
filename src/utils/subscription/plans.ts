export const PLANS = {
	free: {
		name: "Free",
		features: ["basic_access"],
	},
	premium: {
		name: "Premium",
		features: ["basic_access", "advanced_features"],
	},
} as const;

export type PlanId = keyof typeof PLANS;
export type Feature = (typeof PLANS)[PlanId]["features"][number];
