"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
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
import { Spinner } from "@/components/ui/spinner";
import { deleteLink } from "../../../actions";
import { Trash2 } from "lucide-react";

type Props = {
	linkId: string;
};

export default function DeleteButton({ linkId }: Props) {
	const [loading, setLoading] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);

	async function handleRerun(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault();

		setLoading(true);

		const { error } = await deleteLink(linkId, "redirect");

		if (error) {
			toast.error(error);
			setLoading(false);
		}
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant={"destructive"} size={"icon-lg"}>
					<Trash2 />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-xl">Are you sure?</AlertDialogTitle>
					<AlertDialogDescription className="text-base">
						This action cannot be undone. This will delete your link and all of
						it's history.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleRerun} disabled={loading} asChild>
						<Button disabled={loading} variant={"destructive"}>
							{loading ? <Spinner /> : <Trash2 />}
							Delete
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
