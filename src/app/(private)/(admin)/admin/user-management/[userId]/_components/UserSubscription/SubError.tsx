import { TriangleAlert } from "lucide-react";

export default function SubError() {
	return (
		<div className="w-full flex items-center justify-center h-32 border-2 border-dashed rounded-md border-destructive/30 bg-linear-to-br from-destructive-from/30 to-destructive-to/30">
			<div className="text-destructive font-medium gap-3 flex justify-center items-center">
				<TriangleAlert />
				<p>Failed to load user's subscription...</p>
			</div>
		</div>
	);
}
