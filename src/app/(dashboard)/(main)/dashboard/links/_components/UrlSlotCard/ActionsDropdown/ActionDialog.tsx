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

type Props = {
	type: "delete" | "rerun";
	children: React.ReactNode;
	linkName: UrlWithScore["url"];
	closeDropdown: () => void;
};

export default function ActionDialog({
	type,
	children,
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

		console.log("Deleting...");

		setOpen(false);
		closeDropdown();
	}

	async function handleRerun(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault();

		setLoading(true);

		console.log("Re-running...");

		setOpen(false);
		closeDropdown();
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
								<Trash2 />
								Delete
							</Button>
						</AlertDialogAction>
					)}
					{type === "rerun" && (
						<AlertDialogAction disabled={loading} asChild>
							<Button disabled={loading} onClick={handleRerun}>
								<Repeat />
								Re-run tests
							</Button>
						</AlertDialogAction>
					)}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
