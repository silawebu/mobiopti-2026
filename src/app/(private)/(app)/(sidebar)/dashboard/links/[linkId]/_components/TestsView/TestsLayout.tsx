type Props = {
	children: React.ReactNode;
};

export default function TestsLayout({ children }: Props) {
	return (
		<section className="w-full pb-10">
			<div className="w-full text-center py-10">
				<h2 className="font-bold text-2xl md:text-3xl">
					What we found on your page
				</h2>
			</div>
			{children}
		</section>
	);
}
