import { Skeleton } from "@/components/ui/skeleton";
import { Link2 } from "lucide-react";

export default function Loading() {
	return (
		<div className="w-full flex justify-center pt-10">
			<div className="w-full max-w-4xl flex flex-col gap-10">
				<section className="w-full flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 rounded-2xl bg-linear-to-br from-primary to-secondary border-2 flex items-center justify-center">
							<Link2 />
						</div>
						<h1 className="font-serif font-bold text-3xl leading-[1.1]">
							Your links
						</h1>
					</div>
				</section>
				<div className="flex flex-col gap-6">
					<Skeleton className="w-full h-[110px] rounded-xl border-2 border-double bg-card" />
					<Skeleton className="w-full h-[110px] rounded-xl border-2 border-double bg-card" />
					<Skeleton className="w-full h-[110px] rounded-xl border-2 border-double bg-card" />
					<Skeleton className="w-full h-[110px] rounded-xl border-2 border-double bg-card" />
					<Skeleton className="w-full h-[110px] rounded-xl border-2 border-double bg-card" />
				</div>
			</div>
		</div>
	);
}
