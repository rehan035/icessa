import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/frenzee/home";
import { shop } from "@/data/menu";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "IceCreamShop",
  name: "Frenzee",
  telephone: shop.phoneTel,
  servesCuisine: "Ice cream",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop #16–33, Civic Centre, Block D2, Phase 1",
    addressLocality: "Johar Town, Lahore",
    addressCountry: "PK",
  },
  openingHours: "Mo-Su 16:00-02:00",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: shop.rating,
    reviewCount: String(shop.reviewCount),
    bestRating: "5",
  },
  sameAs: [shop.instagram],
};

export const Route = createFileRoute("/")({
  head: () => ({
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
  component: HomePage,
});
