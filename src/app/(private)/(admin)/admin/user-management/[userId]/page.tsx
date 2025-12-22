import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { tryCatch } from "@/utils/try-catch";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import AdminUserPageLayout from "./_components/PageLayout";
import ExpectedError from "@/components/ExpectedError";
import { getUsersLinksWithScore } from "@/utils/admin/get-users-links-with-score";
import UserDetails from "./_components/UserDetails";

type Props = {
	params: Promise<{ userId: string }>;
};

export default async function AdminUserDetail({ params }: Props) {
	const [session, { userId }] = await Promise.all([
		auth.api.getSession({ headers: await headers() }),
		params,
	]);

	if (session?.user.role !== "admin") {
		notFound();
	}

	const { data: user, error: userError } = await tryCatch(
		prisma.user.findUnique({ where: { id: userId } })
	);

	if (userError) {
		console.error(`[ADMIN:USER:${userId}]`, userError);
		return (
			<AdminUserPageLayout>
				<ExpectedError
					className="mt-10"
					message="Failed to fetch user"
					link={{
						text: "Back to user management",
						href: "/admin/user-management",
					}}
				/>
			</AdminUserPageLayout>
		);
	}

	if (!user) {
		notFound();
	}

	const [subscription, links] = await Promise.all([
		tryCatch(
			prisma.subscription.findFirst({
				where: { AND: [{ referenceId: userId }, { status: "active" }] },
			})
		),
		tryCatch(getUsersLinksWithScore(userId)),
	]);

	return (
		<AdminUserPageLayout>
			<UserDetails {...user} />
			<div className="w-full xl:block hidden overflow-x-scroll">
				<pre>{JSON.stringify(user, null, 2)}</pre>
				<hr />
				<pre>{JSON.stringify(subscription, null, 2)}</pre>
				<hr />
				<pre>{JSON.stringify(links, null, 2)}</pre>
			</div>
		</AdminUserPageLayout>
	);
}
