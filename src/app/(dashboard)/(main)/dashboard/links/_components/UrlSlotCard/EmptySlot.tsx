import { Plus } from "lucide-react";
import NewLinkDialog from "../NewLinkDialog";

type Props = {
	slotNumber: number;
};

export default function EmptySlot({ slotNumber }: Props) {
	return (
		<NewLinkDialog>
			<button className="w-full cursor-pointer hover:bg-card/10 duration-150 h-28 border border-transparent hover:border-[rgba(0,0,0,0.2)] text-muted-foreground bg-card/25 rounded-xl flex items-center justify-center gap-3 shadow-[inset_0px_0px_12px_rgba(0,0,0,0.4)] hover:shadow-[inset_0px_0px_0px_rgba(0,0,0,0.4)]">
				<Plus className="w-3 h-3" />
				<span className="text-sm font-medium">Empty Slot {slotNumber}</span>
			</button>
		</NewLinkDialog>
	);
}
