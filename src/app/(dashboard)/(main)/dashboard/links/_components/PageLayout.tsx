import Heading from "./Heading";

type Props = {
	children: React.ReactNode;
   actionDisabled?: boolean;
};

export default function PageLayout({ children, actionDisabled = false }: Props) {
	return (
		<div className="w-full flex justify-center pt-10">
			<div className="w-full max-w-4xl flex flex-col gap-10">
				<Heading actionDisabled={actionDisabled} />
				{children}
			</div>
		</div>
	);
}
