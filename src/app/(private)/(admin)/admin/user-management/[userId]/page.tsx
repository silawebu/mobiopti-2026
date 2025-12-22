import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { tryCatch } from "@/utils/try-catch";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import AdminUserPageLayout from "./_components/PageLayout";
import ExpectedError from "@/components/ExpectedError";
import { getUsersLinksWithScore } from "@/utils/admin/get-users-links-with-score";
import UserDetails from "./_components/UserDetails";
import { isSuperAdmin } from "@/utils/admin/is-super-admin";
import UserLinks from "./_components/UserLinks";
import UserSubscription from "./_components/UserSubscription";

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

	const isMeSuperAdmin = isSuperAdmin(session.user.id, session.user.role);
	const isUserSuperAdmin = isSuperAdmin(userId, user.role);

	return (
		<AdminUserPageLayout>
			<UserDetails
				{...user}
				isMeSuperAdmin={isMeSuperAdmin}
				isUserSuperAdmin={isUserSuperAdmin}
				isMe={user.id === session.user.id}
			/>
			<UserSubscription subscriptionResult={subscription} userId={userId} />
			<UserLinks linksResult={links} />
		</AdminUserPageLayout>
	);
}
