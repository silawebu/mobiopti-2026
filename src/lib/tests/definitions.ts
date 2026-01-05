import "server-only";

import type { UrlTestStatus } from "@/generated/prisma/enums";

import * as cheerio from "cheerio";

export type TestResult = {
	status: UrlTestStatus;
	message: string | null;
	content: string | null;
};

export type TestDefinition = {
	id: string;
	evaluate: ($: cheerio.CheerioAPI) => TestResult | Promise<TestResult>;
};

export const testDefinitions: TestDefinition[] = [
	{
		id: "title-tag",
		evaluate: ($) => {
			const title = $("title").text().trim();
			const status = !title
				? "critical"
				: title.length < 10 || title.length > 60
				? "warning"
				: "ok";

			return {
				status,
				message: !title
					? "No <title> tag was found on the page."
					: `Title tag length is ${title.length} characters.`,
				content: title ?? null,
			};
		},
	},
	{
		id: "ga-integration",
		evaluate: ($) => {
			const scripts = $("script")
				.map((_, el) => $(el).html())
				.get()
				.filter(Boolean);

			let foundId: string | undefined;
			let toolType:
				| "GA4"
				| "Universal Analytics"
				| "GTM"
				| "analytics.js"
				| "_gaq"
				| undefined;

			for (const script of scripts) {
				if (script.includes("gtag(")) {
					const match = script.match(/['"]?(G|UA)-[A-Z0-9\-]+['"]?/i);
					if (match) {
						foundId = match[0].replace(/['"]/g, "");
						toolType = foundId.startsWith("G-") ? "GA4" : "Universal Analytics";
						break;
					}
				}
				if (script.includes("googletagmanager.com/gtm.js")) {
					const match = script.match(/['"]?GTM-[A-Z0-9]+['"]?/i);
					if (match) {
						foundId = match[0].replace(/['"]/g, "");
						toolType = "GTM";
						break;
					}
				}
				if (script.includes("ga('create'") || script.includes("analytics.js")) {
					const match = script.match(/['"]?UA-[A-Z0-9\-]+['"]?/i);
					if (match) {
						foundId = match[0].replace(/['"]/g, "");
						toolType = "analytics.js";
						break;
					}
				}
				if (
					script.includes("_gaq.push") ||
					script.includes("google-analytics.com/ga.js")
				) {
					const match = script.match(/['"]?UA-[A-Z0-9\-]+['"]?/i);
					if (match) {
						foundId = match[0].replace(/['"]/g, "");
						toolType = "_gaq";
						break;
					}
				}
			}

			let status: "ok" | "warning" = "warning";
			if (toolType === "GA4" || toolType === "GTM") {
				status = "ok";
			}

			const toolLabels: Record<string, string> = {
				GA4: "Google Analytics 4 (gtag.js)",
				"Universal Analytics": "Google Universal Analytics (gtag.js, UA-...)",
				GTM: "Google Tag Manager",
				"analytics.js": "Legacy Google Analytics (analytics.js)",
				_gaq: "Legacy Google Analytics (_gaq, ga.js)",
			};

			let detail = "";
			if (foundId && toolType) {
				detail = `${toolLabels[toolType]} was detected (${foundId}).`;
				if (toolType === "analytics.js" || toolType === "_gaq") {
					detail += " This method is outdated.";
				}
			} else {
				detail =
					"No Google Analytics or Tag Manager integration was detected on the page.";
			}

			return {
				status,
				message: detail,
				content: foundId ?? null,
			};
		},
	},
	{
		id: "facebook-link",
		evaluate: ($) => {
			const fbLink = $('a[href*="facebook.com"]').first().attr("href");

			const status = fbLink ? "ok" : "warning";

			return {
				status,
				message: fbLink
					? "A link to a Facebook profile was found."
					: "No link to a Facebook profile was found on the page.",
				content: fbLink ?? null,
			};
		},
	},
	{
		id: "meta-description",
		evaluate: ($) => {
			const desc = $('meta[name="description"]').attr("content")?.trim() || "";
			let status: UrlTestStatus;
			if (!desc) {
				status = "critical";
			} else if (desc.length < 50 || desc.length > 160) {
				status = "warning";
			} else {
				status = "ok";
			}
			return {
				status,
				message: !desc
					? "No meta description was found."
					: `Meta description length is ${desc.length} characters.`,
				content: desc || null,
			};
		},
	},
	{
		id: "h1-presence",
		evaluate: ($) => {
			const h1s = $("h1");
			const count = h1s.length;
			const status: UrlTestStatus = count === 1 ? "ok" : "critical";
			return {
				status,
				message:
					count === 1
						? "Exactly one <h1> tag was found."
						: `Expected 1 <h1> tag, but found ${count}.`,
				content: count.toString(),
			};
		},
	},
	{
		id: "h1-length",
		evaluate: ($) => {
			const h1 = $("h1").first().text().trim();
			const length = h1.length;

			let status: UrlTestStatus;

			if (!h1) status = "critical";
			else if (length < 10 || length > 70) status = "warning";
			else status = "ok";

			return {
				status,
				message: null,
				content: h1 ? `Lenght: ${length}\n\n${h1}` : "Lenght: 0",
			};
		},
	},
	{
		id: "h2-presence",
		evaluate: ($) => {
			const h2Elements = $("h2");
			const count = h2Elements.length;

			const h2Texts = h2Elements
				.map((_, el) => $(el).text().trim())
				.get()
				.filter(Boolean);

			const hasH2 = count > 0;

			return {
				status: hasH2 ? "ok" : "warning",
				message: hasH2
					? `${count} <h2> tag(s) found.`
					: "No <h2> tags were found on the page.",
				content: hasH2
					? `H2: ${count}\n\n${h2Texts.join("\n")}`
					: "No H2 headings were found on this page.",
			};
		},
	},
	{
		id: "img-alt",
		evaluate: ($) => {
			const imgs = $("img");
			const missing = imgs
				.toArray()
				.filter(
					(el) => !$(el).attr("alt") || !$(el).attr("alt")?.trim()
				).length;
			const status: UrlTestStatus = missing > 0 ? "critical" : "ok";
			return {
				status,
				message:
					missing > 0
						? `${missing} image(s) missing non-empty alt attribute.`
						: "All images have non-empty alt attributes.",
				content: missing.toString(),
			};
		},
	},
	{
		id: "canonical-link",
		evaluate: ($) => {
			const href = $('link[rel="canonical"]').attr("href") || "";
			let status: UrlTestStatus;
			if (!href) {
				status = "warning";
			} else if (!/^https?:\/\//i.test(href)) {
				status = "warning";
			} else {
				status = "ok";
			}
			return {
				status,
				message: !href
					? "No canonical link tag was found."
					: status === "ok"
					? `Canonical URL is ${href}.`
					: `Canonical href is present but invalid: ${href}`,
				content: href || null,
			};
		},
	},
	{
		id: "viewport-meta",
		evaluate: ($) => {
			const content = $('meta[name="viewport"]').attr("content") || "";
			const status: UrlTestStatus = content.includes("width=device-width")
				? "ok"
				: "warning";
			return {
				status,
				message: !content
					? "No viewport meta tag was found."
					: "Viewport meta tag is present.",
				content: content || null,
			};
		},
	},
	{
		id: "robots-meta",
		evaluate: ($) => {
			const content = $('meta[name="robots"]').attr("content") || "";
			let status: UrlTestStatus;
			if (content.toLowerCase().includes("noindex")) {
				status = "critical";
			} else if (!content) {
				status = "warning";
			} else {
				status = "ok";
			}
			return {
				status,
				message: !content
					? "No robots meta tag was found."
					: status === "critical"
					? "Robots meta tag contains noindex."
					: "Robots meta tag is present and allows indexing.",
				content: content || null,
			};
		},
	},
	{
		id: "sitemap-link",
		evaluate: ($) => {
			const link = $('[href*="sitemap.xml"]').first().attr("href");
			const status: UrlTestStatus = link ? "ok" : "warning";
			return {
				status,
				message: link
					? "A link to sitemap.xml was found on the page."
					: "No link to sitemap.xml was found on the page.",
				content: link || null,
			};
		},
	},
	{
		id: "charset-meta",
		evaluate: ($) => {
			const charset = $("meta[charset]").attr("charset") || "";
			return {
				status: charset ? "ok" : "critical",
				message: charset
					? `Charset meta tag found: ${charset}.`
					: "No <meta charset> tag was found.",
				content: charset || null,
			};
		},
	},
	{
		id: "favicon",
		evaluate: ($) => {
			const icon =
				$('link[rel="icon"]').attr("href") ||
				$('link[rel="shortcut icon"]').attr("href") ||
				"";
			return {
				status: icon ? "ok" : "critical",
				message: icon
					? `Favicon link found: ${icon}.`
					: 'No favicon link (<link rel="icon">) was found.',
				content: icon || null,
			};
		},
	},
];
