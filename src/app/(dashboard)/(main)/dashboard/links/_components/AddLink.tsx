"use client";

import { isValidPageUrl } from "@/utils/link/validator";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { addLink } from "../actions";
import { toast } from "sonner";

export const linkFormSchema = z.object({
	url: z
		.string()
		.min(4, "URL is not valid")
		.max(2048, "Maximum URL lenghts can be 2048 chracters")
		.refine(isValidPageUrl, {
			message: "Link is not valid",
		}),
});

export default function AddLink() {
	const [open, setOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const form = useForm<z.infer<typeof linkFormSchema>>({
		resolver: zodResolver(linkFormSchema),
		defaultValues: {
			url: "",
		},
	});

	async function onSubmit(data: z.infer<typeof linkFormSchema>) {
		setIsLoading(true);

		const { error } = await addLink(data);

		if (error) {
			toast.error("Something went wrong", { description: error });
			if (error.includes("succefully added")) {
				setOpen(false);
			}
		} else {
			setOpen(false);
			form.reset();
		}

		setIsLoading(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus />
					Add link
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add a new Project</DialogTitle>
					<DialogDescription>
						Just write or copy-paste a link to you desired page and add it as a
						project to checks its state
					</DialogDescription>
				</DialogHeader>

				<form id="form-addlink" onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller
							name="url"
							disabled={isLoading}
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="form-addlink-url">Link</FieldLabel>
									<Input
										{...field}
										id="form-addlink-url"
										aria-invalid={fieldState.invalid}
										placeholder="www.example.com/page"
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</FieldGroup>
				</form>
				<Button disabled={isLoading} type="submit" form="form-addlink">
					{isLoading && <Spinner />}
					Submit
				</Button>
			</DialogContent>
		</Dialog>
	);
}
