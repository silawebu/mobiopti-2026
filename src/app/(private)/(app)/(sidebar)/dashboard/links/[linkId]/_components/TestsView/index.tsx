import type { TestWithLastRun } from "@/utils/get-tests";
import TestsError from "./TestsError";
import TestsData from "./TestsData";
import TestsLayout from "./TestsLayout";

type TestsResult =
	| { data: TestWithLastRun[]; error: null }
	| { data: null; error: Error };

type Props = {
	view: "public" | "private";
	testsResult: TestsResult;
	linkId: string;
	bottom?: React.ReactNode;
};

export default function TestsView({
	testsResult,
	linkId,
	bottom,
	view,
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
			<TestsData tests={tests} linkId={linkId} bottom={bottom} view={view} />
		</TestsLayout>
	);
}
