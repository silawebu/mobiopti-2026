"use client";

import type { User } from "better-auth";

import { ChevronsUpDown, Loader, LogOut, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function NavUser({ user }: { user: User }) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { isMobile } = useSidebar();

	const router = useRouter();

	const handleLogOut = async (e: React.MouseEvent) => {
		e.preventDefault();

		setIsLoading(true);

		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/");
				},
				onError: () => {
					toast.error("Something went wrong while logging out");
				},
			},
		});
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent/40 data-[state=open]:text-sidebar-accent-foreground cursor-pointer hover:bg-sidebar-accent/40 duration-150"
						>
							<Avatar className="h-8 w-8 rounded-full">
								<AvatarFallback className="rounded-full uppercase bg-accent text-accent-foreground">
									{user.name ? user.name[0] : user.email[0]}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-bold">
									{user.name ?? user.email}
								</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-full">
									<AvatarFallback className="uppercase bg-accent rounded-full text-accent-foreground">
										{user.name ? user.name[0] : user.email[0]}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										{user.name ?? user.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<Link href={"/dashboard/account"}>
								<DropdownMenuItem className="cursor-pointer">
									<UserIcon className="w-5" />
									Account
								</DropdownMenuItem>
							</Link>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="flex items-center gap-2 cursor-pointer"
							onClick={handleLogOut}
							disabled={isLoading}
						>
							{isLoading ? (
								<Loader className="animate-spin w-5" />
							) : (
								<LogOut className="w-5" />
							)}
							Log Out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
