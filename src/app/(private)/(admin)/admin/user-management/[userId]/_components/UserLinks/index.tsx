import type { UrlWithScore } from "@/utils/link-score";

import UrlSlotCard from "@/app/(private)/(app)/(sidebar)/dashboard/links/_components/UrlSlotCard";
import LinksLayout from "./LinksLayout";
import LinksError from "./LinksError";
import LinkCard from "./LinkCard";

type LinksResult =
	| { data: UrlWithScore[]; error: null }
	| { data: null; error: Error };

type Props = {
	linksResult: LinksResult;
};

export default function UserLinks({ linksResult }: Props) {
	const { data: links, error } = linksResult;

	if (error) {
		return (
			<LinksLayout>
				<LinksError />
			</LinksLayout>
		);
	}

	return (
		<LinksLayout>
			<div>
				{links !== null && links?.length > 0 ? (
					<div className="flex flex-col gap-4">
						{links.map((link: UrlWithScore) => (
							<LinkCard key={link.id} {...link} />
						))}
					</div>
				) : (
					<span className="text-muted-foreground text-xs sm:text-sm">
						User doesnt have any added links
					</span>
				)}
			</div>
		</LinksLayout>
	);
}
