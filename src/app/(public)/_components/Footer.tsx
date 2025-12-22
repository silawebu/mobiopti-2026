"use client";

import { Logo } from "@/components/Icons/Logo";
import { navLinks } from "@/lib/public/navLinks";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="relative w-full px-6 mt-40 flex justify-center">
			<div className="flex flex-col w-full gap-2 px-2 max-w-[1000px]">
				<div className="flex flex-col md:flex-row gap-10 md:gap-0 items-start justify-between border-b pb-4">
					<div className="w-full md:max-w-114">
						<Logo className="h-12 md:h-8 w-auto" />
						<p className="mt-2 sm:mt-6 text-muted-foreground text-base max-w-sm">
							MobiOpti is a cheap alternative to other SEO tools. It helps you
							improve each page one by one so you can make progress smoothly
						</p>
					</div>
					<div className="flex-1 flex items-end text-left md:text-right md:justify-end gap-20">
						<div>
							<h2 className="font-bold mb-2">Company</h2>
							<ul className="space-y-1 text-muted-foreground">
								{navLinks.map((link, index) => (
									<li key={index}>
										<Link
											href={link.href}
											className="hover:text-primary duration-150"
										>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				<p className="text-xs md:text-sm text-muted-foreground text-center py-2">
					Copyright 2025 © <a href="https://www.martinsil.cz">Martin Šíl</a>.
					All Right Reserved.
				</p>
			</div>
		</footer>
	);
}
