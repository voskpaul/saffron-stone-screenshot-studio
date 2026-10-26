/**
 * Central site configuration for the Saffron & Stone demo project.
 * All contact details are clearly fictional sample data.
 */
export const site = {
  name: "Saffron & Stone",
  tagline: "Contemporary African dining in Nairobi",
  description:
    "A fictional Nairobi restaurant concept — thoughtfully prepared dishes, vibrant flavors, and a warm dining experience made for sharing.",
  location: {
    area: "Kilimani",
    city: "Nairobi",
    country: "Kenya",
    addressLine: "42 Jacaranda Lane",
    note: "Fictional sample address for this portfolio project",
  },
  phone: "+254 700 000 000",
  phoneNote: "Demo number — not a real line",
  email: "hello@saffronstone.demo",
  emailNote: "Fictional demo address",
  /**
   * WhatsApp destination in international format without "+".
   * Replace with a real number (e.g. "2547XXXXXXXX") to activate the CTA,
   * or set to null to show a demo notice instead of a broken link.
   */
  whatsappNumber: "254700000000" as string | null,
  demoNotice:
    "Saffron & Stone is a fictional restaurant created for this portfolio project. Prices, menu items and contact details are sample content only.",
} as const;

export const whatsappHref = (message?: string) => {
  if (!site.whatsappNumber) return null;
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello Saffron & Stone, I'd like to enquire about your menu and table availability.";

export const formatKsh = (price: number) => `KSh ${price.toLocaleString("en-KE")}`;
