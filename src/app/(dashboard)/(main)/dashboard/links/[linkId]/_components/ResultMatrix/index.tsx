import type { Severity } from "@/utils/types";
import type { UrlTestStatus } from "@/generated/prisma/enums";

import MatrixLayout from "./MatrixLayout";
import MatrixData from "./MatrixData";
import MatrixError from "./MatrixError";

export type Matrix = {
	name: string;
	severities: Record<Severity, Record<UrlTestStatus, number>>;
}[];

type MatrixResult =
	| { data: Matrix; error: null }
	| { data: null; error: Error };

type Props = {
	matrixResult: MatrixResult;
};

export default function ResultMatrix({ matrixResult }: Props) {
	const { data: matrix, error } = matrixResult;

	if (matrix) {
		return (
			<MatrixLayout>
				<MatrixData matrix={matrix} />
			</MatrixLayout>
		);
	}

	if(error) {
		console.error(error);
	}

	return (
		<MatrixLayout>
			<MatrixError />
		</MatrixLayout>
	);
}
