import type { SubData } from "../../page";

import { TriangleAlert } from "lucide-react";
import ComponentLayout from "./ComponentLayout";
import SubscribeBanner from "../../../links/_components/SubscribeBanner";
import ManageButton from "./ManageButton";
import SubCard from "./SubCard";

type Props = {
	subscription: SubData | null | "error";
};

export default function Subscription({ subscription }: Props) {
	if (subscription === "error") {
		return (
			<ComponentLayout>
				<div className="w-full flex items-center justify-center h-32 border-2 border-dashed rounded-md border-destructive/30 bg-linear-to-br from-destructive-from/30 to-destructive-to/30">
					<div className="text-destructive font-medium gap-3 flex justify-center items-center">
						<TriangleAlert />
						<p>Failed to load subscription...</p>
					</div>
				</div>
			</ComponentLayout>
		);
	}

	if (subscription === null) {
		return (
			<ComponentLayout action={<ManageButton />}>
				<SubscribeBanner animate={false} />
			</ComponentLayout>
		);
	}

	return (
		<ComponentLayout action={<ManageButton />}>
			<SubCard {...subscription} />
		</ComponentLayout>
	);
}
