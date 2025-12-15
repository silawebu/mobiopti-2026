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

export function getErrorMessage(code: string): string | null {
	if (code in errorCodes) {
		return errorCodes[code as keyof typeof errorCodes];
	}

	return null;
}

const errorCodes = {
	USER_NOT_FOUND:
		"We couldn't find this account. Check your email or create a new one.",
	FAILED_TO_CREATE_USER:
		"Failed to create account. Please try again or contact us.",
	FAILED_TO_CREATE_SESSION: "Failed to sign you in. Please try again.",
	FAILED_TO_UPDATE_USER: "Failed to save changes. Please try again.",
	FAILED_TO_GET_SESSION: "Failed to verify login. Please sign in again.",
	INVALID_PASSWORD: "Password is incorrect.",
	INVALID_EMAIL: "Email format is invalid.",
	INVALID_EMAIL_OR_PASSWORD: "Incorrect email or password.",
	SOCIAL_ACCOUNT_ALREADY_LINKED:
		"This social account is already linked to another account. Sign in through that one, or use a different method.",
	PROVIDER_NOT_FOUND: "Selected sign-in method is not available.",
	INVALID_TOKEN: "Link is invalid or expired. Please request a new one.",
	ID_TOKEN_NOT_SUPPORTED: "This sign-in type is not supported.",
	FAILED_TO_GET_USER_INFO:
		"Failed to load account information. Please try again.",
	USER_EMAIL_NOT_FOUND:
		"This email is not registered with us. Use a different one or create an account.",
	EMAIL_NOT_VERIFIED:
		"Please verify your email first. A new verification link has been sent.",
	PASSWORD_TOO_SHORT: "Password is too short. Add more characters.",
	PASSWORD_TOO_LONG: "Password is too long. Please shorten it.",
	USER_ALREADY_EXISTS:
		"An account with this email already exists. Sign in or use a different email.",
	EMAIL_CAN_NOT_BE_UPDATED:
		"Email cannot be changed. Choose another or contact support.",
	CREDENTIAL_ACCOUNT_NOT_FOUND:
		"Credentials don't match. Check your email and password.",
	SESSION_EXPIRED: "Your session has expired. Please sign in again.",
	FAILED_TO_UNLINK_LAST_ACCOUNT:
		"Cannot unlink your last sign-in method. Keep at least one active.",
	ACCOUNT_NOT_FOUND:
		"We couldn't find the account. Check your email or sign in differently.",
	USER_ALREADY_HAS_PASSWORD:
		"You already have a password set. Sign in or reset it.",
} satisfies ErrorTypes;

type ErrorTypes = Partial<Record<keyof typeof authClient.$ERROR_CODES, string>>;
