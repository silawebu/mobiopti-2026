"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient, getErrorMessage } from "@/lib/auth-client";
import { VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
	cancelUrl?: string;
	returnUrl?: string;
	button: {
		label?: string;
		size?: VariantProps<typeof buttonVariants>["size"];
		className?: React.ComponentProps<"button">["className"];
	};
};

export default function SubscribeButton({
	cancelUrl,
	returnUrl,
	button: {
		label = "Get Access",
		size: buttonSize = "lg",
		className: buttonClassName = "",
	} = {},
}: Props) {
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
		<Button
			className={clsx(buttonClassName)}
			disabled={isLoading}
			onClick={handleSubscribe}
			size={buttonSize}
		>
			{isLoading && <Spinner />}
			{label}
		</Button>
	);
}
