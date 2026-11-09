import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createFileRoute, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BgUoMv8C.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-DHPy__xA.css";
var TITLE = "Frenzee — Premium Ice Cream in Johar Town, Lahore";
var DESCRIPTION = "Frenzee is a premium ice cream shop at Civic Centre, Johar Town, Lahore. Signature scoops and 12 oz shakes, with 10% off already on the menu. Open daily 4 PM – 2 AM. Order on WhatsApp.";
var Route$1 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: TITLE },
			{
				name: "description",
				content: DESCRIPTION
			},
			{
				name: "theme-color",
				content: "#6B1D32"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,560;0,9..144,680;1,9..144,560&family=Outfit:wght@300;400;500;600&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
/**
* Frenzee menu — edit names and prices here.
* Sale prices already include 10% off. Do not apply another discount.
* Flavour notes are short and replaceable; swap them for official menu copy
* when the shop supplies it. Do not add products that are not listed.
*/
var shop = {
	name: "Frenzee",
	phoneDisplay: "+92 326 4911207",
	phoneTel: "+923264911207",
	whatsapp: "923264911207",
	instagram: "https://www.instagram.com/gofrenzee/",
	instagramHandle: "@gofrenzee",
	address: [
		"Shop #16–33, Civic Centre",
		"Block D2, Phase 1, Johar Town",
		"Lahore, Pakistan"
	],
	hours: "Daily, 4 PM – 2 AM",
	rating: "5.0",
	reviewCount: 317,
	mapsUrl: "https://www.google.com/maps/search/?api=1&query=Frenzee+Shop+16+Civic+Centre+Block+D2+Johar+Town+Lahore",
	directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Shop%2016%20Civic%20Centre%20Block%20D2%20Phase%201%20Johar%20Town%20Lahore",
	mapsEmbed: "https://maps.google.com/maps?q=Shop%2016%20Civic%20Centre%20Block%20D2%20Phase%201%20Johar%20Town%20Lahore&z=16&output=embed"
};
var discountNote = "10% off is already included in every price on this page. It is applied automatically — nothing further is taken off.";
var products = [
	{
		id: "cookie-in-cream",
		name: "Cookie in Cream",
		group: "premium",
		groupLabel: "Premium Ice Cream",
		price: 675,
		originalPrice: 750,
		description: "Cream ice cream folded with pieces of cookie.",
		image: "/images/cookie-cream.jpg",
		imageAlt: "Vanilla ice cream and a dark chocolate scoop in a cup",
		featured: true
	},
	{
		id: "golden-butterscotch",
		name: "Golden Butterscotch",
		group: "premium",
		groupLabel: "Premium Ice Cream",
		price: 675,
		originalPrice: 750,
		description: "Butterscotch ice cream with a warm golden finish.",
		image: "/images/butterscotch.jpg",
		imageAlt: "Golden scoops of ice cream on a ceramic stand"
	},
	{
		id: "kinder-bueno-meltz",
		name: "Kinder Bueno Meltz",
		group: "premium",
		groupLabel: "Premium Ice Cream",
		price: 675,
		originalPrice: 750,
		description: "A chocolate hazelnut flavour with a soft, melted finish.",
		image: "/images/kinder.jpg",
		imageAlt: "Chocolate ice cream scoops in a dark cup"
	},
	{
		id: "caramel-cookie-crunch",
		name: "Caramel Cookie Crunch",
		group: "premium",
		groupLabel: "Premium Ice Cream",
		price: 675,
		originalPrice: 750,
		description: "Caramel ice cream with a cookie crunch.",
		image: "/images/caramel.jpg",
		imageAlt: "Ice cream and caramel over a chocolate cookie brownie",
		featured: true
	},
	{
		id: "chocolate-cookie-blast",
		name: "Chocolate Cookie Blast",
		group: "premium",
		groupLabel: "Premium Ice Cream",
		price: 675,
		originalPrice: 750,
		description: "Chocolate ice cream with a bold cookie bite.",
		image: "/images/choc-cookie.jpg",
		imageAlt: "Chocolate ice cream in waffle cones with cookie pieces"
	},
	{
		id: "lotus-biscoff-supremacy",
		name: "Lotus Biscoff Supremacy",
		group: "signature",
		groupLabel: "Signature Ice Cream",
		price: 855,
		originalPrice: 950,
		description: "Caramelised biscuit ice cream with a warm, spiced crunch.",
		image: "/images/biscoff.jpg",
		imageAlt: "Soft serve with a ring of biscuit crumbs",
		featured: true
	},
	{
		id: "strawberry-cheezcake",
		name: "Strawberry Cheezcake",
		group: "signature",
		groupLabel: "Signature Ice Cream",
		price: 855,
		originalPrice: 950,
		description: "Strawberry and cheesecake in one creamy scoop.",
		image: "/images/strawberry.jpg",
		imageAlt: "Strawberry ice cream topped with cream and fresh strawberries",
		featured: true
	},
	{
		id: "snickery-peanut-butter",
		name: "Snickery Peanut Butter",
		group: "signature",
		groupLabel: "Signature Ice Cream",
		price: 855,
		originalPrice: 950,
		description: "Chocolate, caramel and peanut butter, layered through the scoop.",
		image: "/images/snickery.jpg",
		imageAlt: "Chocolate ice cream with nuts beside a gold spoon",
		featured: true
	},
	{
		id: "silky-belgian-chocolate",
		name: "Silky Belgian Chocolate",
		group: "signature",
		groupLabel: "Signature Ice Cream",
		price: 855,
		originalPrice: 950,
		description: "A deep chocolate scoop with a silky, even texture.",
		image: "/images/belgian.jpg",
		imageAlt: "Close-up of glossy, softly folded chocolate ice cream",
		featured: true
	},
	{
		id: "wild-blueberry-blast",
		name: "Wild Blueberry Blast",
		group: "signature",
		groupLabel: "Signature Ice Cream",
		price: 855,
		originalPrice: 950,
		description: "Blueberry ice cream with a bright, jammy finish.",
		image: "/images/blueberry.jpg",
		imageAlt: "A scoop of berry ice cream on a spoon",
		featured: true
	},
	{
		id: "shake-cookie-in-cream",
		name: "Cookie in Cream Ice Cream Shake",
		group: "premium-shake",
		groupLabel: "Premium Ice Cream Shake (12 oz)",
		price: 531,
		originalPrice: 590,
		size: "12 oz",
		description: "A 12 oz ice cream shake in the Cookie in Cream flavour.",
		image: "/images/cookie-cream.jpg",
		imageAlt: "Vanilla and chocolate ice cream in a cup"
	},
	{
		id: "shake-golden-butterscotch",
		name: "Golden Butterscotch Ice Cream Shake",
		group: "premium-shake",
		groupLabel: "Premium Ice Cream Shake (12 oz)",
		price: 531,
		originalPrice: 590,
		size: "12 oz",
		description: "A 12 oz ice cream shake in the Golden Butterscotch flavour.",
		image: "/images/butterscotch.jpg",
		imageAlt: "Golden scoops of ice cream"
	},
	{
		id: "shake-caramel-cookie-crunch",
		name: "Caramel Cookie Crunch Ice Cream Shake",
		group: "premium-shake",
		groupLabel: "Premium Ice Cream Shake (12 oz)",
		price: 531,
		originalPrice: 590,
		size: "12 oz",
		description: "A 12 oz ice cream shake in the Caramel Cookie Crunch flavour.",
		image: "/images/caramel.jpg",
		imageAlt: "Caramel and chocolate dessert with ice cream"
	},
	{
		id: "shake-kinder-bueno-meltz",
		name: "Kinder Bueno Meltz Ice Cream Shake",
		group: "premium-shake",
		groupLabel: "Premium Ice Cream Shake (12 oz)",
		price: 531,
		originalPrice: 590,
		size: "12 oz",
		description: "A 12 oz ice cream shake in the Kinder Bueno Meltz flavour.",
		image: "/images/chocolate-shake.jpg",
		imageAlt: "Chocolate shake in a glass jar with whipped cream"
	},
	{
		id: "shake-chocolate-cookie-blast",
		name: "Chocolate Cookie Blast Ice Cream Shake",
		group: "premium-shake",
		groupLabel: "Premium Ice Cream Shake (12 oz)",
		price: 531,
		originalPrice: 590,
		size: "12 oz",
		description: "A 12 oz ice cream shake in the Chocolate Cookie Blast flavour.",
		image: "/images/choc-cookie.jpg",
		imageAlt: "Chocolate ice cream cones"
	},
	{
		id: "shake-wild-blueberry-blast",
		name: "Wild Blueberry Blast Ice Cream Shake",
		group: "signature-shake",
		groupLabel: "Signature Ice Cream Shake (12 oz)",
		price: 585,
		originalPrice: 650,
		size: "12 oz",
		description: "A 12 oz ice cream shake in the Wild Blueberry Blast flavour.",
		image: "/images/sundae.jpg",
		imageAlt: "Berry ice cream sundae in a glass"
	},
	{
		id: "shake-strawberry-cheezcake",
		name: "Strawberry Cheezcake Ice Cream Shake",
		group: "signature-shake",
		groupLabel: "Signature Ice Cream Shake (12 oz)",
		price: 585,
		originalPrice: 650,
		size: "12 oz",
		description: "A 12 oz ice cream shake in the Strawberry Cheezcake flavour.",
		image: "/images/strawberry-shake.jpg",
		imageAlt: "Pink strawberry shake in a tall glass"
	},
	{
		id: "shake-snickery-peanut-butter",
		name: "Snickery Peanut Butter Ice Cream Shake",
		group: "signature-shake",
		groupLabel: "Signature Ice Cream Shake (12 oz)",
		price: 585,
		originalPrice: 650,
		size: "12 oz",
		description: "A 12 oz ice cream shake in the Snickery Peanut Butter flavour.",
		image: "/images/snickery.jpg",
		imageAlt: "Chocolate ice cream with nuts"
	},
	{
		id: "shake-silky-belgian-chocolate",
		name: "Silky Belgian Chocolate Ice Cream Shake",
		group: "signature-shake",
		groupLabel: "Signature Ice Cream Shake (12 oz)",
		price: 585,
		originalPrice: 650,
		size: "12 oz",
		description: "A 12 oz ice cream shake in the Silky Belgian Chocolate flavour.",
		image: "/images/belgian.jpg",
		imageAlt: "Glossy chocolate ice cream"
	},
	{
		id: "shake-lotus-biscoff-supremacy",
		name: "Lotus Biscoff Supremacy Ice Cream Shake",
		group: "signature-shake",
		groupLabel: "Signature Ice Cream Shake (12 oz)",
		price: 585,
		originalPrice: 650,
		size: "12 oz",
		description: "A 12 oz ice cream shake in the Lotus Biscoff Supremacy flavour.",
		image: "/images/biscoff.jpg",
		imageAlt: "Soft serve finished with biscuit crumbs"
	}
];
var featured = [
	"silky-belgian-chocolate",
	"lotus-biscoff-supremacy",
	"strawberry-cheezcake",
	"snickery-peanut-butter",
	"wild-blueberry-blast",
	"cookie-in-cream",
	"caramel-cookie-crunch"
].map((id) => products.find((item) => item.id === id)).filter((item) => Boolean(item));
var menuSections = [
	{
		id: "premium",
		title: "Premium Ice Cream",
		note: "The house range. Sale price Rs. 675, from Rs. 750."
	},
	{
		id: "signature",
		title: "Signature Ice Cream",
		note: "The flavours people cross Johar Town for. Sale price Rs. 855, from Rs. 950."
	},
	{
		id: "premium-shake",
		title: "Premium Ice Cream Shakes",
		note: "12 oz. Sale price Rs. 531, from Rs. 590."
	},
	{
		id: "signature-shake",
		title: "Signature Ice Cream Shakes",
		note: "12 oz. Sale price Rs. 585, from Rs. 650."
	}
];
var gallery = [
	{
		src: "/images/case.jpg",
		alt: "Rows of ice cream in a refrigerated display",
		caption: "Display",
		wide: true
	},
	{
		src: "/images/belgian.jpg",
		alt: "Close-up of folded chocolate ice cream",
		caption: "Texture"
	},
	{
		src: "/images/cone-hand.jpg",
		alt: "A hand holding a cone of strawberry and vanilla ice cream",
		caption: "In hand"
	},
	{
		src: "/images/berry-cones.jpg",
		alt: "Scoops of berry and citrus ice cream in waffle cones",
		caption: "Colour",
		wide: true
	},
	{
		src: "/images/strawberry-glass.jpg",
		alt: "Strawberries layered with cream in a glass",
		caption: "Strawberry"
	},
	{
		src: "/images/sundae.jpg",
		alt: "A berry sundae with cream in a glass coupe",
		caption: "Served"
	}
];
function formatRs(amount) {
	return `Rs. ${amount.toLocaleString("en-PK")}`;
}
function whatsappHref(product) {
	const text = product ? `Hello Frenzee, I would like to order:\n• ${product.name} (${product.groupLabel}) — ${formatRs(product.price)}\n\n10% off is already included in this price. Please confirm availability.` : "Hello Frenzee, I would like to place an order. Please tell me what is available.";
	return `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(text)}`;
}
var $$splitComponentImporter = () => import("./routes-TWdBvOi-.mjs");
var jsonLd = {
	"@context": "https://schema.org",
	"@type": "IceCreamShop",
	name: "Frenzee",
	telephone: shop.phoneTel,
	servesCuisine: "Ice cream",
	address: {
		"@type": "PostalAddress",
		streetAddress: "Shop #16–33, Civic Centre, Block D2, Phase 1",
		addressLocality: "Johar Town, Lahore",
		addressCountry: "PK"
	},
	openingHours: "Mo-Su 16:00-02:00",
	aggregateRating: {
		"@type": "AggregateRating",
		ratingValue: shop.rating,
		reviewCount: String(shop.reviewCount),
		bestRating: "5"
	},
	sameAs: [shop.instagram]
};
var rootRouteChildren = { IndexRoute: createFileRoute("/")({
	head: () => ({ scripts: [{
		type: "application/ld+json",
		children: JSON.stringify(jsonLd)
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
}).update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { gallery as a, shop as c, formatRs as i, whatsappHref as l, discountNote as n, menuSections as o, featured as r, products as s, router_exports as t };
