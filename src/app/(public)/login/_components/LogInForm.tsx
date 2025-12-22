"use client";

import { useState } from "react";
import FormCard from "./FormCard";
import GoogleAuth from "./GoogleAuth";
import gradient from "@public/assets/hero-gradient.svg";
import Image from "next/image";
import GoBack from "@/components/GoBack";

type Props = {
	redirectTo: string | null;
};

export default function LogInForm({ redirectTo }: Props) {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	return (
		<section className="flex items-center justify-center w-full h-dvh relative">
			<div className="fixed z-10 left-0 top-0 p-10">
				<GoBack href="/" text="Back to homepage" />
			</div>
			<div className="relative z-10">
				<FormCard>
					<GoogleAuth
						redirectTo={redirectTo}
						loading={isLoading}
						setLoading={setIsLoading}
					/>
				</FormCard>
			</div>
			<Image
				className="absolute z-0 left-0 top-0 w-full object-center object-cover h-full pointer-events-none"
				src={gradient}
				alt="bg-gradient"
				loading="eager"
				priority={true}
			/>
		</section>
	);
}
