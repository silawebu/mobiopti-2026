"use client";

import ClientDate from "@/components/ClientDate";
import { Ban } from "lucide-react";

type Props = {
	reason: string | null;
	expiresIn: Date | null;
	banned: boolean;
};

export default function BannedBanner({ reason, expiresIn, banned }: Props) {
	if (!banned) {
		return null;
	}

	if (expiresIn && expiresIn < new Date()) {
		return null;
	}

	return (
		<div className="w-full flex flex-col gap-1 h-auto rounded-lg border-2 border-destructive-border bg-linear-to-br from-destructive-from to-destructive-to text-destructive-foreground py-3 px-5">
			<h3 className="flex items-center gap-2 font-bold text-base md:text-lg">
				<Ban className="size-3.5 sm:size-4" />
				User banned
			</h3>
			<p className="text-xs sm:text-sm">
				This user is currently banned.
				{reason && (
					<>
						{" "}
						Reason for this ban: <b>{reason}</b>.
					</>
				)}
				{expiresIn && (
					<>
						{" "}
						This ban expires{" "}
						<b>
							<ClientDate date={expiresIn} />
						</b>
						.
					</>
				)}
			</p>
		</div>
	);
}
