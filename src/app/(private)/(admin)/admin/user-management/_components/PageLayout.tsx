import { User } from "lucide-react";

type Props = {
	children: React.ReactNode;
};

export default function AdminUserManafementPageLayout({ children }: Props) {
	return (
		<div className="w-full flex justify-center py-10">
			<div className="w-full max-w-4xl flex flex-col gap-10">
				<section className="w-full flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 rounded-2xl bg-linear-to-br from-primary to-secondary border-2 flex items-center justify-center">
							<User />
						</div>
						<h1 className="font-serif font-bold text-3xl leading-[1.1]">
							User Management
						</h1>
					</div>
				</section>
				{children}
			</div>
		</div>
	);
}
