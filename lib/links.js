import { config } from "@/lib/config";

const digits = (s) => (s || "").replace(/\D/g, "");

// رابط واتساب. لو الرقم فاضي بيفتح واتساب من غير رقم (تجريبي).
export const waLink = (text = "") =>
  `https://wa.me/${digits(config.contact.whatsappNumber)}${
    text ? `?text=${encodeURIComponent(text)}` : ""
  }`;

export const socialLinks = () => ({
  whatsapp: digits(config.contact.whatsappNumber) ? waLink() : "",
  instagram: config.contact.instagram || "",
  facebook: config.contact.facebook || "",
});

export const mapsLink = (address) =>
  address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    : "https://www.google.com/maps";