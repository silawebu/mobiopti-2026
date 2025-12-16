import type { UrlWithScore } from "@/utils/append-scores";

import clsx from "clsx";
import { TriangleAlert } from "lucide-react";

type Props = {
	score: UrlWithScore["score"];
};

function getScoreColor(score: number): { bg: string; fill: string } {
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

export default function ScoreDisplay({ score }: Props) {
	if (typeof score === "number") {
		const { bg, fill } = getScoreColor(score);

		return (
			<div
				className={clsx(
					"h-7 w-[calc(100%+4px)] overflow-hidden z-50 absolute -left-[2px] border-double rounded-t-xl -top-5 border-x-2 border-t-2",
					bg
				)}
			>
				<div
					className={clsx(fill, "h-full rounded-tl-xl relative")}
					style={{ width: `${score}%` }}
				>
					<span className="text-background/90 font-black text-sm absolute w-full h-full flex items-center justify-end px-2">{score}%</span>
				</div>
			</div>
		);
	}

	if (score === "error") {
		return (
			<div className="h-7 w-[calc(100%+4px)] gap-2 flex items-center justify-center text-xs font-semibold bg-destructive-border overflow-hidden z-50 absolute -left-[2px] border-double border-destructive-border rounded-t-xl -top-5 border-x-2 border-t-2">
				<TriangleAlert className="w-3.5 h-3.5" />
				<span>Failed to count score</span>
			</div>
		);
	}

	return (
		<div className="h-7 w-[calc(100%+4px)] gap-2 flex items-center justify-center text-xs font-semibold bg-destructive-border overflow-hidden z-50 absolute -left-[2px] border-double border-destructive-border rounded-t-xl -top-5 border-x-2 border-t-2">
			<TriangleAlert className="w-3.5 h-3.5" />
			<span>Score not available</span>
		</div>
	);
}
