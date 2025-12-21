import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type Props = {
	children: React.ReactNode;
	action?: React.ReactNode;
};

export default function ComponentLayout({ children, action }: Props) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Subscription</CardTitle>
				<CardDescription>Manage your subscription here</CardDescription>
				{action && <CardAction>{action}</CardAction>}
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
}
