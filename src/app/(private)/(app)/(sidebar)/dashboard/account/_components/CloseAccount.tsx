import HelpDialog from "@/components/HelpDialog";
import { Button } from "@/components/ui/button";

export default function CloseAccount() {
	return (
		<div className="w-full flex justify-end">
			<HelpDialog
				label="Do you want to close account?"
				text={
					<p>
						If you wish to <b>close your account</b> and delete all of your
						personal data, please contact us through e-mail{" "}
						<a
							className="underline"
							href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}
						>
							<b>{process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</b>
						</a>
						.
					</p>
				}
			>
				<Button size={"sm"} variant={"destructive"}>
					Close account
				</Button>
			</HelpDialog>
		</div>
	);
}
