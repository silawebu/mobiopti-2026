import type { TestWithLastRun } from "@/utils/get-tests";
import TestsError from "./TestsError";
import TestsData, { SubscriptionSettings } from "./TestsData";
import TestsLayout from "./TestsLayout";

type TestsResult =
	| { data: TestWithLastRun[]; error: null }
	| { data: null; error: Error };

type Props = {
	testsResult: TestsResult;
	subscription: SubscriptionSettings;
};

export default function TestsView({ testsResult, subscription }: Props) {
	const { data: tests, error } = testsResult;

	if (error) {
		return (
			<TestsLayout>
				<TestsError error={error} />
			</TestsLayout>
		);
	}

	return (
		<TestsLayout>
			<TestsData tests={tests} subscription={subscription} />
		</TestsLayout>
	);
}
