import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AdminLayoutComponent from "./_components/AdminLayout";

export default async function MainTemplate({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session || session.user.role !== "admin") {
		return children;
	}

	return <AdminLayoutComponent>{children}</AdminLayoutComponent>;
}
