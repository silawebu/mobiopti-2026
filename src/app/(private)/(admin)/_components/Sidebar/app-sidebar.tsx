"use client";

import * as React from "react";
import { Home, User, ChartColumnBig, GraduationCap } from "lucide-react";
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
import { NavMode } from "./nav-mode";
import BrandIcon from "@/components/Icons/BrandIcon";

const navMain = [
	{
		title: "Admin home",
		url: "/admin",
		icon: Home,
		isActive: true,
	},
	{
		title: "User management",
		url: "/admin/users",
		icon: User,
		isActive: true,
	},
	{
		title: "Usage Analytics",
		url: "/admin/usage-analytics",
		icon: ChartColumnBig,
		isActive: false,
		disabled: true,
	},
	{
		title: "Tutorials & courses",
		url: "/admin/tutorials-and-courses",
		icon: GraduationCap,
		isActive: false,
		disabled: true,
	},
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link href="/">
								<div className="bg-transparent rounded-sm text-sidebar-primary-foreground flex aspect-square size-7 items-center justify-center">
									<BrandIcon className="w-full h-full relative bottom-px fill-primary" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight gap-[3px] pl-2">
									<span className="truncate font-bold leading-none font-serif text-2xl">
										Admin
									</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavMode />
			</SidebarFooter>
		</Sidebar>
	);
}
