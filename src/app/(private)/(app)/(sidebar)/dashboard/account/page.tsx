import type { User } from "better-auth";
import type { Subscription as Sub } from "@/generated/prisma/client";

import { auth } from "@/lib/auth";
import { tryCatch } from "@/utils/try-catch";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Details from "./_components/Details";
import Subscription from "./_components/Subscription";
import CloseAccount from "./_components/CloseAccount";

export type UserData = {
	name: User["name"];
	email: User["email"];
	emailVerified: User["emailVerified"];
	createdAt: User["createdAt"];
};

export type SubData = {
	plan: Sub["plan"];
	periodStart: Sub["periodStart"];
	periodEnd: Sub["periodEnd"];
	cancelAtPeriodEnd: Sub["cancelAtPeriodEnd"];
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
		<div className="flex flex-col gap-4">
			<Details {...data.user} />
			<Subscription subscription={data.subscription} />
			<CloseAccount />
		</div>
	);
}
