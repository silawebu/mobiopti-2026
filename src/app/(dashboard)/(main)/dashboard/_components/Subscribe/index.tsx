import { ShoppingCart } from "lucide-react";
import SubscribeButton from "./SubscribeButton";

export default function Subscribe() {
	return (
		<div
			className={`flex flex-col font-bold text-xs text-center py-10 px-5 border-2 border-dashed rounded-md sm:text-sm md:text-base`}
		>
			<ShoppingCart size={35} className="w-auto text-muted-foreground" />
			<span className="pt-2 pb-5">
				If you want full access to MobiOpti <b>SUBSCRIBE NOW!</b>
			</span>
			<SubscribeButton />
		</div>
	);
}
