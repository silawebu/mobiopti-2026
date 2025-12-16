"use client";

import { Button } from "@/components/ui/button";
import { UrlWithScore } from "@/utils/append-scores";
import { EllipsisVertical } from "lucide-react";

type Props = {
	score: UrlWithScore["score"];
};

export default function ActionDropdown({ score }: Props) {
	return (
		<div onMouseEnter={(e) => e.stopPropagation()}>
			<Button
				className="z-50"
				variant={typeof score === "number" ? "outline" : "destructive"}
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					console.log("clicked");
				}}
			>
				<EllipsisVertical />
			</Button>
		</div>
	);
}
