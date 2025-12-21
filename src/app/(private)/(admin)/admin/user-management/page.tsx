import ExpectedError from "@/components/ExpectedError";
import { User } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { fetchUsersPage, PAGE_SIZE } from "@/utils/admin/user-page-fetcher";
import { getUserPlan } from "@/utils/subscription";
import { PlanId } from "@/utils/subscription/plans";
import { tryCatch } from "@/utils/try-catch";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Paginator from "./_components/Pagination";
import { DataTable } from "./_components/UserDataTable/data-table";
import { columns } from "./_components/UserDataTable/columns";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function UserManagement({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session || session.user.role !== "admin") {
		notFound();
	}

	const pageParam = (await searchParams).page;
	const page = pageParam ? parseInt(pageParam as string) : 1;

	const { data, error } = await tryCatch(fetchUsersPage(page));

	if (error) {
		console.error("[ADMIN:USER-MANAGEMENT]", error);
		return (
			<ExpectedError
				message="Failed to fetch users"
				link={{ text: "Back to admin home", href: "/admin" }}
			/>
		);
	}

	const { pageCount, total, users } = data;

	if (page > pageCount) {
		notFound();
	}

	return (
		<section className="relative w-full overflow-x-hidden">
			<div>
				<div className="container mx-auto pb-10 w-full min-h-[618px] h-[calc(100svh-280px)]">
					<DataTable columns={columns} data={users} />
				</div>
				<Paginator
					count={total}
					page={page}
					itemsPerPage={PAGE_SIZE}
					search={null}
				/>
			</div>
		</section>
	);
}
