"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import LoadingAnimation from "./LoadingAnimation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { executePublicTests } from "../../actions";

export const LOADING_DURATION: number = 3000;

export const linkSchema = z.object({
	link: z
		.string()
		.min(4, "Link is not valid")
		.refine(
			(value) => {
				const urlToTest = value.match(/^https?:\/\//)
					? value
					: `https://${value}`;
				try {
					new URL(urlToTest);
					return true;
				} catch {
					return false;
				}
			},
			{ message: "Enter a valid link" }
		),
});

export default function HomeLinkInput() {
	const [loading, setLoading] = useState<boolean>(false);

	const router = useRouter();

	const form = useForm<z.infer<typeof linkSchema>>({
		resolver: zodResolver(linkSchema),
		defaultValues: {
			link: "",
		},
	});

	async function onSubmit(data: z.infer<typeof linkSchema>) {
		setLoading(true);

		const startTime = Date.now();

		const result = await executePublicTests(data);
		const { redirect: redirectUrl, error } = result;

		if (error) {
			toast.error(error);
			setLoading(false);
			return;
		}

		const elapsed = Date.now() - startTime;

		const remaining = LOADING_DURATION - elapsed;

		if (remaining > 0) {
			await new Promise((resolve) => setTimeout(resolve, remaining));
		}

		if (redirectUrl) {
			router.push(redirectUrl);
		} else {
			toast.error("Something went wrong. Try again later!");
			setLoading(false);
		}
	}

	return (
		<>
			<LoadingAnimation loading={loading} />
			<section className="w-full flex justify-center">
				<div className="mt-10 w-full max-w-xs px-2 gap-2 flex flex-col items-start">
					<p className="text-sm font-bold text-muted-foreground">Try it:</p>
					<form
						className="w-full"
						id="mobiopti-test"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FieldGroup className="flex flex-row items-start justify-between gap-2 w-full">
							<Controller
								name="link"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field
										className="w-[calc(100%-44px)] text-left gap-1.5"
										data-invalid={fieldState.invalid}
									>
										<Input
											{...field}
											id="mobiopti-test-link"
											aria-invalid={fieldState.invalid}
											placeholder="zsf.cz"
											autoComplete="off"
										/>
										{fieldState.invalid && (
											<FieldError
												className="text-xs"
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>
							<Button type="submit" size={"icon"}>
								<SendHorizonal />
							</Button>
						</FieldGroup>
					</form>
				</div>
			</section>
		</>
	);
}
