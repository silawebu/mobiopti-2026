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
