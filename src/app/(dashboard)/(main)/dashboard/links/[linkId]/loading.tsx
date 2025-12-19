import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="flex flex-col gap-5">
			<Skeleton className="bg-card h-40 sm:h-32 w-full rounded-xl border-2 border-double" />
			<Skeleton className="bg-card h-[454px] md:h-[477px] w-full rounded-xl border-2 border-double" />
			<section className="w-full pb-10">
				<div className="w-full text-center py-10">
					<h2 className="font-bold text-2xl md:text-3xl">
						What we found on your page
					</h2>
				</div>
				<div className="w-full flex justify-center">
					<div className="max-w-2xl w-full flex flex-col gap-4">
						<Skeleton className="bg-card h-[164px] max-w-2xl w-full rounded-xl border-2 border-double" />
						<Skeleton className="bg-card h-[164px] max-w-2xl w-full rounded-xl border-2 border-double" />
						<Skeleton className="bg-card h-[164px] max-w-2xl w-full rounded-xl border-2 border-double" />
					</div>
				</div>
			</section>
		</div>
	);
}
