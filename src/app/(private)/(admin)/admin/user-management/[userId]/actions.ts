"use server";

import type { BanSchema } from "./_components/UserDetails/ActionsDropdown/BanUser";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
	getSecondsMultiplier,
	isStillBanned,
	simpleDateFormat,
} from "@/utils/admin/helper-functions";
import { tryCatch } from "@/utils/try-catch";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function makeAdmin(userId: string) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return { error: "Only authenticated users can access this feature" };
	}

	const {
		user: { id, role },
	} = session;

	if (role !== "admin" || id !== process.env.SUPERADMIN_USER_ID) {
		return { error: "Only super administrators can access this feature" };
	}

	if (userId === id) {
		return { error: "You cannot promote yourself to administrator" };
	}

	const { data: user, error: userError } = await tryCatch(
		prisma.user.findUniqueOrThrow({
			where: { id: userId },
			select: { role: true, id: true },
		})
	);

	if (userError || !user) {
		return { error: "Could not find user with provided ID" };
	}

	if (user.role === "admin") {
		return { error: "This user is already an admin" };
	}

	const { error } = await tryCatch(
		auth.api.setRole({
			body: {
				userId: user.id,
				role: "admin",
			},
			headers: await headers(),
		})
	);

	if (error) {
		console.error(`[ADMIN:PROMOTE-ACTION:${userId}]`, error);
		return { error: "Failed to promote user" };
	}

	revalidatePath(`/admin/user-management/${userId}`);

	return {
		error: null,
	};
}

export async function removeAdmin(userId: string) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return { error: "Only authenticated users can access this feature" };
	}

	const {
		user: { id, role },
	} = session;

	if (role !== "admin" || id !== process.env.SUPERADMIN_USER_ID) {
		return { error: "Only super administrators can access this feature" };
	}

	if (userId === id) {
		return { error: "You cannot remove your admin permissions" };
	}

	const { data: user, error: userError } = await tryCatch(
		prisma.user.findUniqueOrThrow({
			where: { id: userId },
			select: { role: true, id: true },
		})
	);

	if (userError || !user) {
		return { error: "Could not find user with provided ID" };
	}

	if (user.role !== "admin") {
		return { error: "This user already is not an admin" };
	}

	const { error } = await tryCatch(
		auth.api.setRole({
			body: {
				userId: user.id,
				role: "user",
			},
			headers: await headers(),
		})
	);

	if (error) {
		console.error(`[ADMIN:DEMOTE-ACTION:${userId}]`, error);
		return { error: "Failed to demote user" };
	}

	revalidatePath(`/admin/user-management/${userId}`);

	return {
		error: null,
	};
}

export async function banUser(values: BanSchema, userId: string) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return { error: "Only authenticated users can access this feature" };
	}

	const {
		user: { id, role },
	} = session;

	if (role !== "admin") {
		return { error: "Only administrators can access this feature" };
	}

	if (userId === id) {
		return { error: "You cannot ban yourself" };
	}

	const { data: user, error: userError } = await tryCatch(
		prisma.user.findUniqueOrThrow({
			where: { id: userId },
			select: { role: true, id: true, banned: true, banExpires: true },
		})
	);

	if (userError || !user) {
		return { error: "Could not find user with provided ID" };
	}

	if (user.role === "admin") {
		return { error: "You cannot ban other admins" };
	}

	if (isStillBanned(user.banned ?? false, user.banExpires)) {
		return {
			error: `User is already banned.${
				user.banExpires
					? ` Ban expires at ${simpleDateFormat(user.banExpires)}.`
					: ""
			}`,
		};
	}

	const { error } = await tryCatch(
		auth.api.banUser({
			body: {
				userId: userId,
				banReason: values.reason,
				banExpiresIn: values.expValue * getSecondsMultiplier(values.expUnit),
			},
			headers: await headers(),
		})
	);

	if (error) {
		console.error(`[ADMIN:BAN-ACTION:${userId}]`, error);
		return { error: "Failed to ban user" };
	}

	revalidatePath(`/admin/user-management/${userId}`);

	return {
		error: null,
	};
}

export async function unbanUser(userId: string) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return { error: "Only authenticated users can access this feature" };
	}

	const {
		user: { id, role },
	} = session;

	if (role !== "admin") {
		return { error: "Only administrators can access this feature" };
	}

	if (userId === id) {
		return { error: "You cannot unban yourself" };
	}

	const { data: user, error: userError } = await tryCatch(
		prisma.user.findUniqueOrThrow({
			where: { id: userId },
			select: { role: true, id: true, banned: true, banExpires: true },
		})
	);

	if (userError || !user) {
		return { error: "Could not find user with provided ID" };
	}

	if (!isStillBanned(user.banned ?? false, user.banExpires)) {
		return {
			error: "User is not banned therefore you cannot unban him",
		};
	}

	const { error } = await tryCatch(
		auth.api.unbanUser({
			body: {
				userId: user.id,
			},
			headers: await headers(),
		})
	);

	if (error) {
		console.error(`[ADMIN:UNBAN-ACTION:${userId}]`, error);
		return { error: "Failed to unban user" };
	}

	revalidatePath(`/admin/user-management/${userId}`);

	return {
		error: null,
	};
}
