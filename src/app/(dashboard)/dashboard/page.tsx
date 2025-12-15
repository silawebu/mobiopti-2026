import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SubscribeButton from "./_components/Subscribe/SubscribeButton";
import { hasPlan } from "@/utils/subscription";
import Subscribe from "./_components/Subscribe";
import NewProject from "./_components/NewProject";

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
				{!isSubscribed ? (
					<>
						<h1 className="font-bold text-3xl pb-5">
							Hello, you are in dashboard
						</h1>
						<Subscribe />
					</>
				) : (
					<>
						<div className="flex items-center w-full justify-between">
							<h1 className="font-bold text-3xl pb-5">Your projects</h1>
							<NewProject />
						</div>
					</>
				)}
				{/* {urls && urls.length > 0 ? (
					<div className="flex py-5 flex-col gap-3">
						{urls.map((u: UrlWithScore, index: number) => (
							<LinkCard key={index} {...u} />
						))}
					</div>
				) : (
					<span>You havent added any links yet</span>
				)} */}
			</div>
		</section>
	);
}
