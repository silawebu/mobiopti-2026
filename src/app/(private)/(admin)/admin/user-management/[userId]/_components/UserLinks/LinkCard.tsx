import { getScoreColor } from "@/lib/settings";
import { cn } from "@/lib/utils";
import type { UrlWithScore } from "@/utils/link-score";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { format } from "date-fns";
import { Link2, TriangleAlert } from "lucide-react";

type Props = UrlWithScore;

const slotVariants = cva(
	"w-full border-double h-[85px] relative mt-[20px] border-x-2 border-b-2 rounded-xl rounded-t-none duration-150 shadow-xl",
	{
		variants: {
			variant: {
				default:
					"bg-linear-to-br from-muted to-muted-80 text-muted-foreground border-border",
				error:
					"bg-linear-to-br from-destructive-from to-destructive-to text-destructive-foreground border-destructive-border",
			},
		},
	}
);

export default function LinkCard({ score, url, createdAt }: Props) {
	return (
		<div className={cn(slotVariants(scoreStyle(score)))}>
			<ScoreDisplay score={score} />
			<div className="h-full w-full flex items-center justify-between gap-3 pr-4">
				<div className="flex duration-150 h-full items-start justify-center flex-col pl-4 gap-1 min-w-0 flex-1 mr-4">
					<div className="flex items-center gap-2">
						<Link2 className="w-4 h-4 text-foreground/75 shrink-0 hidden sm:block" />
						<p className="text-sm sm:text-base lg:text-lg font-bold text-foreground duration-150 relative truncate">
							<span className="font-normal text-foreground/75">
								{url.includes("http://") ? "http://" : "https://"}
							</span>
							{url.includes("http://")
								? url.replace("http://", "")
								: url.replace("https://", "")}
						</p>
					</div>
					<span className="text-xs text-foreground/75 sm:pl-6">
						{format(createdAt, "MMM d, yyyy 'at' HH:mm")}
					</span>
				</div>
			</div>
		</div>
	);
}

function scoreStyle(
	score: UrlWithScore["score"]
): VariantProps<typeof slotVariants> {
	if (score === "error" || score === undefined) {
		return { variant: "error" };
	}

	return { variant: "default" };
}

function ScoreDisplay({ score }: { score: UrlWithScore["score"] }) {
	if (typeof score === "number") {
		const { bg, fill } = getScoreColor(score);

		return (
			<div
				className={clsx(
					"h-[20px] w-[calc(100%+4px)] overflow-hidden z-50 absolute -left-[2px] border-double rounded-t-xl top-[-20px] border-x-2 border-t-2",
					bg
				)}
			>
				<div
					className={clsx(fill, "h-full rounded-tl-xl relative")}
					style={{ width: `${score}%` }}
				>
					<span className="text-background/90 font-black text-sm absolute w-full h-full flex items-center justify-end px-1">
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
