import type { TestWithLastRun } from "@/utils/get-tests";
import TestCard from "./TestCard";
import RunTestsButton from "../../RunTestsButton";
import SubscribeToSeeAllTests from "../SubscribeToSeeAllTests";

type Props = {
	tests: TestWithLastRun[];
	isSubscribed: boolean;
	linkId: string;
};

export default function TestsData({ tests, isSubscribed, linkId }: Props) {
	return (
		<div className="w-full flex justify-center">
			{tests.length > 0 ? (
				<div className="max-w-2xl w-full flex flex-col gap-4">
					{tests.map((test: TestWithLastRun, index: number) => (
						<TestCard key={index} {...test} />
					))}

					{!isSubscribed && <SubscribeToSeeAllTests linkId={linkId} />}
				</div>
			) : (
				<div className="flex flex-col gap-3 items-center justify-center text-center">
					<span className="text-muted-foreground">
						No tests have been done for this link yet...
					</span>
					<RunTestsButton />
				</div>
			)}
		</div>
	);
}
