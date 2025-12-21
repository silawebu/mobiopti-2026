import type { UrlWithScore } from "@/utils/link-score";

import { getScoreColor } from "@/lib/settings";
import clsx from "clsx";
import { TriangleAlert } from "lucide-react";

type Props = {
	score: UrlWithScore["score"];
};

export default function ScoreDisplay({ score }: Props) {
	if (typeof score === "number") {
		const { bg, fill } = getScoreColor(score);

		return (
			<div
				className={clsx(
					"h-[25px] w-[calc(100%+4px)] overflow-hidden z-50 absolute -left-[2px] border-double rounded-t-xl top-[-25px] border-x-2 border-t-2",
					bg
				)}
			>
				<div
					className={clsx(fill, "h-full rounded-tl-xl relative")}
					style={{ width: `${score}%` }}
				>
					<span className="text-background/90 font-black text-sm absolute w-full h-full flex items-center justify-end px-2">
						{score}%
					</span>
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
