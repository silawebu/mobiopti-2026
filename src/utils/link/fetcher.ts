// lib/fetchers.ts
import axios, { AxiosError, AxiosResponse } from "axios";
import { normaliseUrl } from "./normaliser";

export async function fetchPage(
	rawInput: string,
	opts?: { timeoutMs?: number }
): Promise<AxiosResponse> {
	const canonical = normaliseUrl(rawInput);
	if (!canonical) throw new Error("Invalid URL");

	const timeout = opts?.timeoutMs ?? 10_000;

	try {
		return await axios.get(canonical, { timeout, maxRedirects: 5 });
	} catch (err) {
		if (/^http:\/\//.test(canonical)) throw err;

		const axErr = err as AxiosError;
		const networkish =
			axErr.code === "ECONNREFUSED" ||
			axErr.code === "ERR_TLS_CERT_ALTNAME_INVALID" ||
			axErr.code === "ECONNRESET" ||
			axErr.code === "ENOTFOUND";

		if (!networkish) throw err;

		const httpUrl = canonical.replace(/^https:/, "http:");
		return await axios.get(httpUrl, { timeout, maxRedirects: 5 });
	}
}
