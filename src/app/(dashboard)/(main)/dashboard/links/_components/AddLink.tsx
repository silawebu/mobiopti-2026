import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NewLinkDialog from "./NewLinkDialog";

export default function AddLink() {
	return (
		<NewLinkDialog>
			<Button>
				<Plus />
				Add link
			</Button>
		</NewLinkDialog>
	);
}
