"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export type BreadcrumbSegment = {
	name: string;
	href: string;
	clickable?: boolean;
};

const UNCLICKABLE_SLUGS = [""];

const CUID_PATTERN = /^c[a-z0-9]{20,30}$/;

export default function SidebarBreadcrumb() {
	const pathNames = getBreadcrumbSegments(usePathname(), UNCLICKABLE_SLUGS);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem className="hidden md:block">
					<BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
				</BreadcrumbItem>
				{pathNames.map((pathName: BreadcrumbSegment, index: number) => (
					<Fragment key={index}>
						<BreadcrumbSeparator className="hidden md:block" />
						<BreadcrumbItem>
							{pathName.clickable !== false ? (
								<BreadcrumbLink href={pathName.href}>
									{pathName.name}
								</BreadcrumbLink>
							) : (
								<span className="cursor-default text-muted-foreground">
									{pathName.name}
								</span>
							)}
						</BreadcrumbItem>
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

function getBreadcrumbSegments(
	path: string,
	unclickableSlugs: string[] = []
): BreadcrumbSegment[] {
	const segments = path.split("/").filter((s) => s && s !== "dashboard");
	const items: BreadcrumbSegment[] = [];

	let href = "/dashboard";

	for (const segment of segments) {
		href += `/${segment}`;
		items.push({
			name: getPathName(segment),
			href,
			clickable: !unclickableSlugs.includes(segment),
		});
	}

	return items;
}

function isCuid(segment: string): boolean {
	return CUID_PATTERN.test(segment);
}

function formatCuid(cuid: string): string {
	const prefix = cuid.slice(0, 2).toUpperCase();
	const suffix = cuid.slice(-2).toUpperCase();
	return `${prefix}...${suffix}`;
}

function getPathName(pathSlug: string | undefined): string {
	if (!pathSlug) return "";

	if (isCuid(pathSlug)) {
		return formatCuid(pathSlug);
	}

	switch (pathSlug) {
		case "dashboard":
			return "Dashboard";
		case "links":
			return "Links";
		case "account":
			return "Account";
		default:
			return pathSlug.replace("-", " ").toUpperCase();
	}
}
