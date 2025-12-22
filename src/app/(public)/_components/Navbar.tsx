"use client";

import { Logo } from "@/components/Icons/Logo";
import { Button } from "@/components/ui/button";
import { type NavLink, navLinks } from "@/lib/public/navLinks";
import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
	const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);

	useEffect(() => {
		if (openMobileMenu) {
			document.body.classList.add("max-md:overflow-hidden");
		} else {
			document.body.classList.remove("max-md:overflow-hidden");
		}
	}, [openMobileMenu]);

	return (
		<nav
			className={`flex items-center justify-between fixed z-50 top-0 w-full px-6 md:px-16 lg:px-24 xl:px-32 py-4 ${
				openMobileMenu ? "" : "backdrop-blur"
			}`}
		>
			<Link href="/">
				<Logo className="h-8 md:h-5 w-auto" />
			</Link>
			<div className="hidden items-center md:gap-8 lg:gap-9 md:flex lg:pl-20">
				{navLinks.map((link: NavLink, index: number) => (
					<Link
						key={index}
						href={link.href}
						className="hover:text-primary duration-150"
					>
						{link.name}
					</Link>
				))}
			</div>

			<div
				className={`fixed inset-0 flex flex-col items-center justify-center gap-6 text-lg font-medium bg-white/60 dark:bg-black/40 backdrop-blur-md md:hidden transition duration-300 ${
					openMobileMenu ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				{navLinks.map((link) => (
					<Link key={link.name} href={link.href}>
						{link.name}
					</Link>
				))}
				<Link href={"/login"}>
					<Button size={"lg"} className="text-lg font-medium">
						Log In
					</Button>
				</Link>
				<Button
					variant={"outline"}
					size={"icon-lg"}
					className="fixed top-2 right-2"
					onClick={() => setOpenMobileMenu(false)}
				>
					<XIcon />
				</Button>
			</div>
			<div className="flex items-center gap-4">
				<Link href={"/login"}>
					<Button size={"lg"} className="text-lg font-medium cursor-pointer">
						Get started
					</Button>
				</Link>
				<button
					onClick={() => setOpenMobileMenu(!openMobileMenu)}
					className="md:hidden"
				>
					<MenuIcon size={26} className="active:scale-90 transition" />
				</button>
			</div>
		</nav>
	);
}
