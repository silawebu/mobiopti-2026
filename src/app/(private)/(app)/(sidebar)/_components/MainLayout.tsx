import type { User } from "better-auth";

import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import SidebarBreadcrumb from "./Sidebar/nav-breadcrumb";
import { AppSidebar } from "./Sidebar/app-sidebar";

type Props = {
	isAdmin: boolean;
	children: React.ReactNode;
	user: User;
};

export default function MainLayoutComponent({
	children,
	user,
	isAdmin,
}: Props) {
	return (
		<SidebarProvider>
			<AppSidebar user={user} isAdmin={isAdmin} />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<SidebarBreadcrumb />
					</div>
				</header>
				<main className="px-5">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
