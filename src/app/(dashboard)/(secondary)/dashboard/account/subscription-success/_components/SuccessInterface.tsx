import { Button } from "@/components/ui/button";
import AnimatedCheck from "./AnimatedCheck";
import Link from "next/link";

type Props = {
	redirectTo: string;
};

export default function SuccessInterface({ redirectTo }: Props) {
	return (
		<section className="min-h-screen bg-background flex items-center justify-center px-6">
			<div className="max-w-md w-full text-center">
				<AnimatedCheck />
				<h1 className="text-3xl font-bold tracking-tight text-balance mb-4">
					Welcome to Premium!
				</h1>
				<p className="text-muted-foreground text-pretty leading-relaxed mb-10">
					You've made a great decision. Get ready to experience the full power
					of MobiOpti and take your SEO to the next level.
				</p>
				<Link href={redirectTo}>
					<Button size="lg" className="w-full sm:w-auto px-8">
						Start using MobiOpti
					</Button>
				</Link>
				<div className="mt-2.5">
					<Link href={"/dashboar/account"}>
						<Button
							variant="ghost"
							size="sm"
							className="text-muted-foreground hover:text-foreground"
						>
							View account settings
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
