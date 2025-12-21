import SeverityIcon from "@/components/Icons/Severity";
import { Badge } from "@/components/ui/badge";
import { BadgeX, Bot } from "lucide-react";
import SubscribeBanner from "@/components/Subscription/SubscribeBanner";

type Props = { linkId: string; description: string | null };

export default function SubscribeToSeeAllTests({ linkId, description }: Props) {
	return (
		<div className="w-full relative">
			<div className="relative">
				<div className="absolute w-full top-[10%] z-30 px-[7.5%]">
					<SubscribeBanner
						animate={false}
						returnUrl={`/dashboard/links/${linkId}`}
						cancelUrl={`/dashboard/links/${linkId}`}
						description={description}
					/>
				</div>
				<div
					className={
						"border w-full relative z-10 p-5 blur-xs rounded-2xl shadow-sm transition-colors border-rose-300/30 bg-rose-500/5 text-rose-800 dark:text-rose-200"
					}
				>
					<div className="w-full flex-col flex items-center justify-between gap-5 sm:flex-row">
						<div className="w-full lg:w-[calc(100%-120px)]">
							<div className="flex flex-col items-start flex-nowrap gap-1.5">
								<div className="flex flex-wrap order-2 items-center gap-2">
									<h2 className="font-bold text-2xl">Haha you though!</h2>
								</div>
								<Badge className="bg-red-600 text-white rounded-full">
									<BadgeX /> Critical
								</Badge>
							</div>
						</div>
						<div className="w-[120px] h-full sm:flex items-center justify-center hidden">
							<SeverityIcon severity={5} className="w-[80px] h-auto" />
						</div>
					</div>
					<div className="flex mt-3 p-3 border border-neutral-300/40 bg-white/60 dark:bg-white/5 rounded-xl items-center gap-3 transition-colors">
						<div className="flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-200/40 dark:bg-neutral-700/40">
							<Bot className="text-neutral-700 dark:text-neutral-200 w-5 h-5" />
						</div>
						<p className="text-sm text-neutral-900 dark:text-neutral-100 leading-snug">
							Lorem ipsum sin doloret amit per sequel si seno
						</p>
					</div>

					<div className="mt-3">
						<p className="text-xs pb-1 font-bold">Page scan result:</p>
						<p className="border bg-card rounded text-sm py-1 px-3 font-mono wrap-break-word">
							Hello, if you are reading this, you are a baller
						</p>
					</div>
				</div>
			</div>
			<div className="w-[110%] -left-[5%] absolute -bottom-[10px] z-20 h-[200px] bg-linear-to-t via-30% via-background from-background to-transparent bg-red"></div>
		</div>
	);
}
