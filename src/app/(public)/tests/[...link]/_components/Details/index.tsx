import type { LinkScore } from "@/utils/link-score";

import { Link2 } from "lucide-react";
import ScoreBar from "./ScoreBar";
import clsx from "clsx";
import ClientDate from "@/components/ClientDate";

type Props = {
	url: string;
	createdAt: Date;
	lastTestRun: Date | null;
	score: number;
	linkId: string;
};

export default function Details({
	url,
	createdAt,
	score,
	linkId,
	lastTestRun,
}: Props) {
	return (
		<section
			className={clsx(
				"border-2 border-double rounded-xl w-full h-40 sm:h-32 relative overflow-hidden pt-6",
				score === 0
					? "border-destructive-border bg-linear-to-br from-destructive-from to-destructive-to"
					: "border-border bg-card"
			)}
		>
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
					<p className="sm:ml-7 opacity-75 text-xs">
						Created:{" "}
						<b>
							<ClientDate date={createdAt} />
						</b>
					</p>
				</div>
				<div className="text-right">
					<p className="text-xs">Last test run</p>
					<b className="text-sm">{lastTestRun ? <ClientDate date={lastTestRun} /> : "-"}</b>
				</div>
			</div>
		</section>
	);
}
