"use client";

import clsx from "clsx";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function AnimatedCheck() {
	const [showCheck, setShowCheck] = useState<boolean>(false);

	useEffect(() => {
		setTimeout(() => setShowCheck(true), 100);
	}, []);

	return (
		<div className="mb-8 flex justify-center">
			<div
				className={clsx(
					"transition-all duration-700 ease-out",
					showCheck
						? "scale-100 opacity-100 rotate-0"
						: "scale-50 opacity-0 rotate-45"
				)}
			>
				<div className="relative">
					<div
						className={clsx(
							"absolute inset-0 rounded-full bg-primary/20 transition-all duration-1000 ease-out",
							showCheck ? "scale-150 opacity-0" : "scale-100 opacity-100"
						)}
					/>
					<CheckCircle2
						className="size-24 text-primary relative z-10"
						strokeWidth={1.5}
					/>
				</div>
			</div>
		</div>
	);
}
