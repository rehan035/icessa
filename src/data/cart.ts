import { create } from "zustand";
import { persist } from "zustand/middleware";
import { formatRs, Product, shop } from "./menu";

export type ServingOption = "Waffle Cone" | "Paper Cup" | "12 oz Cup";

export interface CartItem {
  product: Product;
  quantity: number;
  serving: ServingOption;
  notes?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  orderType: "takeaway" | "delivery" | "dine-in";
  customerName: string;
  customerAddress: string;
  customerNotes: string;
  setIsOpen: (open: boolean) => void;
  setOrderType: (type: "takeaway" | "delivery" | "dine-in") => void;
  setCustomerName: (name: string) => void;
  setCustomerAddress: (address: string) => void;
  setCustomerNotes: (notes: string) => void;
  addItem: (product: Product, serving?: ServingOption, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalDiscounted: () => number;
  getTotalOriginal: () => number;
  getTotalSavings: () => number;
  getWhatsAppHref: () => string;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      orderType: "takeaway",
      customerName: "",
      customerAddress: "",
      customerNotes: "",

      setIsOpen: (isOpen) => set({ isOpen }),
      setOrderType: (orderType) => set({ orderType }),
      setCustomerName: (customerName) => set({ customerName }),
      setCustomerAddress: (customerAddress) => set({ customerAddress }),
      setCustomerNotes: (customerNotes) => set({ customerNotes }),

      addItem: (product, serving, quantity = 1) => {
        const defaultServing: ServingOption = product.group.includes("shake")
          ? "12 oz Cup"
          : "Waffle Cone";
        const selectedServing = serving || defaultServing;

        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product.id === product.id && item.serving === selectedServing
          );
          if (existingIndex > -1) {
            const newItems = [...state.items];
            newItems[existingIndex].quantity += quantity;
            return { items: newItems, isOpen: true };
          }
          return {
            items: [
              ...state.items,
              { product, serving: selectedServing, quantity },
            ],
            isOpen: true,
          };
        });
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => item.product.id !== productId),
            };
          }
          return {
            items: state.items.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            ),
          };
        }),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getTotalDiscounted: () => {
        return get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
      },

      getTotalOriginal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.product.originalPrice * item.quantity,
          0
        );
      },

      getTotalSavings: () => {
        const original = get().getTotalOriginal();
        const discounted = get().getTotalDiscounted();
        return Math.max(0, original - discounted);
      },

      getWhatsAppHref: () => {
        const { items, orderType, customerName, customerAddress, customerNotes } = get();
        if (items.length === 0) {
          return `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(
            "Hello Frenzee, I would like to place an order. Please share what flavours are available today!"
          )}`;
        }

        const lines: string[] = [
          "🍨 *ORDER FOR FRENZEE (JOHAR TOWN)* 🍨",
          "──────────────────────────",
        ];

        items.forEach((item, index) => {
          const itemOriginalTotal = item.product.originalPrice * item.quantity;
          const itemDiscountedTotal = item.product.price * item.quantity;
          lines.push(
            `${index + 1}. *${item.quantity}x ${item.product.name}*`,
            `   • Type: ${item.product.groupLabel} (${item.serving})`,
            `   • Price: ${formatRs(itemDiscountedTotal)} ~${formatRs(itemOriginalTotal)}~ [10% OFF]`
          );
        });

        const totalOriginal = get().getTotalOriginal();
        const totalDiscounted = get().getTotalDiscounted();
        const totalSavings = get().getTotalSavings();

        lines.push("──────────────────────────");
        lines.push(`💰 *Total Amount:* ${formatRs(totalDiscounted)}`);
        lines.push(`🏷️ *Original Value:* ~${formatRs(totalOriginal)}~`);
        lines.push(`🎉 *10% Discount Applied:* Save ${formatRs(totalSavings)}`);
        lines.push(`_(10% OFF automatically included in all menu prices)_`);
        lines.push("──────────────────────────");

        const typeLabels: Record<string, string> = {
          takeaway: "Takeaway Pickup (Civic Centre)",
          delivery: "Delivery in Johar Town",
          "dine-in": "Dine-in at Counter",
        };
        lines.push(`📦 *Order Type:* ${typeLabels[orderType] || orderType}`);

        if (customerName.trim()) {
          lines.push(`👤 *Name:* ${customerName.trim()}`);
        }
        if (orderType === "delivery" && customerAddress.trim()) {
          lines.push(`📍 *Delivery Address:* ${customerAddress.trim()}`);
        }
        if (customerNotes.trim()) {
          lines.push(`📝 *Special Instructions:* ${customerNotes.trim()}`);
        }

        lines.push("");
        lines.push("Please confirm availability and preparation time. Thank you!");

        return `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(
          lines.join("\n")
        )}`;
      },
    }),
    {
      name: "frenzee-cart-storage",
      partialize: (state) => ({
        items: state.items,
        orderType: state.orderType,
        customerName: state.customerName,
        customerAddress: state.customerAddress,
      }),
    }
  )
);
