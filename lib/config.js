// lib/config.js
export const config = {
  brand: {
    name: "IRON HOUSE",
    highlight: "HOUSE",
    sub: "GYM",
    copyrightYear: 2026,
  },

  contact: {
    whatsappNumber: "201014076436",
    instagram:
      "https://www.instagram.com/mohamed_morad____?vrfl=ampocHJ6M2pzYjF6&utm_source=qr",
    facebook: "https://www.facebook.com/share/1Fq53VriMB/?mibextid=wwXIfr",
    address: { ar: "", en: "" },
    mapEmbedUrl: "",
  },

  currency: { ar: "جنيه", en: "EGP" },
  pricesAreDemo: false,
  recommendedPlanId: "six-months",
  plans: [
    { id: "one-month", price: 400, months: 1 },
    { id: "two-months", price: 700, months: 2 },
    { id: "four-months", price: 1300, months: 4 },
    { id: "six-months", price: 2000, months: 6 },
    { id: "one-year", price: 3500, months: 12 },
  ],

  coach: {
    photo: "/images/hero-athlete.jpg",
    bio: {
      ar: "أنا كابتن محمد مراد، مهتم بمجال اللياقة البدنية وتطوير الأداء الرياضي. أؤمن بأن الاستمرارية والتدريب المنظم والالتزام بالعادات الصحية هي أساس التقدم. هدفي هو مساعدة المتدربين على العمل نحو أهدافهم وتحسين أدائهم خطوة بخطوة.",
      en: "I'm Coach Mohamed Mourad, passionate about fitness and athletic performance. I believe consistency, structured training and healthy habits are the foundation of progress. My goal is to help trainees work toward their goals and improve their performance, step by step.",
    },
  },

  images: {
    hero: ["/images/hero-athlete.jpg"],
    gallery: [
      "/images/gallery-1.jpg",
      "/images/gallery-2.jpg",
      "/images/gallery-3.jpg",
      "/images/gallery-4.jpg",
      "/images/gallery-5.jpg",
      "/images/gallery-6.jpg",
      "/images/gallery-7.jpg",
    ],
    transformations: [
      { before: "/images/before-1.jpg", after: "/images/after-1.jpg" },
      { before: "/images/before-2.jpg", after: "/images/after-2.jpg" },
      { before: "/images/before-3.jpg", after: "/images/after-3.jpg" },
    ],
  },
};