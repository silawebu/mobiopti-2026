import { DiamondPlus, Mail, User } from "lucide-react";
import type { UserData } from "../../page";

import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import ClientDate from "@/components/ClientDate";
import DetailCard from "./DetailCard";
import LogOutButton from "./LogOutButton";

type Props = UserData;

export default function Details({
	name,
	email,
	emailVerified,
	createdAt,
}: Props) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Account Details</CardTitle>
				<CardDescription>See information about your account</CardDescription>
				<CardAction>
					<LogOutButton />
				</CardAction>
			</CardHeader>
			<CardContent>
				<div className="w-full grid grid-cols-1 gap-5 relative sm:grid-cols-2 sm:gap-x-2 sm:gap-y-6 xl:grid-cols-3 xl:py-2 xl:pt-4">
					<DetailCard icon={User} label="Name" value={<>{name}</>} />
					<DetailCard icon={Mail} label="Email" value={<>{email}</>} />
					<DetailCard
						icon={DiamondPlus}
						label="Creation date"
						value={<ClientDate date={createdAt} />}
					/>
				</div>
			</CardContent>
		</Card>
	);
}
