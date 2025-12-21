"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { Settings } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ManageButton() {
	const [loading, setLoading] = useState<boolean>(false);

	const handleOpenPortal = async (e: React.MouseEvent) => {
		e.preventDefault();

		setLoading(true);

		await authClient.subscription.billingPortal({
			locale: "en",
			returnUrl: "/dashboard/account",
			fetchOptions: {
				onError: (e) => {
					console.error(e);
					toast.error("Failed to open billing portal! Try again later.");
				},
			},
		});
	};

	return (
		<Button
			className="w-full sm:max-w-[250px]"
			variant={"outline"}
			onClick={handleOpenPortal}
			disabled={loading}
			size={"lg"}
		>
			{loading ? <Spinner /> : <Settings />}{" "}
			<span className="hidden sm:block">Manage</span>
		</Button>
	);
}
