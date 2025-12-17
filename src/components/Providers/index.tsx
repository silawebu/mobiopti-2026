import { Toaster } from "../ui/sonner";
import { ThemeProvider } from "./theme-provider";

type Props = {
	children: React.ReactNode;
};

export default function Providers({ children }: Props) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="dark"
			enableSystem
			disableTransitionOnChange
		>
			{children}
			<Toaster position="top-right" />
		</ThemeProvider>
	);
}
