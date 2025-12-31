export function isValidPageUrl(rawInput: string): boolean {
	if (!rawInput) return false;

	const input = rawInput.trim();

	const normalised = /^(https?:)?\/\//i.test(input)
		? input
		: `https://${input}`;

	let url: URL;
	try {
		url = new URL(normalised);
	} catch {
		return false;
	}

	if (!/^https?$/.test(url.protocol.replace(/:$/, ""))) return false;

	const hostRe =
		/^(?=.{4,253}$)([a-zA-Z0-9](?:[-a-zA-Z0-9]{0,61}[a-zA-Z0-9])?\.)+[A-Za-z]{2,63}$/;
	if (!hostRe.test(url.hostname)) return false;

	if (url.username || url.password) return false;

	return true;
}

export type ValidateLinkResult =
	| { success: true; url: string }
	| { success: false; error: string };

export function validateLink(input: string): ValidateLinkResult {
	const trimmed = input.trim();

	if (!trimmed) {
		return { success: false, error: "Link cannot be empty" };
	}

	const urlString = /^https?:\/\//i.test(trimmed)
		? trimmed
		: `https://${trimmed}`;

	let url: URL;
	try {
		url = new URL(urlString);
	} catch {
		return { success: false, error: "Invalid link format" };
	}

	if (!["http:", "https:"].includes(url.protocol)) {
		return { success: false, error: "Link must use http or https protocol" };
	}

	if (!url.hostname.includes(".")) {
		return { success: false, error: "Invalid domain" };
	}

	const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
	if (ipv4Regex.test(url.hostname)) {
		return { success: false, error: "IP addresses are not allowed" };
	}

	const parts = url.hostname.split(".");
	const tld = parts[parts.length - 1];
	if (tld.length < 2) {
		return { success: false, error: "Invalid top-level domain" };
	}

	if (/\s/.test(url.hostname)) {
		return { success: false, error: "URL contains invalid characters" };
	}

	return {
		success: true,
		url: url.href,
	};
}
