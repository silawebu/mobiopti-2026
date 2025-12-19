import type { LinkScore } from "@/utils/link-score";

import { getScoreColor } from "@/lib/settings";
import clsx from "clsx";
import { TriangleAlert } from "lucide-react";

type Props = {
	score: LinkScore;
};

export default function ScoreBar({ score }: Props) {
	if (score === "error") {
		return (
			<div className="absolute left-0 top-0 w-full h-6 gap-2 flex items-center justify-center text-xs font-semibold bg-destructive-border overflow-hidden z-50 border-double border-destructive-border rounded-t-xl border-x-2 border-t-2">
				<TriangleAlert className="w-3.5 h-3.5" />
				<span>Failed to count score</span>
			</div>
		);
	}

	if (score === undefined) {
		return (
			<div className="absolute left-0 top-0 w-full h-6 gap-2 flex items-center justify-center text-xs font-semibold bg-destructive-border overflow-hidden z-50 border-double border-destructive-border rounded-t-xl border-x-2 border-t-2">
				<TriangleAlert className="w-3.5 h-3.5" />
				<span>Score not available</span>
			</div>
		);
	}

	const { fill, bg } = getScoreColor(score);

	return (
		<div className={clsx("absolute left-0 top-0 w-full h-6", bg)}>
			<div
				style={{ width: `${score}%` }}
				className={clsx("h-full relative", fill)}
			>
				<span className="text-background/90 font-black text-sm absolute w-full h-full flex items-center justify-end px-2">
					{score}%
				</span>
			</div>
		</div>
	);
}
