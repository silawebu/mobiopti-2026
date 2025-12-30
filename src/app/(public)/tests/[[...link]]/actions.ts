"use server";

import * as z from "zod";
import { linkSchema } from "./_components/HomeLinkInput";

export async function executePublicTests(values: z.infer<typeof linkSchema>) {
	console.log(values);

	return {
		redirect: null,
		error: "Testovací error",
	};
}
