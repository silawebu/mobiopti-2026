"use client";

type Props = {
	date: Date;
};

export default function ClientDate({ date }: Props) {
	const now = new Date();
	const isCurrentYear = date.getFullYear() === now.getFullYear();

	const day = date.getDate();
	const month = date.toLocaleString("en-US", { month: "long" });
	const year = date.getFullYear();
	const time = date.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});

	if (isCurrentYear) {
		return <>{`${day}. ${month} ${time}`}</>;
	}

	return <>{`${day}. ${month} ${year} ${time}`}</>;
}
