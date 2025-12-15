import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LogInForm from "./_components/LogInForm";

export default async function LoginPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { redirect: rawRedirect } = await searchParams;

	const redirectTo = typeof rawRedirect === "string" ? rawRedirect : null;

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) {
		redirect("/");
	}

	return <LogInForm redirectTo={redirectTo} />;
}
