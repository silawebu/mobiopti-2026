"use client";

import { Sparkles } from "lucide-react";
import SubscribeButton from "../../_components/Subscribe/SubscribeButton";
import { useEffect, useState } from "react";

export const SubscriptionBanner = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 2000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div
			className={`
        grid transition-all duration-500 ease-out
        ${
					isVisible
						? "grid-rows-[1fr] opacity-100"
						: "grid-rows-[0fr] opacity-0"
				}
      `}
		>
			<div className="overflow-hidden">
				<div
					className={`
            p-4 mb-10 rounded-lg bg-linear-to-br from-primary/25 via-primary/15 to-primary/5 
            border-2 border-primary/30 flex items-center justify-between gap-4
            transition-transform duration-500 ease-out flex-col sm:flex-row
            ${isVisible ? "translate-y-0" : "-translate-y-2"}
          `}
				>
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-full bg-primary/20">
							<Sparkles className="w-5 h-5 text-primary" />
						</div>
						<div>
							<p className="font-medium text-foreground">Upgrade to Premium</p>
							<p className="text-sm text-muted-foreground">
								Unlock advanced analysis to improve your SEO
							</p>
						</div>
					</div>
					<SubscribeButton
						cancelUrl="/dashboard/links"
						returnUrl="/dashboard/links"
						button={{ size: "default", label: "Subscribe Now", className: "w-full sm:w-fit" }}
					/>
				</div>
			</div>
		</div>
	);
};
