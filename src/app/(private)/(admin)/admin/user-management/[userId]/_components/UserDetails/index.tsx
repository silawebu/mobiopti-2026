import type { User } from "@/generated/prisma/client";

import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { BadgeCheck, BadgeX, ShieldHalf } from "lucide-react";
import StripeLink from "./StripeLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import ClientDate from "@/components/ClientDate";
import ActionsDropdown from "./ActionsDropdown";

type Props = User;

export default function UserDetails({
	id,
	stripeCustomerId,
	image,
	name,
	email,
	emailVerified,
	createdAt,
	role,
}: Props) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>User Details</CardTitle>
				<CardDescription>
					Here you can see everything about this user
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-5">
					<div className="relative w-full gap-2.5 flex items-center sm:gap-3">
						<Avatar className="w-14 h-14 sm:w-16 sm:h-16">
							{image && <AvatarImage className="object-cover" src={image} />}
							<AvatarFallback className="bg-primary font-medium text-xl">
								{getInitials(name)}
							</AvatarFallback>
						</Avatar>
						<div className="relative w-[calc(100%-66px)] flex flex-col gap-0">
							<div className="flex items-center w-full relative gap-1.5 sm:gap-2.5">
								<h2 className="font-bold text-lg sm:text-xl truncate">
									{name}
								</h2>
								{role === "admin" && (
									<Badge className="bg-blue-500">
										<ShieldHalf />
										<span className="hidden sm:block text-xs leading-none">Admin</span>
									</Badge>
								)}
							</div>
							<div className="flex items-center bottom-0.5 gap-1.5 truncate relative sm:gap-2.5 sm:bottom-0">
								<p className="truncate relative text-sm sm:text-base">
									{email}
								</p>
								<div
									className={clsx(
										"w-4 h-4 shrink-0 rounded-full leading-none flex items-center justify-center sm:w-5 sm:h-5",
										emailVerified ? "bg-positive" : "bg-destructive"
									)}
								>
									{emailVerified ? (
										<BadgeCheck className="size-3.5 sm:size-4" />
									) : (
										<BadgeX className="size-3.5 sm:size-4" />
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="relative w-full flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-3">
						<div className="text-xs font-mono text-muted-foreground w-full relative truncate lg:w-fit">
							ID: {id}
						</div>
						<div className="w-10 h-px lg:w-1 lg:h-1 rounded-full bg-muted-foreground/50 lg:bg-muted-foreground" />
						<div className="text-xs font-mono text-muted-foreground w-full relative truncate lg:w-fit">
							Joined: <ClientDate date={createdAt} />
						</div>
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<div className="flex flex-col md:flex-row items-center gap-3">
					{stripeCustomerId && (
						<StripeLink stripeCustomerId={stripeCustomerId} />
					)}
				</div>
			</CardFooter>
		</Card>
	);
}

function getInitials(name: string): string {
	if (!name || name == "") return "X";
	const split = name.split(" ");
	return `${split[0][0]}${split[1] ? split[1][0] : ""}`;
}
