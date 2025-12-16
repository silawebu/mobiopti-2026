import { Link2 } from "lucide-react";
import AddLink from "./AddLink";

type Props = {
	actionDisabled?: boolean;
};

export default function Heading({ actionDisabled = false }: Props) {
	return (
		<section className="w-full flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
			<div className="flex items-center gap-3">
				<div className="w-12 h-12 rounded-2xl bg-linear-to-br from-primary to-secondary border-2 flex items-center justify-center">
					<Link2 />
				</div>
				<h1 className="font-serif font-bold text-3xl leading-[1.1]">
					Your links
				</h1>
			</div>
			{!actionDisabled && <AddLink />}
		</section>
	);
}
