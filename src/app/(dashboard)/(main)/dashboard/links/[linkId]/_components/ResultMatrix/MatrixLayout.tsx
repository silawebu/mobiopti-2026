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

export default function MatrixLayout({ children }: Props) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Result Matrix</CardTitle>
				<CardDescription>
					Here you can see your overall score in different categories
				</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
}
