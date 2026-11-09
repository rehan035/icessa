import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { whatsappHref } from "@/data/menu";

const links = [
  { href: "#flavours", label: "Flavours" },
  { href: "#menu", label: "Menu" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#visit", label: "Visit" },
];

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const ink = tone === "light" ? "text-ivory" : "text-ink";
  return (
    <a href="#top" className={`inline-flex items-center gap-2.5 ${ink}`}>
      <img src="/favicon.svg" alt="" className="h-9 w-9" />
      <span className="font-display text-2xl leading-none tracking-tight">Frenzee</span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    <header
      className={`sticky top-0 z-40 border-b ${
        scrolled ? "border-line bg-cream/95 backdrop-blur" : "border-transparent bg-cream/80 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-cocoa hover:text-cherry">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={whatsappHref()}
            className="btn btn-primary h-11 px-3 sm:px-5"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sm:hidden">Order</span>
            <span className="hidden sm:inline">Order on WhatsApp</span>
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ivory lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-nav" className="border-t border-line bg-cream px-5 py-4 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="flex min-h-11 items-center text-lg font-display"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={whatsappHref()}
            className="btn btn-primary mt-3 w-full"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            Order on WhatsApp
          </a>
        </nav>
      ) : null}
    </header>
  );
}
