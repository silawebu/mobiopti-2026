import type { Matrix } from "@/utils/get-result-matrix";

import MatrixLayout from "./MatrixLayout";
import MatrixData from "./MatrixData";
import MatrixError from "./MatrixError";

type MatrixResult =
	| { data: Matrix; error: null }
	| { data: null; error: Error };

type Props = {
	matrixResult: MatrixResult;
	linkId: string;
};

export default function ResultMatrix({ matrixResult, linkId }: Props) {
	const { data: matrix, error } = matrixResult;

	if (matrix) {
		return (
			<MatrixLayout>
				<MatrixData matrix={matrix} />
			</MatrixLayout>
		);
	}

	if (error) {
		console.error(`[ResultMatrix] Failed for linkId ${linkId}:`, error);
	}

	return (
		<MatrixLayout>
			<MatrixError />
		</MatrixLayout>
	);
}
