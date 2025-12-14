import { createAuthClient } from "better-auth/client";
import { stripeClient } from "@better-auth/stripe/client";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
	plugins: [
		adminClient(),
		stripeClient({
			subscription: true,
		}),
	],
});
