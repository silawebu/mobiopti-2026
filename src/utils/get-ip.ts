import "server-only";

import { headers } from "next/headers";

export async function getIp(): Promise<string | null> {
	const headersList = await headers();
	const forwardedFor = headersList.get("x-forwarded-for");
	const realIp = headersList.get("x-real-ip");

	if (forwardedFor) {
		return forwardedFor.split(",")[0].trim();
	}

	if (realIp) return realIp.trim();

	return null;
}
