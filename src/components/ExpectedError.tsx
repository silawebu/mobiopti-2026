import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

import type { LucideIcon } from "lucide-react";

type Props = {
	Icon?: LucideIcon;
	message: string;
	link: {
		text: string;
		href: string;
	};
	className?: string;
};

export default function ExpectedError({
	Icon = ShieldAlert,
	message = "Something went wrong",
	link,
	className,
}: Props) {
	return (
		<div
			className={`flex flex-col gap-5 items-center text-destructive-foreground bg-linear-to-br from-destructive-from to-destructive-to border-destructive-border justify-center text-xs text-center py-20 px-5 border-2 rounded-md sm:text-sm md:text-base ${className}`}
		>
			<Icon size={35} className="w-auto text-destructive" />
			<div className="mb-4">
				<h2 className="font-bold pb-2 text-2xl md:text-3xl">
					Oh no! Error!
				</h2>
				<p className="text-xs sm:text-sm text-muted-foreground">{message}</p>
			</div>
			<Link href={link.href}>
				<Button
					variant={"destructive"}
					className="cursor-pointer font-semibold w-fit"
					size={"sm"}
				>
					{link.text}
				</Button>
			</Link>
		</div>
	);
}
