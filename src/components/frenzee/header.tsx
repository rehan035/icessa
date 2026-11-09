import { useEffect, useState } from "react";
import { Menu, ShoppingBag, Sparkles, X } from "lucide-react";
import { whatsappHref } from "@/data/menu";
import { useCartStore } from "@/data/cart";

const links = [
  { href: "#flavours", label: "Flavours" },
  { href: "#menu", label: "Full Menu" },
  { href: "#promo", label: "10% Off Deal" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#visit", label: "Visit & Hours" },
];

export function WhatsAppIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const ink = tone === "light" ? "text-ivory" : "text-ink";
  return (
    <a
      href="#top"
      className={`inline-flex shrink-0 items-center gap-2 sm:gap-2.5 ${ink} group select-none`}
    >
      <img
        src="/favicon.svg"
        alt=""
        className="h-8 w-8 sm:h-9 sm:w-9 transition-transform group-hover:rotate-6 shrink-0"
      />
      <div className="flex flex-col leading-tight">
        <span className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
          Frenzee
        </span>
        <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-cherry opacity-85">
          Johar Town
        </span>
      </div>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getTotalItems, setIsOpen } = useCartStore();
  const totalItems = getTotalItems();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Prominent 10% OFF Top Announcement Bar */}
      <aside
        id="promo"
        className="bg-cherry text-ivory text-xs sm:text-sm py-2 px-3 sm:px-4 text-center font-medium shadow-inner relative z-50"
        aria-label="Promotion announcement"
      >
        <div className="mx-auto max-w-6xl flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap leading-snug">
          <span className="inline-flex items-center gap-1 rounded-full bg-ivory/15 px-2.5 py-0.5 text-[11px] sm:text-xs font-semibold text-ivory shrink-0">
            <Sparkles className="size-3 text-blush" />
            10% OFF ALL ITEMS
          </span>
          <span className="text-xs sm:text-sm">
            Discount automatically applied to every scoop & shake — no promo code needed.
          </span>
          <span className="hidden md:inline text-ivory/60">|</span>
          <span className="hidden md:inline text-ivory/90 font-normal">
            Open daily 4 PM – 2 AM at Civic Centre
          </span>
        </div>
      </aside>

      <header
        className={`sticky top-0 z-40 border-b transition-colors ${
          scrolled
            ? "border-line bg-cream/95 backdrop-blur-md shadow-xs"
            : "border-line/40 bg-cream/80 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-3.5 sm:px-5">
          {/* Logo with guaranteed shrink-0 */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-cocoa transition-colors hover:text-cherry"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons (Responsive & Collision-Free) */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            {/* Bag Button: compact size-10 on mobile, expanded with label on sm+ */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="relative inline-flex size-10 sm:h-10 sm:w-auto sm:px-3.5 items-center justify-center sm:justify-start gap-1.5 rounded-full border border-line bg-ivory text-ink transition-colors hover:border-cherry hover:text-cherry shrink-0"
              aria-label={`Shopping bag with ${totalItems} items`}
            >
              <ShoppingBag className="size-4.5 shrink-0" />
              <span className="hidden sm:inline text-xs font-semibold">Bag</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 sm:static flex size-5 items-center justify-center rounded-full bg-cherry text-[10px] font-bold text-ivory shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Direct WhatsApp CTA: compact icon button on mobile, full button on sm+ */}
            <a
              href={whatsappHref()}
              className="btn btn-primary size-10 sm:h-10 sm:w-auto p-0 sm:px-4 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
              target="_blank"
              rel="noreferrer"
              aria-label="Order on WhatsApp"
            >
              <WhatsAppIcon className="size-4.5 shrink-0" />
              <span className="hidden sm:inline">Order on WhatsApp</span>
            </a>

            {/* Mobile menu trigger */}
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-ivory text-ink lg:hidden shrink-0 hover:bg-cream transition-colors"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {open ? (
          <nav
            id="mobile-nav"
            className="border-t border-line bg-cream px-5 py-4 lg:hidden shadow-lg animate-in slide-in-from-top-2 duration-150"
            aria-label="Mobile"
          >
            <ul className="flex flex-col divide-y divide-line/40">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex min-h-12 items-center text-lg font-display text-ink hover:text-cherry"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setIsOpen(true);
                }}
                className="btn btn-line w-full flex items-center justify-center gap-2"
              >
                <ShoppingBag className="size-4" />
                <span>View Order Bag ({totalItems} items)</span>
              </button>
              <a
                href={whatsappHref()}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                <WhatsAppIcon className="size-4" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </nav>
        ) : null}
      </header>
    </>
  );
}
