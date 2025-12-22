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

// CUID pattern (starts with 'c', 21-31 lowercase alphanumeric)
const CUID_PATTERN = /^c[a-z0-9]{20,30}$/;

// Generic ID pattern (32 alphanumeric characters - BetterAuth style)
const GENERIC_ID_PATTERN = /^[a-zA-Z0-9]{32}$/;

export default function SidebarBreadcrumb() {
	const pathNames = getBreadcrumbSegments(usePathname(), UNCLICKABLE_SLUGS);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem className="hidden md:block">
					<BreadcrumbLink href="/admin">Administration</BreadcrumbLink>
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
	const segments = path.split("/").filter((s) => s && s !== "admin");
	const items: BreadcrumbSegment[] = [];

	let href = "/admin";

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

function isGenericId(segment: string): boolean {
	return GENERIC_ID_PATTERN.test(segment);
}

function formatId(id: string): string {
	const prefix = id.slice(0, 3);
	const suffix = id.slice(-3);
	return `${prefix}...${suffix}`;
}

function getPathName(pathSlug: string | undefined): string {
	if (!pathSlug) return "";

	// Check for CUID or generic 32-char ID
	if (isCuid(pathSlug) || isGenericId(pathSlug)) {
		return formatId(pathSlug);
	}

	switch (pathSlug) {
		case "user-management":
			return "User Management";
		default:
			return pathSlug.replace("-", " ").toUpperCase();
	}
}