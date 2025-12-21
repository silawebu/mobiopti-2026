import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import SidebarBreadcrumb from "./Sidebar/nav-breadcrumb";
import { AppSidebar } from "./Sidebar/app-sidebar";

type Props = {
	children: React.ReactNode;
};

export default function AdminLayoutComponent({ children }: Props) {
	return (
		<SidebarProvider>
			<AppSidebar
				user={{
					id: "string",
					createdAt: new Date(),
					updatedAt: new Date(),
					email: "",
					emailVerified: true,
					name: "",
				}}
			/>
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
