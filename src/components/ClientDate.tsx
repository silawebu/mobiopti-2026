"use client";

type Props = {
	date: Date | string;
};

export default function ClientDate({ date }: Props) {
	const dateObj = date instanceof Date ? date : new Date(date);
	const now = new Date();
	const isCurrentYear = dateObj.getFullYear() === now.getFullYear();

	const day = dateObj.getDate();
	const month = dateObj.toLocaleString("en-US", { month: "long" });
	const year = dateObj.getFullYear();
	const time = dateObj.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});

	if (isCurrentYear) {
		return <>{`${day}. ${month} ${time}`}</>;
	}

	return <>{`${day}. ${month} ${year} ${time}`}</>;
}
