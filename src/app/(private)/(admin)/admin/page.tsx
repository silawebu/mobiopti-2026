import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import TrafficChart from "./_components/TrafficChart";
import RadialChart from "./_components/RadialChart";
import TransactionChart from "./_components/TransactionChart";

export default async function AdminHomePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session || session.user.role !== "admin") {
		notFound();
	}

	return (
		<div className="flex flex-col gap-5">
			<TrafficChart />
			<div className="grid gap-5 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
				<RadialChart />
				<TransactionChart className="lg:col-span-2 xl:col-span-3" />
			</div>
		</div>
	);
}
