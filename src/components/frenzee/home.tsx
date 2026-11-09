import { useState, useMemo } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Clock,
  Instagram,
  MapPin,
  Phone,
  Star,
  X,
  Plus,
  ShoppingBag,
  Sparkles,
  Check,
  Search,
  ArrowRight,
  Tag,
  ShieldCheck,
} from "lucide-react";
import { Header, Logo } from "@/components/frenzee/header";
import { CartDrawer } from "@/components/frenzee/cart-drawer";
import { useCartStore, ServingOption } from "@/data/cart";
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

const filters: { id: MenuGroup | "all"; label: string; count: number }[] = [
  { id: "all", label: "All Items", count: products.length },
  { id: "premium", label: "Premium Ice Cream", count: 5 },
  { id: "signature", label: "Signature Ice Cream", count: 5 },
  { id: "premium-shake", label: "Premium Shakes", count: 5 },
  { id: "signature-shake", label: "Signature Shakes", count: 5 },
];

export function HomePage() {
  const [filter, setFilter] = useState<MenuGroup | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [selectedShot, setSelectedShot] = useState<GalleryItem | null>(null);
  const [addedAnimation, setAddedAnimation] = useState<string | null>(null);

  const { addItem, getTotalItems, getTotalDiscounted, getTotalSavings, setIsOpen } = useCartStore();
  const cartItemCount = getTotalItems();
  const cartTotal = getTotalDiscounted();
  const cartSavings = getTotalSavings();

  // Filter products by category and search term
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory = filter === "all" || item.group === filter;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.groupLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [filter, searchQuery]);

  const handleQuickAdd = (p: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(p);
    setAddedAnimation(p.id);
    setTimeout(() => setAddedAnimation(null), 1200);
  };

  // Determine if open now in Lahore (PKT: UTC+5, 4 PM to 2 AM)
  const openStatus = useMemo(() => {
    try {
      const now = new Date();
      // Format to Lahore hours
      const pktString = now.toLocaleString("en-US", { timeZone: "Asia/Karachi", hour12: false, hour: "numeric" });
      const currentHour = parseInt(pktString, 10);
      // Open from 16 (4 PM) through 23, and 0 through 1 (until 2 AM)
      const isOpen = currentHour >= 16 || currentHour < 2;
      return {
        isOpen,
        badgeText: isOpen ? "Open Now · Until 2:00 AM" : "Opens Today at 4:00 PM",
      };
    } catch {
      return { isOpen: true, badgeText: "Daily 4 PM – 2 AM" };
    }
  }, []);

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Header />
      <CartDrawer />

      <main>
        {/* Hero Section */}
        <section
          id="top"
          className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-8 pt-4 lg:grid-cols-2 lg:gap-14 lg:pb-16 lg:pt-8"
        >
          <div className="order-2 rise lg:order-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cherry/10 px-3 py-1 text-xs font-semibold text-cherry">
                <Sparkles className="size-3.5" />
                10% OFF ALL ITEMS
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-ivory px-3 py-1 text-xs font-medium text-cocoa">
                <span className={`size-2 rounded-full ${openStatus.isOpen ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                {openStatus.badgeText}
              </span>
            </div>

            <h1 className="mt-4 font-display text-5xl leading-none tracking-tight text-ink sm:text-6xl lg:text-7xl">
              A Little Scoop of Happiness.
            </h1>

            <p className="mt-4 max-w-lg text-lg leading-relaxed text-cocoa">
              Discover rich flavours, slow-churned textures and unforgettable moments at Frenzee.
              Signature scoops and thick 12 oz shakes, with <strong className="text-cherry font-semibold">10% discount automatically applied</strong> on every item.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#menu" className="btn btn-primary w-full sm:w-auto shadow-sm">
                Explore Full Menu
              </a>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="btn btn-line w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <ShoppingBag className="size-4 text-cherry" />
                <span>{cartItemCount > 0 ? `Your Bag (${cartItemCount})` : "Start Order Bag"}</span>
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-cocoa">
              <a href="#reviews" className="inline-flex items-center gap-1.5 font-medium hover:text-cherry">
                <div className="flex items-center text-amber-500">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-ink font-semibold">{shop.rating}</span>
                <span>({shop.reviewCount} Google reviews)</span>
              </a>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4 text-cherry" />
                {shop.hours}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4 text-cherry" />
                Civic Centre, Johar Town
              </span>
            </div>
          </div>

          <div className="relative order-1 overflow-hidden rounded-card shadow-lg lg:order-2">
            <img
              src="/images/hero.jpg"
              alt="Three chocolate ice cream cones on a dark plate"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-auto lg:h-[36rem]"
            />
            {/* Prominent Floating Promo Card in Hero */}
            <div className="absolute inset-x-4 bottom-4 rounded-xl bg-ivory/95 backdrop-blur-md p-4 shadow-md border border-line/60">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-cherry px-2 py-0.5 text-[11px] font-bold text-ivory">
                    10% OFF
                  </span>
                  <p className="mt-1 font-display text-lg font-semibold text-ink leading-tight">
                    Discount automatically applied
                  </p>
                  <p className="text-xs text-cocoa">
                    Original prices crossed out. No code needed.
                  </p>
                </div>
                <a href="#promo" className="btn btn-primary text-xs py-2 px-3 shrink-0">
                  View Deal
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Dedicated 10% OFF Promotion Feature Banner */}
        <section id="promo" className="bg-cherry text-ivory scroll-mt-20 py-8 lg:py-10">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-ivory/15 px-3 py-1 text-xs font-semibold text-ivory">
                  <Tag className="size-3.5 text-blush" />
                  OFFICIAL FRENZEE PROMOTION
                </div>
                <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl text-ivory">
                  10% OFF ALL ITEMS ON THE MENU
                </h2>
                <p className="mt-2 text-sm sm:text-base text-ivory/90 leading-relaxed">
                  {discountNote}
                </p>
                <p className="mt-1 text-xs text-blush font-medium">
                  Notice: Original prices are shown with strikethrough. The discounted price is what you pay. No additional vouchers or promo codes apply.
                </p>
              </div>

              {/* Price comparison cards */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full md:w-auto shrink-0">
                <div className="rounded-xl bg-cherry-deep/80 p-3.5 border border-ivory/10 text-center">
                  <span className="text-[11px] uppercase tracking-wider text-blush block">Premium Scoops</span>
                  <div className="mt-1 flex items-baseline justify-center gap-1.5">
                    <span className="font-display text-xl font-bold text-ivory">Rs. 675</span>
                    <span className="text-xs text-ivory/60 line-through">Rs. 750</span>
                  </div>
                  <span className="mt-1 inline-block text-[10px] bg-ivory/15 px-2 py-0.5 rounded-full text-ivory">
                    Save Rs. 75
                  </span>
                </div>

                <div className="rounded-xl bg-cherry-deep/80 p-3.5 border border-ivory/10 text-center">
                  <span className="text-[11px] uppercase tracking-wider text-blush block">Signature Scoops</span>
                  <div className="mt-1 flex items-baseline justify-center gap-1.5">
                    <span className="font-display text-xl font-bold text-ivory">Rs. 855</span>
                    <span className="text-xs text-ivory/60 line-through">Rs. 950</span>
                  </div>
                  <span className="mt-1 inline-block text-[10px] bg-ivory/15 px-2 py-0.5 rounded-full text-ivory">
                    Save Rs. 95
                  </span>
                </div>

                <div className="rounded-xl bg-cherry-deep/80 p-3.5 border border-ivory/10 text-center">
                  <span className="text-[11px] uppercase tracking-wider text-blush block">Premium Shakes (12 oz)</span>
                  <div className="mt-1 flex items-baseline justify-center gap-1.5">
                    <span className="font-display text-xl font-bold text-ivory">Rs. 531</span>
                    <span className="text-xs text-ivory/60 line-through">Rs. 590</span>
                  </div>
                  <span className="mt-1 inline-block text-[10px] bg-ivory/15 px-2 py-0.5 rounded-full text-ivory">
                    Save Rs. 59
                  </span>
                </div>

                <div className="rounded-xl bg-cherry-deep/80 p-3.5 border border-ivory/10 text-center">
                  <span className="text-[11px] uppercase tracking-wider text-blush block">Signature Shakes (12 oz)</span>
                  <div className="mt-1 flex items-baseline justify-center gap-1.5">
                    <span className="font-display text-xl font-bold text-ivory">Rs. 585</span>
                    <span className="text-xs text-ivory/60 line-through">Rs. 650</span>
                  </div>
                  <span className="mt-1 inline-block text-[10px] bg-ivory/15 px-2 py-0.5 rounded-full text-ivory">
                    Save Rs. 65
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Signature Highlights / Featured Flavours */}
        <section id="flavours" className="mx-auto max-w-6xl px-5 py-14 lg:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-cherry">
                Curated Selection
              </span>
              <h2 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl lg:text-5xl">
                The Scoops Worth Crossing Town For.
              </h2>
              <p className="mt-3 text-cocoa">
                Customer favorites crafted with Belgian chocolate, caramelised Biscoff, fresh berries, and creamy peanut butter.
                Tap any flavour to view details, select cone or cup, and order via WhatsApp.
              </p>
            </div>
            <a href="#menu" className="btn btn-line text-sm self-start md:self-end">
              View All 20 Menu Items →
            </a>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <li key={`featured-${item.id}`}>
                <ProductCard
                  product={item}
                  onOpen={setActiveProduct}
                  onQuickAdd={handleQuickAdd}
                  isAdded={addedAnimation === item.id}
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Full Interactive Menu Section */}
        <section id="menu" className="border-t border-line bg-ivory/60 py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-widest text-cherry">
                  Full Menu & Prices
                </span>
                <h2 className="mt-2 font-display text-4xl tracking-tight text-ink sm:text-5xl">
                  Scoops & 12 oz Shakes.
                </h2>
                <p className="mt-3 text-cocoa">
                  All 20 authentic Frenzee menu items. <strong>10% discount is already reflected in the displayed price</strong>.
                  Struck prices indicate original menu rates.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full lg:w-72">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-cocoa" />
                <input
                  type="text"
                  placeholder="Search flavour or shake..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-line bg-ivory pl-10 pr-4 py-2 text-sm text-ink placeholder:text-cocoa/50 focus:border-cherry focus:outline-hidden shadow-xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cocoa hover:text-cherry"
                    aria-label="Clear search"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Pills */}
            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter the menu">
              {filters.map((item) => {
                const selected = filter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setFilter(item.id)}
                    className={`inline-flex items-center gap-1.5 min-h-10 rounded-full px-4 text-xs sm:text-sm font-medium transition-all ${
                      selected
                        ? "bg-cherry text-ivory shadow-xs"
                        : "border border-line bg-ivory text-ink hover:border-cherry/50"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                        selected ? "bg-ivory/20 text-ivory" : "bg-cream text-cocoa"
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Product Grid Grouped by Section */}
            <div className="mt-12 space-y-14">
              {searchQuery.trim() !== "" ? (
                // Search result view
                <div>
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <p className="text-sm font-medium text-cocoa">
                      Showing {filteredProducts.length} results for &ldquo;{searchQuery}&rdquo;
                    </p>
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-xs text-cherry font-medium hover:underline"
                    >
                      Clear search
                    </button>
                  </div>
                  {filteredProducts.length === 0 ? (
                    <div className="py-16 text-center">
                      <p className="font-display text-2xl text-ink">No flavours found</p>
                      <p className="mt-2 text-sm text-cocoa">
                        Try searching for &ldquo;Biscoff&rdquo;, &ldquo;Chocolate&rdquo;, &ldquo;Berry&rdquo; or &ldquo;Shake&rdquo;.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="btn btn-line mt-5 text-sm"
                      >
                        Reset Search
                      </button>
                    </div>
                  ) : (
                    <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredProducts.map((item) => (
                        <li key={item.id}>
                          <ProductCard
                            product={item}
                            onOpen={setActiveProduct}
                            onQuickAdd={handleQuickAdd}
                            isAdded={addedAnimation === item.id}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                // Grouped section view
                menuSections
                  .filter((section) => filter === "all" || section.id === filter)
                  .map((section) => {
                    const items = products.filter((item) => item.group === section.id);
                    if (items.length === 0) return null;

                    return (
                      <div key={section.id} className="scroll-mt-24" id={section.id}>
                        <div className="flex flex-col gap-1 border-b border-line pb-3 sm:flex-row sm:items-end sm:justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
                                {section.title}
                              </h3>
                              <span className="rounded-full bg-cherry/10 px-2.5 py-0.5 text-xs font-semibold text-cherry">
                                10% OFF
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-cocoa">{section.note}</p>
                          </div>
                          <span className="text-xs text-cocoa/80">
                            {items.length} items · Discount applied
                          </span>
                        </div>
                        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                          {items.map((item) => (
                            <li key={item.id}>
                              <ProductCard
                                product={item}
                                onOpen={setActiveProduct}
                                onQuickAdd={handleQuickAdd}
                                isAdded={addedAnimation === item.id}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        </section>

        {/* Quality Promises / Why Frenzee */}
        <section className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-card border border-line bg-ivory p-6 shadow-xs">
              <div className="size-10 rounded-full bg-cherry/10 flex items-center justify-center text-cherry mb-4">
                <Sparkles className="size-5" />
              </div>
              <h3 className="font-display text-xl font-semibold text-ink">Slow-Churned Texture</h3>
              <p className="mt-2 text-sm text-cocoa leading-relaxed">
                Made with premium fresh dairy and generous fold-ins — from authentic Lotus Biscoff to Belgian cocoa chunks.
              </p>
            </div>

            <div className="rounded-card border border-line bg-ivory p-6 shadow-xs">
              <div className="size-10 rounded-full bg-cherry/10 flex items-center justify-center text-cherry mb-4">
                <Tag className="size-5" />
              </div>
              <h3 className="font-display text-xl font-semibold text-ink">10% Off All Items</h3>
              <p className="mt-2 text-sm text-cocoa leading-relaxed">
                Enjoy 10% off directly on every scoop and 12 oz shake. Price transparency with zero hidden delivery charges.
              </p>
            </div>

            <div className="rounded-card border border-line bg-ivory p-6 shadow-xs">
              <div className="size-10 rounded-full bg-cherry/10 flex items-center justify-center text-cherry mb-4">
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="font-display text-xl font-semibold text-ink">Direct WhatsApp Order</h3>
              <p className="mt-2 text-sm text-cocoa leading-relaxed">
                Order your personalized bag instantly. Our staff in Civic Centre confirms flavour readiness in minutes.
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="border-t border-line bg-ivory/40 py-16 lg:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-2">
            <div className="overflow-hidden rounded-card shadow-md">
              <img
                src="/images/belgian.jpg"
                alt="Close-up of glossy, folded chocolate ice cream"
                className="zoom-photo aspect-[5/4] w-full object-cover"
              />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-cherry">
                About Frenzee
              </span>
              <h2 className="mt-2 font-display text-4xl tracking-tight text-ink sm:text-5xl">
                A Late Counter for a Slow Scoop.
              </h2>
              <div className="mt-5 space-y-4 text-cocoa leading-relaxed">
                <p>
                  Frenzee is a premium ice cream shop in Civic Centre, Johar Town — serving signature scoops and 12 oz shakes, open from the afternoon at 4 PM until 2 AM late at night.
                </p>
                <p>
                  Our menu is focused on perfection: 5 house premium flavours, 5 indulgent signature flavours, and those exact same creations blended into decadent 12 oz shakes.
                </p>
                <p>
                  Every price on this website already includes our <strong>10% off promotion</strong>. We believe in honest pricing, fast WhatsApp order confirmations, and serving scoops worth coming back for.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <a href={whatsappHref()} className="btn btn-primary" target="_blank" rel="noreferrer">
                  Chat on WhatsApp
                </a>
                <a href="#visit" className="btn btn-line">
                  Store Location & Map
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="bg-ivory py-16 lg:py-24 border-t border-line">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-cherry">
                Visual Showcase
              </span>
              <h2 className="mt-2 font-display text-4xl tracking-tight text-ink sm:text-5xl">
                Close Enough to Taste.
              </h2>
              <p className="mt-3 text-cocoa">
                A glimpse into our textures, waffle cones, and dessert coupe presentations.
              </p>
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
              {gallery.map((item) => (
                <li key={item.src + item.caption} className={item.wide ? "col-span-2" : undefined}>
                  <button
                    type="button"
                    onClick={() => setSelectedShot(item)}
                    className="group relative block w-full overflow-hidden rounded-card text-left focus:outline-hidden"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="zoom-photo aspect-[4/3] w-full object-cover"
                    />
                    <span className="absolute bottom-3 left-3 rounded-full bg-ivory/95 backdrop-blur-xs px-3 py-1 text-xs font-medium text-ink shadow-xs">
                      {item.caption}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <div className="grid gap-8 rounded-card bg-cherry-deep px-6 py-10 text-ivory sm:px-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16 shadow-xl">
            <div className="text-center sm:text-left">
              <span className="text-xs font-semibold uppercase tracking-widest text-blush">
                Google Reviews
              </span>
              <p className="mt-3 font-display text-7xl font-bold leading-none tracking-tight">
                {shop.rating}
              </p>
              <div className="mt-3 flex items-center justify-center sm:justify-start gap-1 text-amber-400">
                <Star className="size-5 fill-amber-400" />
                <Star className="size-5 fill-amber-400" />
                <Star className="size-5 fill-amber-400" />
                <Star className="size-5 fill-amber-400" />
                <Star className="size-5 fill-amber-400" />
              </div>
              <p className="mt-2 text-sm text-ivory/80">
                from {shop.reviewCount} verified Google reviews
              </p>
            </div>

            <div>
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl text-ivory">
                The rating lives on Google. We don’t rewrite it here.
              </h2>
              <p className="mt-4 max-w-xl text-ivory/80 leading-relaxed text-sm sm:text-base">
                Frenzee maintains an unblemished 5.0-star rating from over 300 real customers in Lahore. Read unedited feedback directly on Google Maps from people who love our Lotus Biscoff, Belgian Chocolate, and thick shakes.
              </p>
              <a
                href={shop.mapsUrl}
                className="btn btn-on-dark mt-6 inline-flex"
                target="_blank"
                rel="noreferrer"
              >
                Read all 317 Reviews on Google →
              </a>
            </div>
          </div>
        </section>

        {/* Visit & Map Section */}
        <section id="visit" className="border-t border-line bg-ivory">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2 lg:py-24">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-cherry">
                Visit Us
              </span>
              <h2 className="mt-2 font-display text-4xl tracking-tight text-ink sm:text-5xl">
                Civic Centre, Johar Town.
              </h2>

              <address className="mt-6 space-y-4 text-cocoa not-italic text-sm sm:text-base">
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
                  <span>
                    <strong>{shop.hours}</strong> · Seven days a week
                  </span>
                </p>
                <p>
                  <a
                    href={`tel:${shop.phoneTel}`}
                    className="inline-flex items-center gap-3 hover:text-cherry font-medium"
                  >
                    <Phone className="size-5 shrink-0 text-cherry" aria-hidden />
                    {shop.phoneDisplay}
                  </a>
                </p>
              </address>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={whatsappHref()}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Order on WhatsApp
                </a>
                <a
                  href={shop.directionsUrl}
                  className="btn btn-line"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get Directions
                </a>
                <a
                  href={shop.instagram}
                  className="btn btn-line"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram className="size-4" aria-hidden />
                  {shop.instagramHandle}
                </a>
              </div>
            </div>

            <iframe
              title="Map of Frenzee at Civic Centre, Block D2, Johar Town, Lahore"
              src={shop.mapsEmbed}
              className="h-80 w-full rounded-card border border-line lg:h-full lg:min-h-80 shadow-xs"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>

      {/* Floating Cart / Order Bar (if cart has items) */}
      {cartItemCount > 0 && (
        <aside
          aria-label="Order summary"
          className="fixed bottom-4 inset-x-4 z-40 sm:inset-x-auto sm:right-6 sm:w-auto"
        >
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex w-full sm:w-auto items-center justify-between gap-4 rounded-full bg-cherry text-ivory px-5 py-3.5 shadow-2xl hover:bg-cherry-deep transition-all"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-full bg-ivory text-cherry text-xs font-bold">
                {cartItemCount}
              </span>
              <span className="text-sm font-semibold">View Order Bag</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-ivory/80 line-through">
                {formatRs(cartTotal + cartSavings)}
              </span>
              <span className="font-display text-base font-bold text-ivory">
                {formatRs(cartTotal)}
              </span>
              <ArrowRight className="size-4 text-ivory" />
            </div>
          </button>
        </aside>
      )}

      {/* Footer */}
      <footer className="bg-ink text-ivory">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-sm text-sm text-ivory/70 leading-relaxed">
              Shop #16–33, Civic Centre, Block D2, Phase 1, Johar Town, Lahore. Open daily, 4 PM – 2 AM.
            </p>
            <p className="mt-2 text-xs text-blush">
              10% discount automatically applied across all items on the menu.
            </p>
          </div>
          <div className="text-sm text-ivory/60 space-y-2">
            <p>© {new Date().getFullYear()} Frenzee. All rights reserved.</p>
            <p className="text-xs text-ivory/50">
              Orders are confirmed on WhatsApp — this site displays authentic menu pricing without collecting payment details.
            </p>
          </div>
        </div>
      </footer>

      {/* Product Detail Dialog */}
      <ProductDialog
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />

      {/* Gallery Dialog */}
      <GalleryDialog shot={selectedShot} onClose={() => setSelectedShot(null)} />
    </div>
  );
}

function kicker(product: Product) {
  if (product.group === "premium-shake") return "Premium Shake · 12 oz";
  if (product.group === "signature-shake") return "Signature Shake · 12 oz";
  if (product.group === "signature") return "Signature Scoop";
  return "Premium Scoop";
}

function ProductCard({
  product,
  onOpen,
  onQuickAdd,
  isAdded,
}: {
  product: Product;
  onOpen: (product: Product) => void;
  onQuickAdd: (product: Product, e: React.MouseEvent) => void;
  isAdded?: boolean;
}) {
  const savings = product.originalPrice - product.price;

  return (
    <div
      onClick={() => onOpen(product)}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-card border border-line bg-ivory text-left shadow-xs transition-all hover:border-cherry/40 hover:shadow-md cursor-pointer"
    >
      {/* Product Image and Badges */}
      <div className="relative block overflow-hidden">
        <img
          src={product.image}
          alt={product.imageAlt}
          className="zoom-photo aspect-[4/3] w-full object-cover"
        />

        {/* Small "10% OFF" Badge on every card as requested */}
        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-cherry px-2.5 py-1 text-xs font-bold text-ivory shadow-xs">
          <Tag className="size-3" />
          <span>10% OFF</span>
        </div>

        {/* Category Pill */}
        <span className="absolute right-3 top-3 rounded-full bg-ivory/90 backdrop-blur-xs px-2.5 py-1 text-[11px] font-medium text-ink shadow-xs">
          {kicker(product)}
        </span>
      </div>

      {/* Card Details */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-ink group-hover:text-cherry transition-colors">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-cocoa leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price Display: Strikethrough original price & Prominently displayed discounted price */}
        <div className="mt-5 pt-3 border-t border-line/60 flex items-center justify-between">
          <div>
            <span className="block text-[11px] text-cocoa/75">Discounted Price</span>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-cherry">
                {formatRs(product.price)}
              </span>
              <span className="text-sm text-cocoa/80 line-through">
                {formatRs(product.originalPrice)}
              </span>
            </div>
            <span className="text-[11px] font-medium text-emerald-700">
              Save {formatRs(savings)}
            </span>
          </div>

          {/* Quick Add Button */}
          <button
            type="button"
            onClick={(e) => onQuickAdd(product, e)}
            className={`flex size-10 items-center justify-center rounded-full border transition-all ${
              isAdded
                ? "bg-emerald-600 text-ivory border-emerald-600"
                : "border-line bg-cream text-ink hover:bg-cherry hover:text-ivory hover:border-cherry"
            }`}
            aria-label={`Add ${product.name} to bag`}
            title="Add to order bag"
          >
            {isAdded ? <Check className="size-4.5" /> : <Plus className="size-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductDialog({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addItem } = useCartStore();
  const [serving, setServing] = useState<ServingOption>("Waffle Cone");
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const isShake = product?.group.includes("shake");
  const currentServing = isShake ? "12 oz Cup" : serving;
  const savings = product ? (product.originalPrice - product.price) * quantity : 0;
  const originalTotal = product ? product.originalPrice * quantity : 0;
  const discountedTotal = product ? product.price * quantity : 0;

  const handleAddAndClose = () => {
    if (!product) return;
    addItem(product, currentServing, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 400);
  };

  return (
    <Dialog.Root open={Boolean(product)} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs" />
        <Dialog.Content className="fixed inset-x-4 top-1/2 z-50 max-h-[min(44rem,calc(100dvh-2rem))] -translate-y-1/2 overflow-y-auto rounded-card bg-ivory shadow-2xl focus:outline-hidden sm:inset-x-auto sm:left-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2">
          {product ? (
            <div>
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-cherry px-3 py-1 text-xs font-bold text-ivory shadow-md">
                  <Tag className="size-3.5" />
                  <span>10% OFF</span>
                </div>
                <Dialog.Close
                  className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-ivory/90 text-ink shadow-sm hover:bg-ivory"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </Dialog.Close>
              </div>

              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-blush">
                  {product.groupLabel}
                </span>

                <Dialog.Title className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
                  {product.name}
                </Dialog.Title>

                <Dialog.Description className="mt-2 text-cocoa leading-relaxed text-sm">
                  {product.description}
                </Dialog.Description>

                {/* Serving option selector for scoops */}
                {!isShake && (
                  <div className="mt-5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa mb-2">
                      Choose Serving
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["Waffle Cone", "Paper Cup"] as ServingOption[]).map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setServing(option)}
                          className={`rounded-xl py-2 px-3 text-xs font-medium border text-center transition-all ${
                            serving === option
                              ? "bg-cherry text-ivory border-cherry shadow-xs font-semibold"
                              : "border-line bg-cream text-ink hover:bg-line/40"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price block */}
                <div className="mt-6 rounded-xl border border-line bg-cream/60 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-xs text-cocoa">Price per item (10% Off)</span>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="font-display text-3xl font-bold text-cherry">
                          {formatRs(discountedTotal)}
                        </span>
                        <span className="text-base text-cocoa line-through">
                          {formatRs(originalTotal)}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-emerald-700">
                        You save {formatRs(savings)} (10% discount automatically applied)
                      </span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center rounded-full border border-line bg-ivory px-2 py-1">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="size-7 flex items-center justify-center text-ink hover:bg-cream rounded-full"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-bold text-sm text-ink">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="size-7 flex items-center justify-center text-ink hover:bg-cream rounded-full"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <p className="mt-3 text-[11px] text-cocoa/90 leading-tight">
                    Notice: 10% discount is already calculated into this price. No promo code needed.
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleAddAndClose}
                    className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    {justAdded ? (
                      <>
                        <Check className="size-4" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="size-4" />
                        <span>Add {quantity} to Bag ({formatRs(discountedTotal)})</span>
                      </>
                    )}
                  </button>

                  <a
                    href={whatsappHref(product)}
                    className="btn btn-line flex items-center justify-center gap-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>Instant WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function GalleryDialog({
  shot,
  onClose,
}: {
  shot: GalleryItem | null;
  onClose: () => void;
}) {
  return (
    <Dialog.Root open={Boolean(shot)} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-xs" />
        <Dialog.Content className="fixed inset-x-4 top-1/2 z-50 -translate-y-1/2 overflow-hidden rounded-card bg-ink shadow-2xl focus:outline-hidden sm:inset-x-auto sm:left-1/2 sm:w-full sm:max-w-3xl sm:-translate-x-1/2">
          {shot ? (
            <div>
              <img
                src={shot.src}
                alt={shot.alt}
                className="max-h-[72dvh] w-full object-contain bg-black/40"
              />
              <div className="flex items-center justify-between p-4 text-ivory">
                <Dialog.Title className="text-base font-medium">{shot.caption}</Dialog.Title>
                <Dialog.Description className="sr-only">
                  {shot.alt}. Presentation of Frenzee ice cream.
                </Dialog.Description>
                <Dialog.Close
                  className="inline-flex size-9 items-center justify-center rounded-full bg-ivory/20 text-ivory hover:bg-ivory/40"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </Dialog.Close>
              </div>
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
