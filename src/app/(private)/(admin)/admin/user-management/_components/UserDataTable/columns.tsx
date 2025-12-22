"use client";

import { Badge } from "@/components/ui/badge";
import { SubscriptionStatus, UserData } from "@/utils/admin/user-page-fetcher";
import { ColumnDef } from "@tanstack/react-table";
import { Ban, ShieldHalf } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { isStillBanned } from "@/utils/admin/helper-functions";

export const columns: ColumnDef<UserData>[] = [
	{
		accessorKey: "email",
		header: () => <div className="pl-7">Email</div>,
		cell: ({ row }) => {
			const { email, role, banned, banExpires } = row.original;
			return (
				<div className="flex gap-1 items-center w-fit">
					<div className="w-6 flex items-center justify-center shrink-0">
						{role === "admin" && <ShieldHalf size={17} />}
						{isStillBanned(banned ?? false, banExpires) && (
							<Ban className="text-destructive" size={17} />
						)}
					</div>
					{email}
				</div>
			);
		},
	},
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "subscription",
		header: () => <div className="text-center">Plan</div>,
		cell: ({ row }) => {
			return (
				<div className="text-center">
					<SubscriptionBadge subscription={row.original.subscription} />
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const { id } = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button className="h-6 w-6 p-0 flex items-center justify-center cursor-pointer">
							<MoreHorizontal className="h-3 w-3" />
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<Link href={`/admin/user-management/${id}`}>
							<DropdownMenuItem>Open in detail</DropdownMenuItem>
						</Link>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

function SubscriptionBadge({
	subscription,
}: {
	subscription: SubscriptionStatus | "error";
}) {
	if (subscription === "error") {
		return <Badge variant={"destructive"}>Load failed</Badge>;
	}

	if (
		subscription.plan === "premium" &&
		subscription.cancelAtPeriodEnd == true
	) {
		return <Badge variant={"default"}>Ends</Badge>;
	}

	if (
		subscription.plan === "premium" &&
		subscription.cancelAtPeriodEnd == false
	) {
		return <Badge variant={"positive"}>Active</Badge>;
	}

	return <Badge className="bg-gray-500">Free</Badge>;
}
