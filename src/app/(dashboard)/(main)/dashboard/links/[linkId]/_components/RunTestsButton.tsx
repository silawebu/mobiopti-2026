"use client";

import { Button } from "@/components/ui/button";

export default function RunTestsButton() {
	return (
		<Button
			className="bg-foreground w-fit text-background font-bold hover:bg-foreground hover:text-background hover:opacity-80"
			size={"lg"}
		>
			Run tests
		</Button>
	);
}
