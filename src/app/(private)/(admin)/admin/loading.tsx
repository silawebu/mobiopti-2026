import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="flex flex-col gap-5">
			<Skeleton className="w-full h-[423px] rounded-xl border-2 border-double bg-card" />
			<div className="grid gap-5 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
				<Skeleton className="w-full h-[419.75px] rounded-xl border-2 border-double bg-card" />
				<Skeleton className="w-full h-[419.75px] rounded-xl border-2 border-double bg-card lg:col-span-2 xl:col-span-3" />
			</div>
		</div>
	);
}
