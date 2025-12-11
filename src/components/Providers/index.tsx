import { Toaster } from "../ui/sonner";

type Props = {
	children: React.ReactNode;
};

export default function Providers({ children }: Props) {
	return (
		<>
			{children}
			<Toaster position="top-center" />
		</>
	);
}
