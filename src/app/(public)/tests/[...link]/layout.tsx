type Props = {
	children: React.ReactNode;
};

export default function LinkLayout({ children }: Props) {
	return (
		<div className="w-full flex justify-center py-20">
			<div className="w-full max-w-4xl flex flex-col gap-4">{children}</div>
		</div>
	);
}
