import { cva, type VariantProps } from "class-variance-authority";
import EmptySlot from "./EmptySlot";
import { cn } from "@/lib/utils";
import { UrlWithScore } from "@/utils/append-scores";
import Link from "next/link";
import ScoreDisplay from "./ScoreDisplay";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Link2 } from "lucide-react";
import { format } from "date-fns";
import ActionDropdown from "./ActionsDropdown";

type Props = {
	index: number;
	slot: UrlWithScore | null;
};

const slotVariants = cva(
	"w-full border-double p-4 h-[85px] relative mt-[25px] border-x-2 border-b-2 rounded-xl rounded-t-none hover:opacity-80 duration-150 shadow-xl",
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

export default function UrlSlotCard({ index, slot }: Props) {
	if (slot === null) {
		return <EmptySlot slotNumber={index + 1} />;
	}

	return (
		<Link
			href={`/dashboard/links/${slot.id}`}
			className={cn(slotVariants(scoreStyle(slot.score)))}
		>
			<ScoreDisplay score={slot.score} />
			<div className="h-full w-full flex items-center justify-between gap-3">
				<div className="flex flex-col gap-1 min-w-0 flex-1 mr-4">
					<div className="flex items-center gap-2">
						<Link2 className="w-4 h-4 text-foreground/75 shrink-0 hidden sm:block" />
						<p className="text-sm sm:text-base lg:text-lg font-bold text-foreground truncate">
							<span className="font-normal text-foreground/75">
								{slot.url.includes("http://") ? "http://" : "https://"}
							</span>
							{slot.url.includes("http://")
								? slot.url.replace("http://", "")
								: slot.url.replace("https://", "")}
						</p>
					</div>
					<span className="text-xs text-foreground/75 sm:pl-6">
						{format(slot.createdAt, "MMM d, yyyy 'at' HH:mm")}
					</span>
				</div>
				<ActionDropdown score={slot.score} />
			</div>
		</Link>
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
