import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Clock, Instagram, MapPin, Phone, Star, X } from "lucide-react";
import { Header, Logo } from "@/components/frenzee/header";
import {
  discountNote,
  featured,
  formatRs,
  gallery,
  menuSections,
  products,
  shop,
  whatsappHref,
  type GalleryItem,
  type MenuGroup,
  type Product,
} from "@/data/menu";

const filters: { id: MenuGroup | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "premium", label: "Premium" },
  { id: "signature", label: "Signature" },
  { id: "premium-shake", label: "Premium shakes" },
  { id: "signature-shake", label: "Signature shakes" },
];

export function HomePage() {
  const [filter, setFilter] = useState<MenuGroup | "all">("all");
  const [product, setProduct] = useState<Product | null>(null);
  const [shot, setShot] = useState<GalleryItem | null>(null);

  const sections = filter === "all" ? menuSections : menuSections.filter((section) => section.id === filter);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section id="top" className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-8 pt-4 lg:grid-cols-2 lg:gap-14 lg:pb-16 lg:pt-10">
          <div className="order-2 rise lg:order-1">
            <p className="text-xs font-medium uppercase tracking-widest text-cherry">Johar Town, Lahore</p>
            <h1 className="mt-4 font-display text-5xl leading-none tracking-tight text-ink sm:text-6xl lg:text-7xl">
              A Little Scoop of Happiness.
            </h1>
            <p className="mt-5 max-w-md text-lg text-cocoa">
              Discover rich flavours, creamy textures and unforgettable moments at Frenzee.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#flavours" className="btn btn-primary w-full sm:w-auto">
                Explore Our Flavours
              </a>
              <a href={whatsappHref()} className="btn btn-line w-full sm:w-auto" target="_blank" rel="noreferrer">
                Order on WhatsApp
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-cocoa">
              <a href="#reviews" className="inline-flex items-center gap-2 hover:text-cherry">
                <Star className="size-4 fill-cherry text-cherry" aria-hidden />
                {shop.rating} · {shop.reviewCount} reviews
              </a>
              <span className="inline-flex items-center gap-2">
                <Clock className="size-4" aria-hidden />
                {shop.hours}
              </span>
            </div>
          </div>
          <div className="relative order-1 overflow-hidden rounded-card lg:order-2">
            <img
              src="/images/hero.jpg"
              alt="Three chocolate ice cream cones on a dark plate"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-auto lg:h-[36rem]"
            />
            <p className="absolute inset-x-4 bottom-4 rounded-full bg-ivory/95 px-4 py-3 text-center text-sm text-ink">
              10% off all items — already in the price
            </p>
          </div>
        </section>

        <section className="bg-cherry text-ivory" aria-label="Current offer">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:py-7">
            <p className="font-display text-3xl tracking-tight sm:text-4xl">10% off all items</p>
            <p className="max-w-xl text-sm leading-relaxed text-ivory/90">{discountNote}</p>
          </div>
        </section>

        <section id="flavours" className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-cherry">Signature flavours</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">The scoops worth crossing town for.</h2>
            <p className="mt-4 text-cocoa">
              Seven flavours from the menu. Tap a card for the sale price and a WhatsApp order with that item already written in.
            </p>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <li key={item.id}>
                <ProductCard product={item} onOpen={setProduct} />
              </li>
            ))}
          </ul>
        </section>

        <section id="menu" className="border-t border-line py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-widest text-cherry">Our menu</p>
              <h2 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">Scoops and 12 oz shakes.</h2>
              <p className="mt-4 text-cocoa">
                Premium and signature ice cream, plus the same flavours as shakes. Struck prices are the original. The figure beside them is what you pay.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter the menu">
              {filters.map((item) => {
                const selected = filter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setFilter(item.id)}
                    className={`min-h-11 rounded-full px-4 text-sm ${
                      selected ? "bg-cherry text-ivory" : "border border-line bg-ivory text-ink"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            <div className="mt-12 space-y-14">
              {sections.map((section) => {
                const items = products.filter((item) => item.group === section.id);
                return (
                  <div key={section.id}>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                      <h3 className="font-display text-3xl tracking-tight">{section.title}</h3>
                      <p className="text-sm text-cocoa">{section.note}</p>
                    </div>
                    <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((item) => (
                        <li key={item.id}>
                          <ProductCard product={item} onOpen={setProduct} />
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:py-24">
          <div className="overflow-hidden rounded-card">
            <img
              src="/images/belgian.jpg"
              alt="Close-up of glossy, folded chocolate ice cream"
              className="zoom-photo aspect-[5/4] w-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-cherry">About Frenzee</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">A late counter for a slow scoop.</h2>
            <div className="mt-5 space-y-4 text-cocoa">
              <p>
                Frenzee is a premium ice cream shop in Johar Town — scoops and 12 oz shakes, open from the afternoon until well past midnight.
              </p>
              <p>
                The menu is short on purpose. Five premium flavours, five signature flavours, and those same names poured as shakes. Creamy texture, a clear price, and a counter you can actually get to.
              </p>
              <p>
                Every price on this page already includes 10% off. This site does not take payment. Send the flavour on WhatsApp, or walk in, and Frenzee will confirm what is ready.
              </p>
            </div>
          </div>
        </section>

        <section id="gallery" className="bg-ivory py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-widest text-cherry">Gallery</p>
              <h2 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">Close enough to taste.</h2>
              <p className="mt-4 text-cocoa">
                Ice cream close-ups and dessert presentations. These photographs are temporary stand-ins until Frenzee’s own pictures are ready — they are not photos of the shop.
              </p>
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
              {gallery.map((item) => (
                <li key={item.src + item.caption} className={item.wide ? "col-span-2" : undefined}>
                  <button
                    type="button"
                    onClick={() => setShot(item)}
                    className="group relative block w-full overflow-hidden rounded-card text-left"
                  >
                    <img src={item.src} alt={item.alt} className="zoom-photo aspect-[4/3] w-full object-cover" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-ivory/95 px-3 py-1 text-sm text-ink">{item.caption}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="reviews" className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <div className="grid gap-8 rounded-card bg-cherry-deep px-6 py-10 text-ivory sm:px-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-blush">Google</p>
              <p className="mt-3 font-display text-7xl leading-none tracking-tight">{shop.rating}</p>
              <p className="mt-3 text-ivory/80">from {shop.reviewCount} Google reviews</p>
            </div>
            <div>
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">The rating lives on Google. We don’t rewrite it here.</h2>
              <p className="mt-4 max-w-xl text-ivory/80">
                Frenzee is listed at 5.0 from {shop.reviewCount} reviews. This page does not publish customer quotes. Read them on Google, where they were written.
              </p>
            <a href={shop.mapsUrl} className="btn btn-on-dark mt-6" target="_blank" rel="noreferrer">
                Read reviews on Google
              </a>
            </div>
          </div>
        </section>

        <section id="visit" className="border-t border-line bg-ivory">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2 lg:py-24">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-cherry">Visit</p>
              <h2 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">Civic Centre, Johar Town.</h2>
              <address className="mt-6 space-y-4 text-cocoa not-italic">
                <p className="flex gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-cherry" aria-hidden />
                  <span>
                    {shop.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <Clock className="size-5 shrink-0 text-cherry" aria-hidden />
                  {shop.hours}
                </p>
                <p>
                  <a href={`tel:${shop.phoneTel}`} className="inline-flex items-center gap-3 hover:text-cherry">
                    <Phone className="size-5 shrink-0 text-cherry" aria-hidden />
                    {shop.phoneDisplay}
                  </a>
                </p>
              </address>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href={whatsappHref()} className="btn btn-primary w-full sm:w-auto" target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
                <a href={shop.directionsUrl} className="btn btn-line w-full sm:w-auto" target="_blank" rel="noreferrer">
                  Directions
                </a>
                <a href={shop.instagram} className="btn btn-line w-full sm:w-auto" target="_blank" rel="noreferrer">
                  <Instagram className="size-4" aria-hidden />
                  {shop.instagramHandle}
                </a>
              </div>
            </div>
            <iframe
              title="Map of Frenzee at Civic Centre, Block D2, Johar Town, Lahore"
              src={shop.mapsEmbed}
              className="h-80 w-full rounded-card border border-line lg:h-full lg:min-h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>

      <footer className="bg-ink text-ivory">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-sm text-sm text-ivory/70">
              Shop #16–33, Civic Centre, Block D2, Phase 1, Johar Town, Lahore. {shop.hours}.
            </p>
          </div>
          <p className="text-sm text-ivory/60">© {new Date().getFullYear()} Frenzee. Orders are confirmed on WhatsApp — this site does not take payment.</p>
        </div>
      </footer>

      <ProductDialog product={product} onClose={() => setProduct(null)} />
      <GalleryDialog shot={shot} onClose={() => setShot(null)} />
    </div>
  );
}

function kicker(product: Product) {
  if (product.group === "premium-shake") return "12 oz · Premium shake";
  if (product.group === "signature-shake") return "12 oz · Signature shake";
  if (product.group === "signature") return "Signature";
  return "Premium";
}

function ProductCard({ product, onOpen }: { product: Product; onOpen: (product: Product) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(product)}
      className="group flex h-full w-full flex-col overflow-hidden rounded-card border border-line bg-ivory text-left"
    >
      <span className="relative block overflow-hidden">
        <img src={product.image} alt={product.imageAlt} className="zoom-photo aspect-[4/3] w-full object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-cherry px-2.5 py-1 text-xs font-medium text-ivory">10% OFF</span>
      </span>
      <span className="flex flex-1 flex-col px-4 py-4">
        <span className="text-xs uppercase tracking-widest text-blush">{kicker(product)}</span>
        <span className="mt-2 font-display text-2xl tracking-tight text-ink">{product.name}</span>
        <span className="mt-2 line-clamp-2 text-sm text-cocoa">{product.description}</span>
        <span className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-2xl text-cherry">{formatRs(product.price)}</span>
          <span className="text-sm text-cocoa line-through">{formatRs(product.originalPrice)}</span>
        </span>
      </span>
    </button>
  );
}

function ProductDialog({ product, onClose }: { product: Product | null; onClose: () => void }) {
  return (
    <Dialog.Root open={Boolean(product)} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/70" />
        <Dialog.Content className="fixed inset-x-4 top-1/2 z-50 max-h-[min(42rem,calc(100dvh-2rem))] -translate-y-1/2 overflow-y-auto rounded-card bg-ivory outline-none sm:inset-x-auto sm:left-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2">
          {product ? (
            <>
              <img src={product.image} alt={product.imageAlt} className="aspect-[16/10] w-full object-cover" />
              <div className="px-5 py-5">
                <p className="text-xs uppercase tracking-widest text-blush">{product.groupLabel}</p>
                <Dialog.Title className="mt-2 font-display text-3xl tracking-tight text-ink">{product.name}</Dialog.Title>
                <Dialog.Description className="mt-3 text-cocoa">{product.description}</Dialog.Description>
                <p className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-3xl text-cherry">{formatRs(product.price)}</span>
                  <span className="text-cocoa line-through">{formatRs(product.originalPrice)}</span>
                  <span className="rounded-full bg-cherry px-2.5 py-1 text-xs font-medium text-ivory">10% OFF</span>
                </p>
                <p className="mt-3 text-sm text-cocoa">
                  The sale price already includes 10% off. WhatsApp opens a message with this item. Frenzee confirms availability. This site does not take payment.
                </p>
                <a href={whatsappHref(product)} className="btn btn-primary mt-5 w-full" target="_blank" rel="noreferrer">
                  Order on WhatsApp
                </a>
              </div>
              <Dialog.Close className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-ink" aria-label="Close">
                <X aria-hidden />
              </Dialog.Close>
            </>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function GalleryDialog({ shot, onClose }: { shot: GalleryItem | null; onClose: () => void }) {
  return (
    <Dialog.Root open={Boolean(shot)} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/80" />
        <Dialog.Content className="fixed inset-x-4 top-1/2 z-50 -translate-y-1/2 overflow-hidden rounded-card bg-ink outline-none sm:inset-x-auto sm:left-1/2 sm:w-full sm:max-w-3xl sm:-translate-x-1/2">
          {shot ? (
            <>
              <img src={shot.src} alt={shot.alt} className="max-h-[70dvh] w-full object-contain" />
              <Dialog.Title className="px-4 py-3 text-sm text-ivory">{shot.caption}</Dialog.Title>
              <Dialog.Description className="sr-only">{shot.alt}. Temporary photograph, not the shop interior.</Dialog.Description>
              <Dialog.Close className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-ink" aria-label="Close">
                <X aria-hidden />
              </Dialog.Close>
            </>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
