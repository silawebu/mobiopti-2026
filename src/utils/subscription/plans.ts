export const PLANS = {
	free: {
		name: "Free",
		features: ["add_link"],
	},
	premium: {
		name: "Premium",
		features: ["add_link", "paid_tests"],
	},
} as const;

export type PlanId = keyof typeof PLANS;
export type Feature = (typeof PLANS)[PlanId]["features"][number];
