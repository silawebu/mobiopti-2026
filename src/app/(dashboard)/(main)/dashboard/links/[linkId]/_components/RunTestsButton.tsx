"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { rerunTests } from "../../actions";
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

type Props = {
	linkId: string;
};

export default function RunTestsButton({ linkId }: Props) {
	const [loading, setLoading] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);

	async function handleRerun(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault();

		setLoading(true);

		const { error } = await rerunTests(linkId, true);

		if (error) {
			toast.error(error);
		} else {
			toast.success("The tests were successful. Check out the results!");
			setOpen(false);
		}

		setLoading(false);
	}

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button
					className="bg-foreground w-fit text-background font-bold hover:bg-foreground hover:text-background hover:opacity-80"
					size={"lg"}
				>
					Run tests
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-xl">Re-run tests</AlertDialogTitle>
					<AlertDialogDescription className="text-base">
						Would you like to re-run tests for this link?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleRerun} disabled={loading} asChild>
						<Button
							disabled={loading}
							className="bg-foreground w-fit text-background font-bold hover:bg-foreground hover:text-background hover:opacity-80"
						>
							{loading && <Spinner />}
							Run tests
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
