export const MAXIMUM_PROJECTS: number = 5;

export function getScoreColor(score: number): { bg: string; fill: string } {
	if (score >= 90)
		return {
			bg: "bg-emerald-200 dark:bg-green-900",
			fill: "bg-emerald-600 dark:bg-green-400",
		};
	if (score >= 80)
		return {
			bg: "bg-green-200 dark:bg-emerald-900",
			fill: "bg-green-600 dark:bg-emerald-400",
		};
	if (score >= 70)
		return {
			bg: "bg-lime-200 dark:bg-lime-900",
			fill: "bg-lime-600 dark:bg-lime-400",
		};
	if (score >= 60)
		return {
			bg: "bg-yellow-200 dark:bg-yellow-900",
			fill: "bg-yellow-600 dark:bg-yellow-400",
		};
	if (score >= 50)
		return {
			bg: "bg-amber-200 dark:bg-amber-900",
			fill: "bg-amber-600 dark:bg-amber-400",
		};
	if (score >= 40)
		return {
			bg: "bg-orange-200 dark:bg-orange-900",
			fill: "bg-orange-600 dark:bg-orange-400",
		};
	if (score >= 30)
		return {
			bg: "bg-red-200 dark:bg-red-900",
			fill: "bg-red-600 dark:bg-red-400",
		};
	return {
		bg: "bg-rose-200 dark:bg-rose-900",
		fill: "bg-rose-600 dark:bg-rose-400",
	};
}
