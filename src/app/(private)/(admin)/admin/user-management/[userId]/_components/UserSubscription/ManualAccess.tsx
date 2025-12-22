"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { SquarePlus, SquareX } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { grantFreeSubscription, revokeFreeSubscription } from "../../actions";

type Props = {
	action: "grant" | "revoke";
	userId: string;
};

export default function ManualAccess({ action, userId }: Props) {
	const [open, setOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	async function handleAccess(e: React.MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();
		e.preventDefault();

		setLoading(true);

		try {
			const { error } =
				action === "grant"
					? await grantFreeSubscription(userId)
					: await revokeFreeSubscription(userId);

			if (error) {
				toast.error(error);
			} else {
				setOpen(false);
				toast.success(
					action === "grant"
						? "User now has premium subscription"
						: "Premium subscription revoked"
				);
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant={"outline"}>
					{action == "grant" ? <SquarePlus /> : <SquareX />}
					{action == "grant" ? "Grant" : "Revoke"}
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						{action == "grant"
							? "This action will give this user free access to premium features."
							: "This action will remove free access to premium features for this user."}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button
							disabled={loading}
							onClick={handleAccess}
							variant={action == "grant" ? "secondary" : "destructive"}
						>
							{loading && <Spinner />}
							{action == "grant" ? "Grant subscription" : "Revoke subscription"}
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
