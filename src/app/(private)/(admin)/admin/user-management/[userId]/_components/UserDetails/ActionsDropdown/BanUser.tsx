"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { banUser } from "../../../actions";
import { toast } from "sonner";

export const banFormSchema = z.object({
	reason: z.string().max(250, "Reason must be at most 250 characters"),
	expUnit: z.enum(["minutes", "hours", "days", "months"], {
		error: "Chose an unit",
	}),
	expValue: z
		.number({ error: "Enter a valid number" })
		.min(1, "Value must be at least 1")
		.max(999, "Maximal value can be 999"),
});

export type BanSchema = z.infer<typeof banFormSchema>;

type Props = {
	userId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export default function BanUser({ userId, open, onOpenChange }: Props) {
	const [loading, setLoading] = useState<boolean>(false);

	const form = useForm<BanSchema>({
		resolver: zodResolver(banFormSchema),
		defaultValues: {
			reason: "",
			expUnit: "days",
			expValue: undefined,
		},
	});

	async function onSubmit(values: BanSchema) {
		setLoading(true);

		const { error } = await banUser(values, userId);

		if (error) {
			toast.error(error);
		} else {
			toast.success("User was banned");
			onOpenChange(false);
		}

		setLoading(false);
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Ban user</DialogTitle>
					<DialogDescription>
						Bans a user, preventing them from signing in and revokes all of
						their existing sessions.
					</DialogDescription>
				</DialogHeader>
				<div>
					<form id="form-ban-user" onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup className="gap-4">
							<Controller
								disabled={loading}
								name="reason"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field className="gap-3" data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="form-ban-user-reason">
											Reason
										</FieldLabel>
										<Textarea
											{...field}
											id="form-ban-user-reason"
											aria-invalid={fieldState.invalid}
											placeholder="Reason for the ban"
											autoComplete="off"
											className="min-h-[100px] resize-none"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<div>
								<Label className="pb-3">Duration</Label>
								<div className="grid grid-cols-3 gap-x-2">
									<Controller
										disabled={loading}
										name="expValue"
										control={form.control}
										render={({ field, fieldState }) => (
											<Field
												className="col-span-2"
												data-invalid={fieldState.invalid}
											>
												<Input
													id="form-ban-user-expValue"
													aria-invalid={fieldState.invalid}
													placeholder="10"
													autoComplete="off"
													type="number"
													disabled={field.disabled}
													value={field.value ?? ""}
													onChange={(e) => {
														const value = e.target.value;

														if (value === "") {
															field.onChange(undefined);
															return;
														}

														const num = Number(value);
														field.onChange(Number.isNaN(num) ? undefined : num);
													}}
												/>
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>
									<Controller
										name="expUnit"
										disabled={loading}
										control={form.control}
										render={({ field, fieldState }) => (
											<Field data-invalid={fieldState.invalid}>
												<Select
													name={field.name}
													value={field.value}
													onValueChange={field.onChange}
													disabled={field.disabled}
												>
													<SelectTrigger
														id="form-ban-user-expUnit"
														aria-invalid={fieldState.invalid}
														className="w-full"
													>
														<SelectValue placeholder="Unit" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="minutes">minutes</SelectItem>
														<SelectItem value="hours">hours</SelectItem>
														<SelectItem value="days">days</SelectItem>
														<SelectItem value="months">months</SelectItem>
													</SelectContent>
												</Select>
												{fieldState.invalid && (
													<FieldError errors={[fieldState.error]} />
												)}
											</Field>
										)}
									/>
								</div>
							</div>
						</FieldGroup>
					</form>
					<div className="w-full mt-6 flex justify-end">
						<Button
							disabled={loading}
							type="submit"
							form="form-ban-user"
							size={"lg"}
							variant={"destructive"}
						>
							{loading ? <Spinner /> : <Ban />} Ban user
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
