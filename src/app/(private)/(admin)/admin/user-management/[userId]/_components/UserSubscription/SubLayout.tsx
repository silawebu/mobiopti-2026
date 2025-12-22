import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type Props = {
	children: React.ReactNode;
	actions?: React.ReactNode;
	footer?: React.ReactNode;
};

export default function SubLayout({ children, actions, footer }: Props) {
	return (
		<Card className="border-2 border-double">
			<CardHeader>
				<CardTitle>User's Subscription</CardTitle>
				<CardDescription>See users current subscription status</CardDescription>
				{actions && <CardAction>{actions}</CardAction>}
			</CardHeader>
			<CardContent>{children}</CardContent>
			{footer && <CardFooter>{footer}</CardFooter>}
		</Card>
	);
}
