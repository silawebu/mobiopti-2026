import "server-only";

export function isSuperAdmin(userId: string, userRole: string | null): boolean {
	const superAdminId = process.env.SUPERADMIN_USER_ID;

	if (superAdminId === undefined) {
		return false;
	}

	if (userRole !== "admin") {
		return false;
	}

	if (superAdminId !== userId) {
		return false;
	}

	return true;
}
