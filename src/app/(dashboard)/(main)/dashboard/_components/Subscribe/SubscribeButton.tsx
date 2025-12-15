"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient, getErrorMessage } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
	cancelUrl?: string;
	returnUrl?: string;
};

export default function SubscribeButton({ cancelUrl, returnUrl }: Props) {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function handleSubscribe(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		setIsLoading(true);

		await authClient.subscription.upgrade({
			plan: "premium",
			successUrl: "/successfully-subscribed",
			cancelUrl: cancelUrl ?? "/dashboard",
			returnUrl: returnUrl ?? "/dashboard",
			fetchOptions: {
				onError: (error) => {
					console.error(error);
					toast.error(
						getErrorMessage(error.error.code) ??
							"Something went wrong! Unable to subscribe"
					);
					setIsLoading(false);
				},
			},
		});
	}

	return (
		<Button disabled={isLoading} onClick={handleSubscribe} size={"lg"}>
			{isLoading && <Spinner />}
			Get Access
		</Button>
	);
}
