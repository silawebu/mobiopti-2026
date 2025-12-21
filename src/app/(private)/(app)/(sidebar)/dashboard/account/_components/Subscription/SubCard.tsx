import { Calendar, CreditCard, MoveRight } from "lucide-react";
import type { SubData } from "../../page";
import ClientDate from "@/components/ClientDate";
import { Badge } from "@/components/ui/badge";

export default function SubCard({
	plan,
	cancelAtPeriodEnd,
	periodEnd,
	periodStart,
}: SubData) {
	return (
		<div className="flex flex-col gap-8 xl:flex-row xl:items-center md:gap-4 py-3 md:py-0 xl:gap-8">
			<div className="flex items-center justify-start gap-3.5 relative">
				<div className="hidden sm:flex rounded-md shrink-0 bg-accent/25 border-border/75 border w-14 h-14 md:w-16 md:h-16 items-center justify-center">
					<CreditCard />
				</div>
				<div className="flex flex-col gap-1.5">
					<p className="text-xs leading-none">Current plan</p>
					<h2 className="text-lg md:text-xl flex items-center gap-2 font-bold w-full leading-none truncate capitalize">
						{plan}{" "}
						<Badge variant={cancelAtPeriodEnd ? "destructive" : "positive"}>
							{cancelAtPeriodEnd ? "Will cancel" : "Active"}
						</Badge>
					</h2>
				</div>
			</div>
			{periodStart && (
				<div className="flex items-center justify-start gap-3.5 relative">
					<div className="hidden sm:flex rounded-md shrink-0 bg-accent/25 border-border/75 border w-14 h-14 md:w-16 md:h-16 items-center justify-center">
						<Calendar />
					</div>
					<div className="flex flex-col gap-1.5">
						<p className="text-xs leading-none">Billing period</p>
						<h2 className="hidden text-base font-bold w-full leading-none truncate capitalize lg:flex items-center gap-2">
							<ClientDate date={periodStart} /> <MoveRight size={20} />{" "}
							{periodEnd ? <ClientDate date={periodEnd} /> : "Infinity"}
						</h2>
						<div className="flex flex-col gap-1 lg:hidden">
							<h2 className="leading-none text-sm">
								Since{" "}
								<b>
									<ClientDate date={periodStart} />
								</b>
							</h2>
							<h2 className="leading-none text-sm">
								until{" "}
								<b>
									{periodEnd ? <ClientDate date={periodEnd} /> : "infinity"}
								</b>
							</h2>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
