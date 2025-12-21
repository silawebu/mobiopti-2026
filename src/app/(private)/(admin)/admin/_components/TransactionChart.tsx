"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";

export const description = "An interactive area chart";

const chartData = [
	{ date: "2024-04-01", dollars: 5 },
	{ date: "2024-04-02", dollars: 10 },
	{ date: "2024-04-03", dollars: 15 },
	{ date: "2024-04-04", dollars: 25 },
	{ date: "2024-04-05", dollars: 40 },
	{ date: "2024-04-06", dollars: 45 },
	{ date: "2024-04-07", dollars: 50 },
	{ date: "2024-04-08", dollars: 65 },
	{ date: "2024-04-09", dollars: 70 },
	{ date: "2024-04-10", dollars: 85 },
	{ date: "2024-04-11", dollars: 100 },
	{ date: "2024-04-12", dollars: 105 },
	{ date: "2024-04-13", dollars: 120 },
	{ date: "2024-04-14", dollars: 130 },
	{ date: "2024-04-15", dollars: 135 },
	{ date: "2024-04-16", dollars: 145 },
	{ date: "2024-04-17", dollars: 165 },
	{ date: "2024-04-18", dollars: 185 },
	{ date: "2024-04-19", dollars: 195 },
	{ date: "2024-04-20", dollars: 200 },
	{ date: "2024-04-21", dollars: 210 },
	{ date: "2024-04-22", dollars: 225 },
	{ date: "2024-04-23", dollars: 235 },
	{ date: "2024-04-24", dollars: 260 },
	{ date: "2024-04-25", dollars: 275 },
	{ date: "2024-04-26", dollars: 280 },
	{ date: "2024-04-27", dollars: 310 },
	{ date: "2024-04-28", dollars: 320 },
	{ date: "2024-04-29", dollars: 340 },
	{ date: "2024-04-30", dollars: 370 },
	{ date: "2024-05-01", dollars: 380 },
	{ date: "2024-05-02", dollars: 405 },
	{ date: "2024-05-03", dollars: 420 },
	{ date: "2024-05-04", dollars: 450 },
	{ date: "2024-05-05", dollars: 480 },
	{ date: "2024-05-06", dollars: 520 },
	{ date: "2024-05-07", dollars: 545 },
	{ date: "2024-05-08", dollars: 555 },
	{ date: "2024-05-09", dollars: 570 },
	{ date: "2024-05-10", dollars: 600 },
	{ date: "2024-05-11", dollars: 625 },
	{ date: "2024-05-12", dollars: 640 },
	{ date: "2024-05-13", dollars: 650 },
	{ date: "2024-05-14", dollars: 690 },
	{ date: "2024-05-15", dollars: 725 },
	{ date: "2024-05-16", dollars: 760 },
	{ date: "2024-05-17", dollars: 800 },
	{ date: "2024-05-18", dollars: 830 },
	{ date: "2024-05-19", dollars: 845 },
	{ date: "2024-05-20", dollars: 860 },
	{ date: "2024-05-21", dollars: 870 },
	{ date: "2024-05-22", dollars: 880 },
	{ date: "2024-05-23", dollars: 910 },
	{ date: "2024-05-24", dollars: 935 },
	{ date: "2024-05-25", dollars: 955 },
	{ date: "2024-05-26", dollars: 970 },
	{ date: "2024-05-27", dollars: 1010 },
	{ date: "2024-05-28", dollars: 1030 },
	{ date: "2024-05-29", dollars: 1040 },
	{ date: "2024-05-30", dollars: 1070 },
	{ date: "2024-05-31", dollars: 1090 },
	{ date: "2024-06-01", dollars: 1105 },
	{ date: "2024-06-02", dollars: 1150 },
	{ date: "2024-06-03", dollars: 1165 },
	{ date: "2024-06-04", dollars: 1205 },
	{ date: "2024-06-05", dollars: 1215 },
	{ date: "2024-06-06", dollars: 1245 },
	{ date: "2024-06-07", dollars: 1280 },
	{ date: "2024-06-08", dollars: 1315 },
	{ date: "2024-06-09", dollars: 1360 },
	{ date: "2024-06-10", dollars: 1375 },
	{ date: "2024-06-11", dollars: 1385 },
	{ date: "2024-06-12", dollars: 1430 },
	{ date: "2024-06-13", dollars: 1440 },
	{ date: "2024-06-14", dollars: 1480 },
	{ date: "2024-06-15", dollars: 1510 },
	{ date: "2024-06-16", dollars: 1545 },
	{ date: "2024-06-17", dollars: 1595 },
	{ date: "2024-06-18", dollars: 1610 },
	{ date: "2024-06-19", dollars: 1645 },
	{ date: "2024-06-20", dollars: 1690 },
	{ date: "2024-06-21", dollars: 1710 },
	{ date: "2024-06-22", dollars: 1740 },
	{ date: "2024-06-23", dollars: 1790 },
	{ date: "2024-06-24", dollars: 1805 },
	{ date: "2024-06-25", dollars: 1820 },
	{ date: "2024-06-26", dollars: 1860 },
	{ date: "2024-06-27", dollars: 1905 },
	{ date: "2024-06-28", dollars: 1920 },
	{ date: "2024-06-29", dollars: 1935 },
	{ date: "2024-06-30", dollars: 1980 },
];

const chartConfig = {
	dollars: {
		label: "$USD",
		color: "var(--primary)",
	},
} satisfies ChartConfig;

type Props = {
	className?: string;
};

export default function TransactionChart({ className = "" }: Props) {
	const [timeRange, setTimeRange] = React.useState("90d");

	const filteredData = chartData.filter((item) => {
		const date = new Date(item.date);
		const referenceDate = new Date("2024-06-30");
		let daysToSubtract = 90;
		if (timeRange === "30d") {
			daysToSubtract = 30;
		} else if (timeRange === "7d") {
			daysToSubtract = 7;
		}
		const startDate = new Date(referenceDate);
		startDate.setDate(startDate.getDate() - daysToSubtract);
		return date >= startDate;
	});

	return (
		<Card className={clsx("pt-0", className)}>
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<div className="grid flex-1 gap-1">
					<CardTitle>Transactions</CardTitle>
					<CardDescription>
						Showing total transactions for the last 3 months
					</CardDescription>
				</div>
				<Select value={timeRange} onValueChange={setTimeRange}>
					<SelectTrigger
						className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
						aria-label="Select a value"
					>
						<SelectValue placeholder="Last 3 months" />
					</SelectTrigger>
					<SelectContent className="rounded-xl">
						<SelectItem value="90d" className="rounded-lg">
							Last 3 months
						</SelectItem>
						<SelectItem value="30d" className="rounded-lg">
							Last 30 days
						</SelectItem>
						<SelectItem value="7d" className="rounded-lg">
							Last 7 days
						</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full"
				>
					<AreaChart data={filteredData}>
						<defs>
							<linearGradient id="fillDollars" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--primary)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--primary)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								});
							}}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={(value) => {
										return new Date(value).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
										});
									}}
									indicator="dot"
								/>
							}
						/>
						<Area
							dataKey="dollars"
							type="natural"
							fill="url(#fillDollars)"
							stroke="var(--primary)"
							stackId="a"
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
