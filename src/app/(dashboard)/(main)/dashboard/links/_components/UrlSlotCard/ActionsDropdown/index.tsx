"use client";

import { Button } from "@/components/ui/button";
import { UrlWithScore } from "@/utils/append-scores";
import { EllipsisVertical, ExternalLink, Repeat, Trash2 } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import ActionDialog from "./ActionDialog";
import { useState } from "react";

type Props = {
	score: UrlWithScore["score"];
	urlId: UrlWithScore["id"];
	linkName: UrlWithScore["url"];
};

export default function ActionDropdown({ score, urlId, linkName }: Props) {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<div onMouseEnter={(e) => e.stopPropagation()}>
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger asChild>
					<Button
						className="z-50"
						variant={typeof score === "number" ? "outline" : "destructive"}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
						}}
					>
						<EllipsisVertical />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<Link href={`/dashboard/links/${urlId}`}>
						<DropdownMenuItem>
							<ExternalLink />
							Open
						</DropdownMenuItem>
					</Link>
					<ActionDialog
						urlId={urlId}
						linkName={linkName}
						type="rerun"
						closeDropdown={() => setOpen(false)}
					>
						<DropdownMenuItem>
							<Repeat />
							Re-run tests
						</DropdownMenuItem>
					</ActionDialog>
					<DropdownMenuSeparator />
					<ActionDialog
						urlId={urlId}
						linkName={linkName}
						type="delete"
						closeDropdown={() => setOpen(false)}
					>
						<DropdownMenuItem variant={"destructive"}>
							<Trash2 />
							Delete
						</DropdownMenuItem>
					</ActionDialog>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
