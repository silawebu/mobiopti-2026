"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePageRedirector() {
	const router = useRouter();

	useEffect(() => {
		async function authCheck() {
			const { data: session } = await authClient.getSession();
			if (session) {
				router.push("/dashboard");
			}
		}
		authCheck();
	}, []);

	return null;
}
