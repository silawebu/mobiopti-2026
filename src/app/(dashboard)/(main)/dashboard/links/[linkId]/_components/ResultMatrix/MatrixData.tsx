import type { Matrix } from ".";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import SeverityIcon from "@/components/Icons/Severity";

type Props = {
	matrix: Matrix;
};

export default function MatrixData({ matrix }: Props) {
	const severities: (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5];
	const statuses = ["critical", "warning", "ok"] as const;

	const statusAbbr: Record<(typeof statuses)[number], string> = {
		critical: "CR",
		warning: "WA",
		ok: "OK",
	};

	const cellClass = (status: (typeof statuses)[number], value: number) => {
		if (value === 0) return "text-muted-foreground";
		switch (status) {
			case "critical":
				return "text-red-600";
			case "warning":
				return "text-yellow-600";
			case "ok":
				return "text-green-600";
		}
	};

	const cellBgClass = (status: (typeof statuses)[number], value: number) => {
		if (value === 0) return "";
		switch (status) {
			case "critical":
				return "bg-red-500/10";
			case "warning":
				return "bg-yellow-500/10";
			case "ok":
				return "bg-green-500/10";
		}
	};

	return (
		<div className="overflow-x-auto relative">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead rowSpan={2} className="whitespace-nowrap">
							Category
						</TableHead>
						{severities.map((s) => (
							<TableHead
								key={`sev-${s}`}
								colSpan={3}
								className="text-center whitespace-nowrap"
							>
								<div className="flex flex-col items-center justify-center my-4">
									<SeverityIcon
										severity={s}
										className="w-[70px] h-auto mb-2 hidden sm:block"
									/>
									<span className="font-semibold">Severity {s}</span>
								</div>
							</TableHead>
						))}
					</TableRow>

					<TableRow>
						{severities.flatMap((s) =>
							statuses.map((st) => (
								<TableHead key={`head-${s}-${st}`} className="w-12 text-center">
									{statusAbbr[st]}
								</TableHead>
							))
						)}
					</TableRow>
				</TableHeader>
				<TableBody>
					{matrix.map((cat) => (
						<TableRow key={cat.name}>
							<TableCell className="font-medium whitespace-nowrap">
								{cat.name}
							</TableCell>
							{severities.flatMap((sev) =>
								statuses.map((st) => {
									const value =
										cat.severities[sev as 1 | 2 | 3 | 4 | 5][
											st as keyof (typeof cat.severities)[1]
										];
									return (
										<TableCell
											key={`${cat.name}-${sev}-${st}`}
											className={`text-center ${cellClass(
												st,
												value
											)} ${cellBgClass(st, value)}`}
										>
											{value}
										</TableCell>
									);
								})
							)}
						</TableRow>
					))}
					<TableRow>
						<TableCell className="font-semibold">Overall results</TableCell>
						{severities.flatMap((sev) =>
							statuses.map((st) => {
								const total = matrix.reduce(
									(sum, cat) =>
										sum +
										cat.severities[sev as 1 | 2 | 3 | 4 | 5][
											st as keyof (typeof cat.severities)[1]
										],
									0
								);
								return (
									<TableCell
										key={`sum-${sev}-${st}`}
										className={`text-center font-semibold ${cellClass(
											st,
											total
										)} ${cellBgClass(st, total)}`}
									>
										{total}
									</TableCell>
								);
							})
						)}
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
}
