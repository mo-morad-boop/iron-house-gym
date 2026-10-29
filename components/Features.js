"use client";

import { useLang } from "./LanguageProvider";

const p = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  className: "h-10 w-10 shrink-0 text-brand sm:h-12 sm:w-12",
};

const icons = {
  clock: (
    <svg {...p}>
      <circle cx="24" cy="24" r="16" />
      <path d="M24 14v10l7 4" />
    </svg>
  ),
  shield: (
    <svg {...p}>
      <path d="M24 6l14 5v11c0 9-6 15-14 20-8-5-14-11-14-20V11z" />
      <path d="M17 24l5 5 9-10" />
    </svg>
  ),
  trainer: (
    <svg {...p}>
      <circle cx="24" cy="15" r="7" />
      <path d="M10 41c0-8 6-13 14-13s14 5 14 13" />
    </svg>
  ),
  gym: (
    <svg {...p}>
      <path d="M6 18v12M12 14v20M36 14v20M42 18v12M12 24h24" />
    </svg>
  ),
};

export default function Features() {
  const { x } = useLang();
  return (
    <section aria-label="features" className="border-y border-white/10 bg-[#111114]">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
        {x.features.map((f) => (
          <li
            key={f.icon}
            className="flex items-center justify-center gap-3 px-4 py-6 md:border-s md:border-white/10 md:first:border-s-0"
          >
            {icons[f.icon]}
            <span className="text-sm font-bold leading-6 text-white/90 sm:text-base">
              {f.a}
              <br />
              {f.b}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}