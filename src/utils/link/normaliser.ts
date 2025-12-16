export function normaliseUrl(rawInput: string): string | null {
	if (!rawInput) return null;

	const trimmed = rawInput.trim();

	// Pre-add https:// only if the user did not specify a scheme
	const inputWithScheme = /^(https?:)?\/\//i.test(trimmed)
		? trimmed
		: `https://${trimmed}`;

	try {
		// If this throws, the string is not a valid absolute URL
		const url = new URL(inputWithScheme);
		return url.toString(); // Always includes protocol + trailing slash rules.
	} catch {
		return null;
	}
}
