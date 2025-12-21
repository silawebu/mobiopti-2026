import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
	children: React.ReactNode;
};

export default function FormCard({ children }: Props) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl text-center">
					Welcome to MobiOpti
				</CardTitle>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
}
