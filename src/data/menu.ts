/**
 * Frenzee menu — edit names and prices here.
 * Sale prices already include 10% off. Do not apply another discount.
 * Flavour notes are short and replaceable; swap them for official menu copy
 * when the shop supplies it. Do not add products that are not listed.
 */

export const shop = {
  name: "Frenzee",
  phoneDisplay: "+92 326 4911207",
  phoneTel: "+923264911207",
  whatsapp: "923264911207",
  instagram: "https://www.instagram.com/gofrenzee/",
  instagramHandle: "@gofrenzee",
  address: ["Shop #16–33, Civic Centre", "Block D2, Phase 1, Johar Town", "Lahore, Pakistan"],
  hours: "Daily, 4 PM – 2 AM",
  rating: "5.0",
  reviewCount: 317,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Frenzee+Shop+16+Civic+Centre+Block+D2+Johar+Town+Lahore",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Shop%2016%20Civic%20Centre%20Block%20D2%20Phase%201%20Johar%20Town%20Lahore",
  mapsEmbed:
    "https://maps.google.com/maps?q=Shop%2016%20Civic%20Centre%20Block%20D2%20Phase%201%20Johar%20Town%20Lahore&z=16&output=embed",
} as const;

export const discountNote =
  "10% off is already included in every price on this page. It is applied automatically — nothing further is taken off.";

export type MenuGroup = "premium" | "signature" | "premium-shake" | "signature-shake";

export type Product = {
  id: string;
  name: string;
  group: MenuGroup;
  groupLabel: string;
  price: number;
  originalPrice: number;
  size?: string;
  description: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

export const products: Product[] = [
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
    featured: true,
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
    imageAlt: "Golden scoops of ice cream on a ceramic stand",
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
    imageAlt: "Chocolate ice cream scoops in a dark cup",
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
    featured: true,
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
    imageAlt: "Chocolate ice cream in waffle cones with cookie pieces",
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    imageAlt: "Vanilla and chocolate ice cream in a cup",
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
    imageAlt: "Golden scoops of ice cream",
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
    imageAlt: "Caramel and chocolate dessert with ice cream",
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
    imageAlt: "Chocolate shake in a glass jar with whipped cream",
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
    imageAlt: "Chocolate ice cream cones",
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
    imageAlt: "Berry ice cream sundae in a glass",
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
    imageAlt: "Pink strawberry shake in a tall glass",
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
    imageAlt: "Chocolate ice cream with nuts",
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
    imageAlt: "Glossy chocolate ice cream",
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
    imageAlt: "Soft serve finished with biscuit crumbs",
  },
];

export const featured: Product[] = [
  "silky-belgian-chocolate",
  "lotus-biscoff-supremacy",
  "strawberry-cheezcake",
  "snickery-peanut-butter",
  "wild-blueberry-blast",
  "cookie-in-cream",
  "caramel-cookie-crunch",
]
  .map((id) => products.find((item) => item.id === id))
  .filter((item): item is Product => Boolean(item));

export const menuSections: { id: MenuGroup; title: string; note: string }[] = [
  {
    id: "premium",
    title: "Premium Ice Cream",
    note: "The house range. Sale price Rs. 675, from Rs. 750.",
  },
  {
    id: "signature",
    title: "Signature Ice Cream",
    note: "The flavours people cross Johar Town for. Sale price Rs. 855, from Rs. 950.",
  },
  {
    id: "premium-shake",
    title: "Premium Ice Cream Shakes",
    note: "12 oz. Sale price Rs. 531, from Rs. 590.",
  },
  {
    id: "signature-shake",
    title: "Signature Ice Cream Shakes",
    note: "12 oz. Sale price Rs. 585, from Rs. 650.",
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  wide?: boolean;
};

export const gallery: GalleryItem[] = [
  {
    src: "/images/case.jpg",
    alt: "Rows of ice cream in a refrigerated display",
    caption: "Display",
    wide: true,
  },
  {
    src: "/images/belgian.jpg",
    alt: "Close-up of folded chocolate ice cream",
    caption: "Texture",
  },
  {
    src: "/images/cone-hand.jpg",
    alt: "A hand holding a cone of strawberry and vanilla ice cream",
    caption: "In hand",
  },
  {
    src: "/images/berry-cones.jpg",
    alt: "Scoops of berry and citrus ice cream in waffle cones",
    caption: "Colour",
    wide: true,
  },
  {
    src: "/images/strawberry-glass.jpg",
    alt: "Strawberries layered with cream in a glass",
    caption: "Strawberry",
  },
  {
    src: "/images/sundae.jpg",
    alt: "A berry sundae with cream in a glass coupe",
    caption: "Served",
  },
];

export function formatRs(amount: number) {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}

export function whatsappHref(product?: Product) {
  const text = product
    ? `Hello Frenzee, I would like to order:\n• ${product.name} (${product.groupLabel}) — ${formatRs(product.price)}\n\n10% off is already included in this price. Please confirm availability.`
    : "Hello Frenzee, I would like to place an order. Please tell me what is available.";
  return `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(text)}`;
}
