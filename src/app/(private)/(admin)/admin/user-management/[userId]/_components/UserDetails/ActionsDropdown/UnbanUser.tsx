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
import { removeAdmin, unbanUser } from "../../../actions";
import { Spinner } from "@/components/ui/spinner";

type Props = {
	userId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export default function UnbanUser({ userId, open, onOpenChange }: Props) {
	const [loading, setLoading] = useState<boolean>(false);

	async function handleUnban(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.stopPropagation();
		e.preventDefault();

		setLoading(true);

		const { error } = await unbanUser(userId);

		if (error) {
			console.error(error);
			toast.error(error);
		} else {
			toast.success("User is no longer banned");
			onOpenChange(false);
		}

		setLoading(false);
	}

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Unban user</AlertDialogTitle>
					<AlertDialogDescription>
						By clicking <b>unban</b> you will remove this users ban
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button
							disabled={loading}
							onClick={handleUnban}
							variant={"destructive"}
						>
							{loading && <Spinner />}
							Unban
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
