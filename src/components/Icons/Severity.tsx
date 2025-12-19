import type { Severity } from "@/utils/types";

import clsx from "clsx";

type Props = {
	severity: Severity;
	className?: string;
};

export default function SeverityIcon({ severity, className = "" }: Props) {
	const pastelStops = [
		// Severity 1 – modrá
		{ start: "#cfe6ff", mid: "#a7d1ff", end: "#8cbfff" },
		// Severity 2 – tyrkysová
		{ start: "#c8f3f0", mid: "#9fe3de", end: "#76d3cc" },
		// Severity 3 – zelená
		{ start: "#d4f4d7", mid: "#a9e6af", end: "#7cd987" },
		// Severity 4 – fialová
		{ start: "#e2d6ff", mid: "#c7b2ff", end: "#a48aff" },
		// Severity 5 – růžová
		{ start: "#ffd6e0", mid: "#ffafc2", end: "#ff8aa8" },
	];

	const level = Math.min(Math.max(severity, 1), 5) - 1;
	const stops = pastelStops[level];
	const gradientId = `severityGradient-${severity}`;

	// Použijeme CSS proměnnou, která se mění podle .dark
	const inactiveColor = "var(--inactive-severity)";

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 425.37 212.44"
			className={clsx("transition-all", className)}
		>
			<defs>
				<linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
					<stop offset="0%" stopColor={stops.start} />
					<stop offset="50%" stopColor={stops.mid} />
					<stop offset="100%" stopColor={stops.end} />
				</linearGradient>
			</defs>

			{/* jednotlivé paprsky */}
			<path
				fill={severity >= 5 ? `url(#${gradientId})` : inactiveColor}
				d="M303.01,212.44h122.36c-.05-44.84-13.99-86.41-37.72-120.69l-99.05,71.96c9.08,14.04,14.37,30.77,14.42,48.72Z"
			/>
			<path
				fill={severity >= 4 ? `url(#${gradientId})` : inactiveColor}
				d="M282.71,155.63l99.05-71.97c-24.94-32.63-59.1-57.83-98.6-71.69l-37.84,116.47c14.72,5.71,27.58,15.16,37.39,27.19Z"
			/>
			<path
				fill={severity >= 3 ? `url(#${gradientId})` : inactiveColor}
				d="M212.68,122.36c7.99,0,15.74,1.04,23.12,2.99l37.84-116.47C254.33,3.11,233.87,0,212.68,0s-41.65,3.11-60.96,8.88l37.84,116.47c7.38-1.95,15.13-2.99,23.12-2.99Z"
			/>
			<path
				fill={severity >= 2 ? `url(#${gradientId})` : inactiveColor}
				d="M180.05,128.44L142.21,11.97c-39.5,13.87-73.67,39.06-98.6,71.69l99.05,71.97c9.82-12.03,22.67-21.49,37.39-27.19Z"
			/>
			<path
				fill={severity >= 1 ? `url(#${gradientId})` : inactiveColor}
				d="M136.77,163.72L37.72,91.75C13.99,126.03.05,167.6,0,212.44h122.36c.05-17.96,5.34-34.68,14.41-48.72Z"
			/>
		</svg>
	);
}
