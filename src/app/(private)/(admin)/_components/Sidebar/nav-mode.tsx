import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function NavMode() {
	return (
		<div>
			<div className="w-full relative border-sidebar-border border rounded-lg font-bold h-14 flex items-center justify-center">
				<Link
					className="w-full h-full text-xs sm:text-sm hover:bg-background duration-150 rounded-lg gap-1.5 cursor-pointer relative group/back flex items-center justify-center"
					href={"/dashboard"}
				>
					<ArrowLeft
						size={20}
						className="group-hover/back:-translate-x-1 duration-150"
					/>
					Back To Dashboard
				</Link>
			</div>
		</div>
	);
}
