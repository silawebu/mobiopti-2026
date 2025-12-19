import GoBack from "@/components/GoBack";

type Props = {
	children: React.ReactNode;
};

export default function LinkLayout({ children }: Props) {
	return (
		<div className="w-full flex justify-center py-10">
			<div className="w-full max-w-4xl flex flex-col gap-4">
				<div>
					<GoBack text="Back to all links" href="/dashboard/links" />
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
}
