"use client";

import * as React from "react";
import {
	LifeBuoy,
	Home,
	Link2,
	FileChartColumn,
	ShieldUser,
} from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import BrandIcon from "@/components/Icons/BrandIcon";

export function AppSidebar({
	isAdmin,
	...props
}: React.ComponentProps<typeof Sidebar> & { isAdmin: boolean }) {
	const data = {
		navMain: [
			{
				title: "Dahboard",
				url: "/dashboard",
				icon: Home,
				isActive: true,
			},
			{
				title: "Links",
				url: "/dashboard/links",
				icon: Link2,
				isActive: true,
			},
			{
				title: "Reports",
				url: "/dashboard/reports",
				icon: FileChartColumn,
				isActive: true,
			},
		],
		navSecondary: [
			{
				title: "Support",
				url: "mailto:mail@martinsil.cz",
				icon: LifeBuoy,
			},
		],
	};

	if (isAdmin) {
		data.navMain.push({
			url: "/dashboard/admin",
			title: "Administration",
			icon: ShieldUser,
			isActive: true,
		});
	}

	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link href="/">
								<div className="bg-transparent rounded-sm text-sidebar-primary-foreground flex aspect-square size-7 items-center justify-center">
									<BrandIcon className="w-full h-full relative bottom-px" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight gap-[3px] pl-2">
									<span className="truncate font-bold leading-none font-serif text-2xl">
										MobiOpti
									</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={props.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
