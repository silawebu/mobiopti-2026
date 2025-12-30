"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { LOADING_DURATION } from "./index";

type Props = {
	loading: boolean;
};

export default function LoadingAnimation({ loading }: Props) {
	const [progress, setProgress] = useState(0);
	const [visible, setVisible] = useState(false);
	const overlayRef = useRef<HTMLDivElement>(null);
	const progressRef = useRef({ value: 0 });

	// Handle showing the overlay
	useEffect(() => {
		if (loading) {
			setVisible(true);
			setProgress(0);
			progressRef.current.value = 0;
		}
	}, [loading]);

	// Handle animations after overlay is mounted
	useEffect(() => {
		if (!visible || !overlayRef.current) return;

		if (loading) {
			// Fade in animation
			gsap.fromTo(
				overlayRef.current,
				{ opacity: 0 },
				{ opacity: 1, duration: 0.3, ease: "power2.out" }
			);

			// Progress animation
			gsap.to(progressRef.current, {
				value: 100,
				duration: (LOADING_DURATION - 100) / 1000,
				ease: "power1.inOut",
				onUpdate: () => {
					setProgress(Math.round(progressRef.current.value));
				},
			});
		} else {
			// Fade out when loading becomes false
			gsap.to(overlayRef.current, {
				opacity: 0,
				duration: 0.2,
				ease: "power2.in",
				onComplete: () => {
					setVisible(false);
					setProgress(0);
					progressRef.current.value = 0;
				},
			});
		}

		return () => {
			gsap.killTweensOf(progressRef.current);
			gsap.killTweensOf(overlayRef.current);
		};
	}, [visible, loading]);

	if (!visible) return null;

	return (
		<div
			ref={overlayRef}
			className="fixed inset-0 w-dvw h-svh left-0 top-0 z-50 flex items-center justify-center bg-background backdrop-blur-sm"
			style={{ opacity: 0 }}
		>
			<div className="flex flex-col items-center gap-6 w-full max-w-xs px-6">
				<div className="text-center space-y-2">
					<h2 className="text-lg font-semibold tracking-tight">
						Analyzing your link
					</h2>
					<p className="text-sm text-muted-foreground">
						Running SEO & performance tests...
					</p>
				</div>
				<Progress value={progress} className="w-full h-2.5" />
				<span className="text-sm font-medium text-muted-foreground tabular-nums">
					{progress}%
				</span>
			</div>
		</div>
	);
}
