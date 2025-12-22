import Footer from "../_components/Footer";
import Navbar from "../_components/Navbar";

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
}
