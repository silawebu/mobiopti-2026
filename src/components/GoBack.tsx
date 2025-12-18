import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

type Props = {
	href: string;
	text: string;
};

export default function GoBack({ href, text }: Props) {
	return (
		<Button
			variant={"link"}
			asChild
			size={"lg"}
			className="cursor-pointer pl-0! group relative text-foreground"
		>
			<Link href={href}>
				<ArrowLeft className="group-hover:-translate-x-1 duration-150" />
				{text}
			</Link>
		</Button>
	);
}
