import type { LucideIcon } from "lucide-react";

type Props = {
	label: string;
	value: React.ReactNode;
	icon: LucideIcon;
};

export default function DetailCard({ value, icon: Icon, label }: Props) {
	return (
		<div className="flex items-center justify-start gap-3 relative w-full">
			<div className="rounded-md shrink-0 bg-accent/25 border-border/75 border w-12 h-12 flex items-center justify-center">
				<Icon />
			</div>
			<div className="flex flex-col gap-1 w-[calc(100%-60px)]">
				<p className="text-xs leading-none">{label}</p>
				<h2 className="text-base font-bold w-full leading-none truncate">
					{value}
				</h2>
			</div>
		</div>
	);
}
