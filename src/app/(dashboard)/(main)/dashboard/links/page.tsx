import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Heading from "./_components/Heading";

export default async function LinksPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect(`/login?redirect=${encodeURIComponent("/dashboard/links")}`);
	}

	return (
		<div className="w-full flex justify-center pt-10">
			<div className="w-full max-w-4xl flex flex-col gap-10">
				<Heading />
				<span className="text-muted-foreground text-xs sm:text-sm md:text-base">
					You havent added any links yet
				</span>
			</div>
		</div>
	);
}
