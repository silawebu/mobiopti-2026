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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { removeAdmin } from "../../../actions";
import { Spinner } from "@/components/ui/spinner";

type Props = {
	userId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export default function RemoveAdmin({ userId, open, onOpenChange }: Props) {
	const [loading, setLoading] = useState<boolean>(false);

	async function handleRemoveAdmin(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.stopPropagation();
		e.preventDefault();

		setLoading(true);

		const { error } = await removeAdmin(userId);

		if (error) {
			console.error(error);
			toast.error(error);
		} else {
			toast.success("User is no longer an administrator");
			onOpenChange(false);
		}

		setLoading(false);
	}

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Remove admin permission</AlertDialogTitle>
					<AlertDialogDescription>
						By clicking <b>confirm</b> you will remove users administration
						access.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button
							disabled={loading}
							onClick={handleRemoveAdmin}
							variant={"destructive"}
						>
							{loading && <Spinner />}
							Confirm
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
