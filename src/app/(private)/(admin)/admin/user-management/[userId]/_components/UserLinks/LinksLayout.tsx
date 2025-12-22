import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type Props = {
	children: React.ReactNode;
};

export default function LinksLayout({ children }: Props) {
	return (
		<Card className="border-2 border-double">
			<CardHeader>
				<CardTitle>User's Links</CardTitle>
				<CardDescription>
					See all of the links that user is currently improving
				</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
}
