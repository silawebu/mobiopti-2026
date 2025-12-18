import type { LinkScore } from "@/utils/link-score";

import { Button } from "@/components/ui/button";
import { Link2, Trash2 } from "lucide-react";
import ScoreBar from "./ScoreBar";

type Props = {
	url: string;
	createdAt: Date;
	score: LinkScore;
};

export default function Details({ url, createdAt, score }: Props) {
	return (
		<section className="border-2 border-double bg-card rounded-xl w-full h-40 sm:h-32 relative overflow-hidden pt-6">
			<ScoreBar score={score} />
			<div className="w-full flex-col sm:flex-row sm:px-6 h-full flex items-center justify-between gap-3">
				<div className="flex flex-col pt-3 sm:pt-0 px-3 sm:px-0 truncate items-center justify-center sm:items-start h-full gap-0 sm:gap-1 w-full sm:w-auto">
					<div className="flex items-center gap-2">
						<Link2 className="w-5 h-5 opacity-75 shrink-0 hidden sm:block" />
						<h1 className="font-bold text-lg sm:text-xl relative truncate">
							<span className="font-normal text-foreground/75">
								{url.includes("http://") ? "http://" : "https://"}
							</span>
							{url.includes("http://")
								? url.replace("http://", "")
								: url.replace("https://", "")}
						</h1>
					</div>
					<p className="sm:ml-7 opacity-75 text-xs sm:text-sm">28 Dec. 2025</p>
				</div>
				<div className="flex justify-center sm:justify-start items-center gap-2 py-3 w-full sm:w-auto sm:border-none border-t-2 border-double">
					<Button
						className="bg-foreground text-background font-bold hover:bg-foreground hover:text-background hover:opacity-80"
						size={"lg"}
					>
						Re-run tests
					</Button>
					<Button variant={"destructive"} size={"icon-lg"}>
						<Trash2 />
					</Button>
				</div>
			</div>
		</section>
	);
}
