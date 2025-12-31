export type ContentSegment =
	| { type: "text"; value: string }
	| { type: "link"; value: string; href: string };

const LINK_PATTERN = /\[link:([^\]]+)\]\(([^)]+)\)/g;

function isAbsoluteUrl(url: string): boolean {
	return /^https?:\/\//i.test(url);
}

export function parseContentLinks(content: string): ContentSegment[] {
	if (!content) {
		return [];
	}

	const segments: ContentSegment[] = [];
	let lastIndex = 0;

	LINK_PATTERN.lastIndex = 0;

	let match: RegExpExecArray | null;
	while ((match = LINK_PATTERN.exec(content)) !== null) {
		const [fullMatch, displayText, url] = match;
		const matchIndex = match.index;

		if (matchIndex > lastIndex) {
			segments.push({
				type: "text",
				value: content.slice(lastIndex, matchIndex),
			});
		}

		if (displayText.trim() && isAbsoluteUrl(url)) {
			segments.push({
				type: "link",
				value: displayText,
				href: url,
			});
		} else {
			segments.push({
				type: "text",
				value: fullMatch,
			});
		}

		lastIndex = matchIndex + fullMatch.length;
	}

	if (lastIndex < content.length) {
		segments.push({
			type: "text",
			value: content.slice(lastIndex),
		});
	}

	if (segments.length === 0 && content) {
		return [{ type: "text", value: content }];
	}

	return segments;
}
