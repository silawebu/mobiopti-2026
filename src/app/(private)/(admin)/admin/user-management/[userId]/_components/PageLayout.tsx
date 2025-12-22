import { User } from "lucide-react";

type Props = {
	children: React.ReactNode;
};

export default function AdminUserPageLayout({ children }: Props) {
	return (
		<div className="w-full flex justify-center py-10">
			<div className="w-full max-w-4xl flex flex-col gap-10">
				{children}
			</div>
		</div>
	);
}
