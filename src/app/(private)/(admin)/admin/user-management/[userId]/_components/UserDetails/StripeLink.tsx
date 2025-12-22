import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

type Props = {
	stripeCustomerId: string;
};

export default function StripeLink({ stripeCustomerId }: Props) {
	return (
		<a
			href={`https://dashboard.stripe.com/${process.env.STRIPE_ACCOUNT_ID}${
				process.env.NODE_ENV === "development" ? "/test" : ""
			}/customers/${stripeCustomerId}`}
         target="_blank"
		>
			<Button variant={"outline"}>
				<ExternalLink /> Open in Stripe
			</Button>
		</a>
	);
}
