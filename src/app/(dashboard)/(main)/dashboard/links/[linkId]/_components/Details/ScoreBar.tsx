import type { LinkScore } from "@/utils/link-score";

import { getScoreColor } from "@/lib/settings";
import clsx from "clsx";

type Props = {
	score: LinkScore;
};

export default function ScoreBar({ score }: Props) {
	if (score === "error" || score === undefined) {
		return <div className="absolute left-0 top-0 w-full h-6 bg-green-800" />;
	}

	const { fill, bg } = getScoreColor(score);

	return (
		<div className={clsx("absolute left-0 top-0 w-full h-6", bg)}>
			<div
				style={{ width: `${score}%` }}
				className={clsx("h-full relative", fill)}
			>
            <span className="text-background/90 font-black text-sm absolute w-full h-full flex items-center justify-end px-2">{score}%</span>
         </div>
		</div>
	);
}
