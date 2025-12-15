import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MainLayoutComponent from "./_components/MainLayout";
import { redirect } from "next/navigation";

export default async function MainTemplate({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return redirect("/prihlasit");
	}

	return (
		<MainLayoutComponent
			user={session.user}
			isAdmin={session.user.role == "admin" ? true : false}
		>
			{children}
		</MainLayoutComponent>
	);
}
