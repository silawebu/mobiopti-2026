"use client";

import { UserData } from "@/utils/admin/user-page-fetcher";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<UserData>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "subscription",
		header: "Plan",
	},
];
