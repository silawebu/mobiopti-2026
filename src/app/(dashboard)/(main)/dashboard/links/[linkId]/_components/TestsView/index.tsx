import type { TestWithLastRun } from "@/utils/get-tests";
import TestsError from "./TestsError";
import TestsData from "./TestsData";
import TestsLayout from "./TestsLayout";

type TestsResult =
	| { data: TestWithLastRun[]; error: null }
	| { data: null; error: Error };

type Props = {
	testsResult: TestsResult;
	isSubscribed: boolean;
	linkId: string;
};

export default function TestsView({
	testsResult,
	isSubscribed,
	linkId,
}: Props) {
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
			<TestsData tests={tests} isSubscribed={isSubscribed} linkId={linkId} />
		</TestsLayout>
	);
}
