import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { hasPlan } from "@/utils/subscription";
import Subscribe from "./_components/Subscribe";

export default async function Dashboard() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/login");
	}

	const isSubscribed = await hasPlan(session.user.id, "premium");

	return (
		<section className="w-full flex items-center justify-center py-10">
			<div className="max-w-[1000px] w-full px-2">
				<h1 className="font-bold text-3xl pb-5">Welcome to MobiOpti</h1>
				{!isSubscribed && <Subscribe />}
			</div>
		</section>
	);
}
