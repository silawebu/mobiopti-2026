import type { User } from "better-auth";
import type { Subscription } from "@/generated/prisma/client";

import { auth } from "@/lib/auth";
import { tryCatch } from "@/utils/try-catch";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Details from "./_components/Details";

export type UserData = {
	name: User["name"];
	email: User["email"];
	emailVerified: User["emailVerified"];
	createdAt: User["createdAt"];
};

export type SubData = {
	plan: Subscription["plan"];
	periodStart: Subscription["periodStart"];
	periodEnd: Subscription["periodEnd"];
	cancelAtPeriodEnd: Subscription["cancelAtPeriodEnd"];
};

type AccountPageData = {
	user: UserData;
	subscription: SubData | null | "error";
};

export default async function UserAccountPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/login");
	}

	const { data: sub, error: subErr } = await tryCatch(
		prisma.subscription.findFirst({
			where: { AND: [{ referenceId: session.user.id }, { status: "active" }] },
			select: {
				plan: true,
				periodStart: true,
				periodEnd: true,
				cancelAtPeriodEnd: true,
			},
		})
	);

	const user: User = session.user;

	const data: AccountPageData = {
		user: {
			name: user.name,
			createdAt: user.createdAt,
			email: user.email,
			emailVerified: user.emailVerified,
		},
		subscription: subErr ? "error" : sub,
	};

	return (
		<div>
			<Details {...data.user} />
		</div>
	);
}
