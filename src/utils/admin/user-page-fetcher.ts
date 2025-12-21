import "server-only";

import prisma from "@/lib/prisma";

export const PAGE_SIZE: number = 3 as const;

export type SubscriptionStatus =
	| { plan: "premium"; cancelAtPeriodEnd: boolean }
	| { plan: "free"; cancelAtPeriodEnd: null };

export type UserData = {
	id: string;
	name: string;
	email: string;
	banned: boolean | null;
	role: string | null;
	subscription: SubscriptionStatus;
};

export type PageResult = {
	users: UserData[];
	total: number;
	page: number;
	pageCount: number;
};

export async function fetchUsersPage(page: number): Promise<PageResult> {
	const skip = (page - 1) * PAGE_SIZE;

	const [users, total] = await Promise.all([
		prisma.user.findMany({
			select: { id: true, name: true, email: true, banned: true, role: true },
			skip,
			take: PAGE_SIZE,
			orderBy: { createdAt: "desc" },
		}),
		prisma.user.count(),
	]);

	const userIds = users.map((u) => u.id);
	const subscriptions = await prisma.subscription.findMany({
		where: { status: "active", referenceId: { in: userIds } },
		select: { referenceId: true, cancelAtPeriodEnd: true },
	});

	const subMap = new Map(
		subscriptions.map((s) => [s.referenceId, s.cancelAtPeriodEnd ?? false])
	);

	return {
		users: users.map((user) => ({
			...user,
			subscription: subMap.has(user.id)
				? { plan: "premium", cancelAtPeriodEnd: subMap.get(user.id)! }
				: { plan: "free", cancelAtPeriodEnd: null },
		})),
		total,
		page,
		pageCount: Math.ceil(total / PAGE_SIZE),
	};
}
