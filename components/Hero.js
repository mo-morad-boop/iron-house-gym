"use client";

import { useLang } from "./LanguageProvider";
import SmartImage from "./SmartImage";

export default function Hero() {
  const { t } = useLang();

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-14 pt-28"
    >
      <div className="absolute inset-0 -z-10 bg-bg">
        <div className="hero-bg absolute inset-0">
          <SmartImage
            src="/images/hero-athlete.jpg"
            kind="athlete"
            alt={t.hero.alts[0]}
            eager
            className="h-full w-full object-cover object-[50%_20%] opacity-60"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(225,29,42,0.30),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand/10 to-transparent mix-blend-multiply" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-2 text-sm font-bold text-brand">
          <span className="h-2 w-2 rounded-full bg-brand" />
          {t.hero.badge}
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.25] sm:text-6xl lg:text-7xl">
          {t.hero.titleStart}
          <br />
          <span className="text-brand">{t.hero.titleHighlight}</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">{t.hero.desc}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#discover"
            className="inline-flex min-h-12 items-center rounded-full bg-brand px-8 font-bold shadow-[0_0_30px_rgba(225,29,42,0.4)] transition hover:bg-brand-hover"
          >
            {t.hero.ctaDiscover}
          </a>
          <a
            href="#plans"
            className="inline-flex min-h-12 items-center rounded-full border border-white/70 px-8 font-bold transition hover:border-brand hover:text-brand"
          >
            {t.hero.ctaPlans}
          </a>
        </div>
      </div>
    </section>
  );
}