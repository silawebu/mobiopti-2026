"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LogOutButton() {
	const [loading, setLoading] = useState<boolean>(false);

	const router = useRouter();

	const handleLogOut = async (e: React.MouseEvent) => {
		e.preventDefault();

		setLoading(true);

		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/");
				},
				onError: () => {
					toast.error("Something went wrong while logging out");
				},
			},
		});
	};

	return (
		<Button
			className="w-full sm:max-w-[250px]"
			variant={"outline"}
			onClick={handleLogOut}
			disabled={loading}
			size={"lg"}
		>
			{loading ? <Spinner /> : <LogOut />}{" "}
			<span className="hidden sm:block">Log Out</span>
		</Button>
	);
}
