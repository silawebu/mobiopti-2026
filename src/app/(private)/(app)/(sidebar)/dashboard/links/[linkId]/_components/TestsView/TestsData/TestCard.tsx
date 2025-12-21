import type { UrlTestStatus } from "@/generated/prisma/enums";
import type { TestWithLastRun } from "@/utils/get-tests";
import type { Severity } from "@/utils/types";

import SeverityIcon from "@/components/Icons/Severity";
import { Badge } from "@/components/ui/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";
import { BadgeAlert, BadgeCheck, BadgeX, Bot } from "lucide-react";

type Props = TestWithLastRun;

export default function TestCard({
	severity,
	description,
	lastRun,
	title,
}: Props) {
	return (
		<div
			className={clsx(
				"border p-5 rounded-2xl shadow-sm transition-colors",
				lastRun !== null
					? lastRun.status === "ok"
						? "border-emerald-300/30 bg-emerald-500/5 text-emerald-800 dark:text-emerald-200"
						: lastRun.status === "warning"
						? "border-amber-300/30 bg-amber-500/5 text-amber-800 dark:text-amber-200"
						: "border-rose-300/30 bg-rose-500/5 text-rose-800 dark:text-rose-200"
					: "border-border bg-muted"
			)}
		>
			<div className="w-full flex-col flex items-center justify-between gap-5 sm:flex-row">
				<div className="w-full lg:w-[calc(100%-120px)]">
					<div className="flex flex-col items-start flex-nowrap gap-1.5">
						<div className="flex flex-wrap order-2 items-center gap-2">
							<h2 className="font-bold text-2xl">{title}</h2>
							<Tooltip>
								<TooltipTrigger asChild>
									<button className="h-5 w-5 cursor-help relative top-px text-sm font-bold flex items-center justify-center border rounded-full">
										?
									</button>
								</TooltipTrigger>
								<TooltipContent>
									<p className="w-[calc(100vw*0.75)] max-w-[500px] sm:w-fit text-center sm:text-base py-2">
										{description}
									</p>
								</TooltipContent>
							</Tooltip>
						</div>
						{lastRun && <StatusBadge status={lastRun.status} />}
					</div>
				</div>
				<div className="w-[120px] h-full sm:flex items-center justify-center hidden">
					<SeverityIcon
						severity={severity as Severity}
						className="w-[80px] h-auto"
					/>
				</div>
			</div>
			{!lastRun ||
				((lastRun.status === "warning" || lastRun.status === "critical") && (
					<TutorialCard
						text={
							"Here is the tutorial how what to do to have this alright. Just put X in Y an you will be alright"
						}
					/>
				))}
			{lastRun && lastRun.content && (
				<div className="mt-3">
					<p className="text-xs pb-1 font-bold">Page scan result:</p>
					<p className="border bg-card rounded text-sm py-1 px-3 font-mono wrap-break-word">
						{lastRun.content}
					</p>
				</div>
			)}
		</div>
	);
}

export function TutorialCard({ text }: { text: string }) {
	return (
		<div className="flex mt-3 p-3 border border-neutral-300/40 bg-white/60 dark:bg-white/5 rounded-xl items-center gap-3 transition-colors">
			<div className="flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-200/40 dark:bg-neutral-700/40">
				<Bot className="text-neutral-700 dark:text-neutral-200 w-5 h-5" />
			</div>
			<p className="text-sm text-neutral-900 dark:text-neutral-100 leading-snug">
				{text}
			</p>
		</div>
	);
}

export function StatusBadge({ status }: { status: UrlTestStatus }) {
	switch (status) {
		case "ok":
			return (
				<Badge className="bg-lime-600 text-white rounded-full">
					<BadgeCheck /> OK
				</Badge>
			);
		case "critical":
			return (
				<Badge className="bg-red-600 text-white rounded-full">
					<BadgeX /> Critical
				</Badge>
			);
		case "warning":
			return (
				<Badge className="bg-orange-600 text-white rounded-full">
					<BadgeAlert /> Warning
				</Badge>
			);
		default:
			return null;
	}
}
