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

export default function SidebarBreadcrumb() {
	const pathNames = getBreadcrumbSegments(usePathname(), UNCLICKABLE_SLUGS);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem className="hidden md:block">
					<BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
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

	let href = "";

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

function getPathName(pathSlug: string | undefined) {
	switch (pathSlug) {
		case "dashboard":
			return "Dashboard";
		case "links":
			return "Links";
		default:
			return pathSlug?.replace("-", " ").toUpperCase() ?? "";
	}
}
