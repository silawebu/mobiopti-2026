"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ban, Settings, ShieldBan, ShieldHalf } from "lucide-react";
import { useState } from "react";
import MakeAdmin from "./MakeAdmin";
import RemoveAdmin from "./RemoveAdmin";
import BanUser from "./BanUser";

type Props = {
	userId: string;
	role: "admin" | "user";
	isSuperAdmin: boolean;
};

export default function ActionsDropdown({ userId, role, isSuperAdmin }: Props) {
	const [open, setOpen] = useState<boolean>(false);

	const [makeAdmin, setMakeAdmin] = useState<boolean>(false);
	const [removeAdmin, setRemoveAdmin] = useState<boolean>(false);
	const [ban, setBan] = useState<boolean>(false);

	return (
		<>
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger asChild>
					<Button variant={"outline"}>
						<Settings />
						<span className="hidden sm:block">Actions</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{role === "user" && isSuperAdmin && (
						<DropdownMenuItem
							onSelect={(e) => {
								e.preventDefault();
								setMakeAdmin(true);
							}}
						>
							<ShieldHalf />
							Make admin
						</DropdownMenuItem>
					)}
					{role === "admin" && isSuperAdmin && (
						<DropdownMenuItem
							onSelect={(e) => {
								e.preventDefault();
								setRemoveAdmin(true);
							}}
						>
							<ShieldBan />
							Remove admin
						</DropdownMenuItem>
					)}
					<DropdownMenuItem
						onSelect={(e) => {
							e.preventDefault();
							setBan(true);
						}}
						variant="destructive"
						disabled={role === "admin"}
					>
						<Ban />
						Ban user
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<MakeAdmin
				userId={userId}
				open={makeAdmin}
				onOpenChange={(open) => {
					setMakeAdmin(open);
					if (!open) setOpen(false);
				}}
			/>
			<RemoveAdmin
				userId={userId}
				open={removeAdmin}
				onOpenChange={(open) => {
					setRemoveAdmin(open);
					if (!open) setOpen(false);
				}}
			/>
			<BanUser
				userId={userId}
				open={ban}
				onOpenChange={(open) => {
					setBan(open);
					if (!open) setOpen(false);
				}}
			/>
		</>
	);
}
