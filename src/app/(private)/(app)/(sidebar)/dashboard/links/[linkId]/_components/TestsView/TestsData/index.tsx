import type { TestWithLastRun } from "@/utils/get-tests";
import TestCard from "./TestCard";
import RunTestsButton from "../../RunTestsButton";

type Props = {
	tests: TestWithLastRun[];
	bottom?: React.ReactNode;
	linkId: string;
	view: "public" | "private";
};

export default function TestsData({ tests, bottom, linkId, view }: Props) {
	return (
		<div className="w-full flex justify-center">
			{tests.length > 0 ? (
				<div className="max-w-2xl w-full flex flex-col gap-4">
					{tests.map((test: TestWithLastRun, index: number) => (
						<TestCard key={index} {...test} />
					))}
					{bottom}
				</div>
			) : (
				<div className="flex flex-col gap-3 items-center justify-center text-center">
					<span className="text-muted-foreground">
						No tests have been done for this link yet...
					</span>
					{view === "private" && <RunTestsButton linkId={linkId} />}
				</div>
			)}
		</div>
	);
}
