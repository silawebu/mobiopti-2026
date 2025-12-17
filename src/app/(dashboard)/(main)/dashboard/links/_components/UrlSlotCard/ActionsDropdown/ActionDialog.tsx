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
import { UrlWithScore } from "@/utils/append-scores";
import { Repeat, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteLink, rerunTests } from "../../../actions";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

type Props = {
	type: "delete" | "rerun";
	children: React.ReactNode;
	linkName: UrlWithScore["url"];
	urlId: UrlWithScore["id"];
	closeDropdown: () => void;
};

export default function ActionDialog({
	type,
	children,
	urlId,
	linkName,
	closeDropdown,
}: Props) {
	const [open, setOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	async function handleDelete(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault();

		setLoading(true);

		const { error } = await deleteLink(urlId);

		if (error) {
			toast.error(error);
		} else {
			toast.success("Link was successfully deleted");
			setOpen(false);
			closeDropdown();
		}

		setLoading(false);
	}

	async function handleRerun(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault();

		setLoading(true);

		const { error } = await rerunTests(urlId);

		if (error) {
			toast.error(error);
		} else {
			toast.success("The tests were successful. Check out the results!");
			setOpen(false);
			closeDropdown();
		}

		setLoading(false);
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger
				asChild
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();
					setOpen(true);
				}}
			>
				{children}
			</AlertDialogTrigger>
			<AlertDialogContent
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();
				}}
			>
				<AlertDialogHeader>
					{type === "rerun" && (
						<>
							<AlertDialogTitle className="text-xl">
								Re-run tests
							</AlertDialogTitle>
							<AlertDialogDescription className="text-base">
								Would you like to re-run tests for link <b>{linkName}</b>?
							</AlertDialogDescription>
						</>
					)}
					{type === "delete" && (
						<>
							<AlertDialogTitle className="text-xl">
								Are you sure?
							</AlertDialogTitle>
							<AlertDialogDescription className="text-base">
								This action cannot be undone. This will delete your link{" "}
								<b>{linkName}</b> and all of it's history.
							</AlertDialogDescription>
						</>
					)}
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
					{type === "delete" && (
						<AlertDialogAction disabled={loading} asChild>
							<Button
								disabled={loading}
								onClick={handleDelete}
								variant={"destructive"}
							>
								{loading ? <Spinner /> : <Trash2 />}
								Delete
							</Button>
						</AlertDialogAction>
					)}
					{type === "rerun" && (
						<AlertDialogAction disabled={loading} asChild>
							<Button disabled={loading} onClick={handleRerun}>
								{loading ? <Spinner /> : <Repeat />}
								Re-run tests
							</Button>
						</AlertDialogAction>
					)}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
