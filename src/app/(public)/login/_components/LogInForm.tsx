"use client";

import { useState } from "react";
import FormCard from "./FormCard";
import GoogleAuth from "./GoogleAuth";

type Props = {
	redirectTo: string | null;
};

export default function LogInForm({ redirectTo }: Props) {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	return (
		<section className="flex items-center justify-center w-full h-dvh">
			<FormCard>
				<GoogleAuth
					redirectTo={redirectTo}
					loading={isLoading}
					setLoading={setIsLoading}
				/>
			</FormCard>
		</section>
	);
}
