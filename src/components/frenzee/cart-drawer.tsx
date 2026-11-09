import * as Dialog from "@radix-ui/react-dialog";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
  Sparkles,
  Clock,
  ArrowRight,
} from "lucide-react";
import { formatRs } from "@/data/menu";
import { useCartStore } from "@/data/cart";

export function CartDrawer() {
  const {
    items,
    isOpen,
    orderType,
    customerName,
    customerAddress,
    customerNotes,
    setIsOpen,
    setOrderType,
    setCustomerName,
    setCustomerAddress,
    setCustomerNotes,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalItems,
    getTotalDiscounted,
    getTotalOriginal,
    getTotalSavings,
    getWhatsAppHref,
  } = useCartStore();

  const totalItems = getTotalItems();
  const totalDiscounted = getTotalDiscounted();
  const totalOriginal = getTotalOriginal();
  const totalSavings = getTotalSavings();

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs transition-opacity" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-ivory shadow-2xl focus:outline-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-full bg-cherry text-ivory">
                <ShoppingBag className="size-4" />
              </div>
              <div>
                <Dialog.Title className="font-display text-xl tracking-tight text-ink">
                  Your Order Bag
                </Dialog.Title>
                <p className="text-xs text-cocoa">
                  {totalItems === 0
                    ? "Bag is empty"
                    : `${totalItems} ${totalItems === 1 ? "item" : "items"} selected`}
                </p>
              </div>
            </div>
            <Dialog.Close
              className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-cream text-ink hover:bg-line transition-colors"
              aria-label="Close cart"
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>

          {/* Prominent 10% OFF Notice */}
          <div className="bg-cherry px-5 py-2.5 text-ivory">
            <div className="flex items-center gap-2 text-xs font-medium">
              <Sparkles className="size-3.5 text-blush shrink-0" />
              <span>10% OFF automatically applied to every item on this menu.</span>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-cream text-cherry">
                  <ShoppingBag className="size-8 stroke-[1.5]" />
                </div>
                <h3 className="mt-4 font-display text-2xl text-ink">Your bag is empty</h3>
                <p className="mt-2 max-w-xs text-sm text-cocoa">
                  Add signature scoops or 12 oz ice cream shakes from our menu to start your order.
                </p>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-primary mt-6 text-sm"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-cocoa">
                  <span>Selected Flavours</span>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="hover:text-cherry underline underline-offset-2"
                  >
                    Clear all
                  </button>
                </div>

                <ul className="divide-y divide-line/70">
                  {items.map((item) => {
                    const originalLinePrice = item.product.originalPrice * item.quantity;
                    const discountedLinePrice = item.product.price * item.quantity;

                    return (
                      <li
                        key={`${item.product.id}-${item.serving}`}
                        className="flex gap-3.5 py-3.5"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.imageAlt}
                          className="size-16 shrink-0 rounded-lg object-cover"
                        />
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-display text-base font-semibold text-ink leading-snug">
                                {item.product.name}
                              </h4>
                              <button
                                type="button"
                                onClick={() => removeItem(item.product.id)}
                                className="text-cocoa hover:text-cherry p-1"
                                aria-label={`Remove ${item.product.name}`}
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                            <div className="mt-0.5 flex items-center gap-2 text-xs text-cocoa">
                              <span>{item.serving}</span>
                              <span>·</span>
                              <span className="rounded-full bg-cherry/10 px-1.5 py-0.2 text-[10px] font-semibold text-cherry">
                                10% OFF
                              </span>
                            </div>
                          </div>

                          <div className="mt-2.5 flex items-center justify-between">
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-display font-semibold text-cherry text-base">
                                {formatRs(discountedLinePrice)}
                              </span>
                              <span className="text-xs text-cocoa line-through">
                                {formatRs(originalLinePrice)}
                              </span>
                            </div>

                            {/* Quantity buttons */}
                            <div className="flex items-center rounded-full border border-line bg-cream px-1.5 py-0.5">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity - 1)
                                }
                                className="flex size-6 items-center justify-center rounded-full text-ink hover:bg-line/60"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="size-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-semibold text-ink">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity + 1)
                                }
                                className="flex size-6 items-center justify-center rounded-full text-ink hover:bg-line/60"
                                aria-label="Increase quantity"
                              >
                                <Plus className="size-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* Order Options */}
                <div className="rounded-xl border border-line bg-cream/60 p-4 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-cherry">
                    Order Details
                  </p>

                  <div className="grid grid-cols-3 gap-1.5">
                    {(
                      [
                        { id: "takeaway", label: "Takeaway" },
                        { id: "delivery", label: "Delivery" },
                        { id: "dine-in", label: "Dine-in" },
                      ] as const
                    ).map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setOrderType(t.id)}
                        className={`rounded-lg py-2 text-xs font-medium transition-colors ${
                          orderType === t.id
                            ? "bg-cherry text-ivory font-semibold shadow-xs"
                            : "border border-line bg-ivory text-ink hover:bg-cream"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2 pt-1 text-xs">
                    <div>
                      <label htmlFor="customer-name" className="block text-cocoa font-medium mb-1">
                        Your Name (Optional)
                      </label>
                      <input
                        id="customer-name"
                        type="text"
                        placeholder="e.g. Ali"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full rounded-lg border border-line bg-ivory px-3 py-1.5 text-xs text-ink placeholder:text-cocoa/50 focus:border-cherry focus:outline-hidden"
                      />
                    </div>

                    {orderType === "delivery" && (
                      <div>
                        <label htmlFor="customer-address" className="block text-cocoa font-medium mb-1">
                          Delivery Address (Johar Town area)
                        </label>
                        <input
                          id="customer-address"
                          type="text"
                          placeholder="e.g. House 42, Block G3, Johar Town"
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          className="w-full rounded-lg border border-line bg-ivory px-3 py-1.5 text-xs text-ink placeholder:text-cocoa/50 focus:border-cherry focus:outline-hidden"
                        />
                      </div>
                    )}

                    <div>
                      <label htmlFor="customer-notes" className="block text-cocoa font-medium mb-1">
                        Special Instructions (Optional)
                      </label>
                      <input
                        id="customer-notes"
                        type="text"
                        placeholder="e.g. Extra spoons, separate toppings"
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                        className="w-full rounded-lg border border-line bg-ivory px-3 py-1.5 text-xs text-ink placeholder:text-cocoa/50 focus:border-cherry focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1 text-[11px] text-cocoa">
                    <Clock className="size-3 text-cherry shrink-0" />
                    <span>Open daily 4 PM – 2 AM · Civic Centre, Johar Town</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer with Calculations and WhatsApp Button */}
          {items.length > 0 && (
            <div className="border-t border-line bg-cream/70 p-5 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-cocoa">
                  <span>Original Total:</span>
                  <span className="line-through">{formatRs(totalOriginal)}</span>
                </div>
                <div className="flex justify-between font-medium text-cherry">
                  <span className="flex items-center gap-1">
                    <span>10% Discount Applied:</span>
                  </span>
                  <span>- {formatRs(totalSavings)}</span>
                </div>
                <div className="flex items-baseline justify-between pt-1 border-t border-line font-display text-lg font-bold text-ink">
                  <span>Total to Pay:</span>
                  <span className="text-xl text-cherry">{formatRs(totalDiscounted)}</span>
                </div>
              </div>

              <p className="text-[11px] leading-relaxed text-cocoa/90">
                10% discount is already included in every item. No additional voucher required. Order is confirmed on WhatsApp.
              </p>

              <a
                href={getWhatsAppHref()}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Send Order on WhatsApp</span>
                <ArrowRight className="size-4" />
              </a>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
