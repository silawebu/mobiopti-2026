import ExpectedError from "@/components/ExpectedError";
import { User } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { fetchUsersPage } from "@/utils/admin/user-page-fetcher";
import { getUserPlan } from "@/utils/subscription";
import { PlanId } from "@/utils/subscription/plans";
import { tryCatch } from "@/utils/try-catch";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function UserManagement() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session || session.user.role !== "admin") {
		notFound();
	}

	const { data, error } = await tryCatch(fetchUsersPage(1));

	if (error) {
		console.error("[ADMIN:USER-MANAGEMENT]", error);
		return (
			<ExpectedError
				message="Failed to fetch users"
				link={{ text: "Back to admin home", href: "/admin" }}
			/>
		);
	}

	return (
		<div className="relative w-full overflow-x-hidden">
			<p>
				Page {data.page} of {data.pageCount} ({data.total} users)
			</p>
			<hr />
			<pre>{JSON.stringify(data.users, null, 2)}</pre>
		</div>
	);
}
