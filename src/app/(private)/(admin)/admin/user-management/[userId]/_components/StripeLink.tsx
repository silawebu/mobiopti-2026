import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

type Props = {
	value: string;
	type: "customers" | "subscriptions";
};

export default function StripeLink({ value, type }: Props) {
	return (
		<a
			href={`https://dashboard.stripe.com/${process.env.STRIPE_ACCOUNT_ID}${
				process.env.NODE_ENV === "development" ? "/test" : ""
			}/${type}/${value}`}
			target="_blank"
		>
			<Button variant={"outline"}>
				<ExternalLink /> Open in Stripe
			</Button>
		</a>
	);
}
