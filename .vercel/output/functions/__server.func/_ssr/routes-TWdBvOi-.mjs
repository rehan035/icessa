import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Menu, c as Clock, i as Phone, o as MapPin, r as Star, s as Instagram, t as X } from "../_libs/lucide-react.mjs";
import { a as gallery, c as shop, i as formatRs, l as whatsappHref, n as discountNote, o as menuSections, r as featured, s as products } from "./router-BgUoMv8C.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-TWdBvOi-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var links = [
	{
		href: "#flavours",
		label: "Flavours"
	},
	{
		href: "#menu",
		label: "Menu"
	},
	{
		href: "#about",
		label: "About"
	},
	{
		href: "#gallery",
		label: "Gallery"
	},
	{
		href: "#reviews",
		label: "Reviews"
	},
	{
		href: "#visit",
		label: "Visit"
	}
];
function Logo({ tone = "dark" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: "#top",
		className: `inline-flex items-center gap-2.5 ${tone === "light" ? "text-ivory" : "text-ink"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/favicon.svg",
			alt: "",
			className: "h-9 w-9"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-2xl leading-none tracking-tight",
			children: "Frenzee"
		})]
	});
}
function Header() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `sticky top-0 z-40 border-b ${scrolled ? "border-line bg-cream/95 backdrop-blur" : "border-transparent bg-cream/80 backdrop-blur"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-7 lg:flex",
					"aria-label": "Primary",
					children: links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: link.href,
						className: "text-sm text-cocoa hover:text-cherry",
						children: link.label
					}, link.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: whatsappHref(),
						className: "btn btn-primary h-11 px-3 sm:px-5",
						target: "_blank",
						rel: "noreferrer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sm:hidden",
							children: "Order"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Order on WhatsApp"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ivory lg:hidden",
						"aria-expanded": open,
						"aria-controls": "mobile-nav",
						onClick: () => setOpen((value) => !value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: open ? "Close menu" : "Open menu"
						}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { "aria-hidden": true }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { "aria-hidden": true })]
					})]
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			id: "mobile-nav",
			className: "border-t border-line bg-cream px-5 py-4 lg:hidden",
			"aria-label": "Mobile",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col",
				children: links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: link.href,
					className: "flex min-h-11 items-center text-lg font-display",
					onClick: () => setOpen(false),
					children: link.label
				}) }, link.href))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: whatsappHref(),
				className: "btn btn-primary mt-3 w-full",
				target: "_blank",
				rel: "noreferrer",
				onClick: () => setOpen(false),
				children: "Order on WhatsApp"
			})]
		}) : null]
	});
}
var filters = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "premium",
		label: "Premium"
	},
	{
		id: "signature",
		label: "Signature"
	},
	{
		id: "premium-shake",
		label: "Premium shakes"
	},
	{
		id: "signature-shake",
		label: "Signature shakes"
	}
];
function HomePage() {
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [product, setProduct] = (0, import_react.useState)(null);
	const [shot, setShot] = (0, import_react.useState)(null);
	const sections = filter === "all" ? menuSections : menuSections.filter((section) => section.id === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "top",
					className: "mx-auto grid max-w-6xl items-center gap-8 px-5 pb-8 pt-4 lg:grid-cols-2 lg:gap-14 lg:pb-16 lg:pt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "order-2 rise lg:order-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-widest text-cherry",
								children: "Johar Town, Lahore"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-4 font-display text-5xl leading-none tracking-tight text-ink sm:text-6xl lg:text-7xl",
								children: "A Little Scoop of Happiness."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-md text-lg text-cocoa",
								children: "Discover rich flavours, creamy textures and unforgettable moments at Frenzee."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-7 flex flex-col gap-3 sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#flavours",
									className: "btn btn-primary w-full sm:w-auto",
									children: "Explore Our Flavours"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: whatsappHref(),
									className: "btn btn-line w-full sm:w-auto",
									target: "_blank",
									rel: "noreferrer",
									children: "Order on WhatsApp"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-cocoa",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#reviews",
									className: "inline-flex items-center gap-2 hover:text-cherry",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
											className: "size-4 fill-cherry text-cherry",
											"aria-hidden": true
										}),
										shop.rating,
										" · ",
										shop.reviewCount,
										" reviews"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
										className: "size-4",
										"aria-hidden": true
									}), shop.hours]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative order-1 overflow-hidden rounded-card lg:order-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/hero.jpg",
							alt: "Three chocolate ice cream cones on a dark plate",
							className: "aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-auto lg:h-[36rem]"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "absolute inset-x-4 bottom-4 rounded-full bg-ivory/95 px-4 py-3 text-center text-sm text-ink",
							children: "10% off all items — already in the price"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "bg-cherry text-ivory",
					"aria-label": "Current offer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:py-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl tracking-tight sm:text-4xl",
							children: "10% off all items"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-xl text-sm leading-relaxed text-ivory/90",
							children: discountNote
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "flavours",
					className: "mx-auto max-w-6xl px-5 py-16 lg:py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-widest text-cherry",
								children: "Signature flavours"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl",
								children: "The scoops worth crossing town for."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-cocoa",
								children: "Seven flavours from the menu. Tap a card for the sale price and a WhatsApp order with that item already written in."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
						children: featured.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
							product: item,
							onOpen: setProduct
						}) }, item.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "menu",
					className: "border-t border-line py-16 lg:py-24",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-6xl px-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-w-2xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium uppercase tracking-widest text-cherry",
										children: "Our menu"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl",
										children: "Scoops and 12 oz shakes."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-cocoa",
										children: "Premium and signature ice cream, plus the same flavours as shakes. Struck prices are the original. The figure beside them is what you pay."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 flex flex-wrap gap-2",
								role: "group",
								"aria-label": "Filter the menu",
								children: filters.map((item) => {
									const selected = filter === item.id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-pressed": selected,
										onClick: () => setFilter(item.id),
										className: `min-h-11 rounded-full px-4 text-sm ${selected ? "bg-cherry text-ivory" : "border border-line bg-ivory text-ink"}`,
										children: item.label
									}, item.id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-12 space-y-14",
								children: sections.map((section) => {
									const items = products.filter((item) => item.group === section.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-3xl tracking-tight",
											children: section.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-cocoa",
											children: section.note
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
										children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
											product: item,
											onOpen: setProduct
										}) }, item.id))
									})] }, section.id);
								})
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "about",
					className: "mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/belgian.jpg",
							alt: "Close-up of glossy, folded chocolate ice cream",
							className: "zoom-photo aspect-[5/4] w-full object-cover"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-widest text-cherry",
							children: "About Frenzee"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl",
							children: "A late counter for a slow scoop."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 space-y-4 text-cocoa",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Frenzee is a premium ice cream shop in Johar Town — scoops and 12 oz shakes, open from the afternoon until well past midnight." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The menu is short on purpose. Five premium flavours, five signature flavours, and those same names poured as shakes. Creamy texture, a clear price, and a counter you can actually get to." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every price on this page already includes 10% off. This site does not take payment. Send the flavour on WhatsApp, or walk in, and Frenzee will confirm what is ready." })
							]
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "gallery",
					className: "bg-ivory py-16 lg:py-24",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-6xl px-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium uppercase tracking-widest text-cherry",
									children: "Gallery"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl",
									children: "Close enough to taste."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-cocoa",
									children: "Ice cream close-ups and dessert presentations. These photographs are temporary stand-ins until Frenzee’s own pictures are ready — they are not photos of the shop."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4",
							children: gallery.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: item.wide ? "col-span-2" : void 0,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setShot(item),
									className: "group relative block w-full overflow-hidden rounded-card text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: item.src,
										alt: item.alt,
										className: "zoom-photo aspect-[4/3] w-full object-cover"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute bottom-3 left-3 rounded-full bg-ivory/95 px-3 py-1 text-sm text-ink",
										children: item.caption
									})]
								})
							}, item.src + item.caption))
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "reviews",
					className: "mx-auto max-w-6xl px-5 py-16 lg:py-24",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-8 rounded-card bg-cherry-deep px-6 py-10 text-ivory sm:px-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-widest text-blush",
								children: "Google"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-7xl leading-none tracking-tight",
								children: shop.rating
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-ivory/80",
								children: [
									"from ",
									shop.reviewCount,
									" Google reviews"
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl tracking-tight sm:text-4xl",
								children: "The rating lives on Google. We don’t rewrite it here."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 max-w-xl text-ivory/80",
								children: [
									"Frenzee is listed at 5.0 from ",
									shop.reviewCount,
									" reviews. This page does not publish customer quotes. Read them on Google, where they were written."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: shop.mapsUrl,
								className: "btn btn-on-dark mt-6",
								target: "_blank",
								rel: "noreferrer",
								children: "Read reviews on Google"
							})
						] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "visit",
					className: "border-t border-line bg-ivory",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2 lg:py-24",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-widest text-cherry",
								children: "Visit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl",
								children: "Civic Centre, Johar Town."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("address", {
								className: "mt-6 space-y-4 text-cocoa not-italic",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
											className: "mt-0.5 size-5 shrink-0 text-cherry",
											"aria-hidden": true
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: shop.address.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block",
											children: line
										}, line)) })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
											className: "size-5 shrink-0 text-cherry",
											"aria-hidden": true
										}), shop.hours]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: `tel:${shop.phoneTel}`,
										className: "inline-flex items-center gap-3 hover:text-cherry",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
											className: "size-5 shrink-0 text-cherry",
											"aria-hidden": true
										}), shop.phoneDisplay]
									}) })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-7 flex flex-col gap-3 sm:flex-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: whatsappHref(),
										className: "btn btn-primary w-full sm:w-auto",
										target: "_blank",
										rel: "noreferrer",
										children: "WhatsApp"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: shop.directionsUrl,
										className: "btn btn-line w-full sm:w-auto",
										target: "_blank",
										rel: "noreferrer",
										children: "Directions"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: shop.instagram,
										className: "btn btn-line w-full sm:w-auto",
										target: "_blank",
										rel: "noreferrer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, {
											className: "size-4",
											"aria-hidden": true
										}), shop.instagramHandle]
									})
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
							title: "Map of Frenzee at Civic Centre, Block D2, Johar Town, Lahore",
							src: shop.mapsEmbed,
							className: "h-80 w-full rounded-card border border-line lg:h-full lg:min-h-80",
							loading: "lazy",
							referrerPolicy: "no-referrer-when-downgrade"
						})]
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "bg-ink text-ivory",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { tone: "light" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 max-w-sm text-sm text-ivory/70",
						children: [
							"Shop #16–33, Civic Centre, Block D2, Phase 1, Johar Town, Lahore. ",
							shop.hours,
							"."
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-ivory/60",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" Frenzee. Orders are confirmed on WhatsApp — this site does not take payment."
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductDialog, {
				product,
				onClose: () => setProduct(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GalleryDialog, {
				shot,
				onClose: () => setShot(null)
			})
		]
	});
}
function kicker(product) {
	if (product.group === "premium-shake") return "12 oz · Premium shake";
	if (product.group === "signature-shake") return "12 oz · Signature shake";
	if (product.group === "signature") return "Signature";
	return "Premium";
}
function ProductCard({ product, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onOpen(product),
		className: "group flex h-full w-full flex-col overflow-hidden rounded-card border border-line bg-ivory text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "relative block overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: product.image,
				alt: product.imageAlt,
				className: "zoom-photo aspect-[4/3] w-full object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-3 top-3 rounded-full bg-cherry px-2.5 py-1 text-xs font-medium text-ivory",
				children: "10% OFF"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex flex-1 flex-col px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs uppercase tracking-widest text-blush",
					children: kicker(product)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-2 font-display text-2xl tracking-tight text-ink",
					children: product.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-2 line-clamp-2 text-sm text-cocoa",
					children: product.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-4 flex items-baseline gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl text-cherry",
						children: formatRs(product.price)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-cocoa line-through",
						children: formatRs(product.originalPrice)
					})]
				})
			]
		})]
	});
}
function ProductDialog({ product, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: Boolean(product),
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "fixed inset-x-4 top-1/2 z-50 max-h-[min(42rem,calc(100dvh-2rem))] -translate-y-1/2 overflow-y-auto rounded-card bg-ivory outline-none sm:inset-x-auto sm:left-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2",
			children: product ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.image,
					alt: product.imageAlt,
					className: "aspect-[16/10] w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 py-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-widest text-blush",
							children: product.groupLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "mt-2 font-display text-3xl tracking-tight text-ink",
							children: product.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							className: "mt-3 text-cocoa",
							children: product.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 flex items-baseline gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-3xl text-cherry",
									children: formatRs(product.price)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-cocoa line-through",
									children: formatRs(product.originalPrice)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-cherry px-2.5 py-1 text-xs font-medium text-ivory",
									children: "10% OFF"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-cocoa",
							children: "The sale price already includes 10% off. WhatsApp opens a message with this item. Frenzee confirms availability. This site does not take payment."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: whatsappHref(product),
							className: "btn btn-primary mt-5 w-full",
							target: "_blank",
							rel: "noreferrer",
							children: "Order on WhatsApp"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					className: "absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-ink",
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { "aria-hidden": true })
				})
			] }) : null
		})] })
	});
}
function GalleryDialog({ shot, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: Boolean(shot),
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "fixed inset-x-4 top-1/2 z-50 -translate-y-1/2 overflow-hidden rounded-card bg-ink outline-none sm:inset-x-auto sm:left-1/2 sm:w-full sm:max-w-3xl sm:-translate-x-1/2",
			children: shot ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: shot.src,
					alt: shot.alt,
					className: "max-h-[70dvh] w-full object-contain"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "px-4 py-3 text-sm text-ivory",
					children: shot.caption
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
					className: "sr-only",
					children: [shot.alt, ". Temporary photograph, not the shop interior."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					className: "absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-ink",
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { "aria-hidden": true })
				})
			] }) : null
		})] })
	});
}
var SplitComponent = HomePage;
//#endregion
export { SplitComponent as component };
