type Props = {
	className?: string;
	color?: "critical" | "warning" | "ok";
};

export default function BrandIcon({ className = "", color = "ok" }: Props) {
	return (
		<svg
			id="Vrstva_1"
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
			viewBox="0 0 450 450"
			className={className}
			fill={getColor(color)}
		>
			<defs></defs>
			<path
				className="st0"
				d="M408.3,0H41.7C18.7,0,0,18.7,0,41.7v366.7C0,431.3,18.7,450,41.7,450h366.7c23,0,41.7-18.7,41.7-41.7V41.7C450,18.7,431.3,0,408.3,0ZM337.5,316.7c0,11.5-9.3,20.8-20.8,20.8h-183.3c-11.5,0-20.8-9.3-20.8-20.8v-183.3c0-11.5,9.3-20.8,20.8-20.8h183.3c11.5,0,20.8,9.3,20.8,20.8v183.3Z"
			/>
		</svg>
	);
}

function getColor(color: Props["color"]): string {
	switch (color) {
		case "ok":
			return "#00ce5d";
		case "warning":
			return "#ffbf0e";
		case "critical":
			return "#ea1d6a";
		default:
			return "#00ce5d";
	}
}
