import type { BanSchema } from "@/app/(private)/(admin)/admin/user-management/[userId]/_components/UserDetails/ActionsDropdown/BanUser";

export function simpleDateFormat(date: Date): string {
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();
	const hours = date.getHours();

	let minutes: number | string = date.getMinutes();

	if (minutes < 10) {
		minutes = `0${minutes.toString()}`;
	}

	return `${day}. ${month}. ${year} ${hours}:${minutes}`;
}

export function getSecondsMultiplier(unit: BanSchema["expUnit"]): number {
	switch (unit) {
		case "minutes":
			return 60;
		case "hours":
			return 3600;
		case "days":
			return 86400;
		case "months":
			return 2629744;
	}
}

export function getInitials(name: string): string {
	if (!name || name == "") return "X";
	const split = name.split(" ");
	return `${split[0][0]}${split[1] ? split[1][0] : ""}`;
}

export function isStillBanned(
	banned: boolean,
	expiresIn: Date | null
): boolean {
	if (!banned) {
		return false;
	}

	if (expiresIn && expiresIn < new Date()) {
		return false;
	}

	return true;
}
