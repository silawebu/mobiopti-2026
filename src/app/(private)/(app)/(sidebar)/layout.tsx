import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MainLayoutComponent from "./_components/MainLayout";

export default async function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return children;
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
