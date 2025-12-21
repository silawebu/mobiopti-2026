import * as React from "react";
import { LifeBuoy, type LucideIcon } from "lucide-react";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import HelpDialog from "@/components/HelpDialog";

export function NavSecondary({
	...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					<SidebarMenuItem className="cursor-pointer">
						<HelpDialog
							label="Need help?"
							text={
								<>
									<p>
										If you need help with anything, feel free to contact us
										through email on{" "}
										<b>{process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</b>.
									</p>
								</>
							}
						>
							<SidebarMenuButton asChild size="sm">
								<div>
									<LifeBuoy />
									<span>Support</span>
								</div>
							</SidebarMenuButton>
						</HelpDialog>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
