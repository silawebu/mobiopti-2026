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
import { makeAdmin } from "../../../actions";
import { Spinner } from "@/components/ui/spinner";

type Props = {
	userId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export default function MakeAdmin({ userId, open, onOpenChange }: Props) {
	const [loading, setLoading] = useState<boolean>(false);

	async function handleMakeAdmin(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.stopPropagation();
		e.preventDefault();

		setLoading(true);

		const { error } = await makeAdmin(userId);

		if (error) {
			toast.error(error);
		} else {
			toast.success("User is now an administrator");
			onOpenChange(false);
		}

		setLoading(false);
	}

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						You will give this user unlimited permission over this application.
						Are you absolutely sure you want to do that?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button
							disabled={loading}
							onClick={handleMakeAdmin}
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
