import HomeLinkInput from "../../tests/[[...link]]/_components/HomeLinkInput";

export default function HeroSection() {
	return (
		<section className="w-full min-h-[700px] h-[90vh] bg-[url('/assets/hero-gradient.svg')] bg-no-repeat bg-cover">
			<div className="pb-40 lg:pb-14 flex flex-col items-center justify-center text-center px-4">
				<div className="flex flex-wrap items-center justify-center gap-3 p-1.5 pr-4 mt-46 rounded-full border border-slate-300 dark:border-slate-600 bg-white/70 dark:bg-slate-600/20">
					<div className="flex items-center -space-x-3">
						<img
							className="size-7 rounded-full"
							height={50}
							width={50}
							src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
							alt="userImage1"
						/>
						<img
							className="size-7 rounded-full"
							height={50}
							width={50}
							src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
							alt="userImage2"
						/>
						<img
							className="size-7 rounded-full"
							height={50}
							width={50}
							src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50&h=50&auto=format&fit=crop"
							alt="userImage3"
						/>
					</div>
					<p className="text-xs">Join community of 100+ marketers</p>
				</div>
				<h1 className="mt-10 text-5xl/15 md:text-[64px]/19 lg:text-[75px]/20 font-semibold max-w-2xl">
					Proper marketing begins with{" "}
					<span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
						SEO
					</span>
				</h1>
				<p className="text-base text-muted-foreground max-w-sm mt-5">
					Our tools helps business owners an contractors to improve search
					engine optimisation per page basis
				</p>
				<HomeLinkInput />
			</div>
		</section>
	);
}
