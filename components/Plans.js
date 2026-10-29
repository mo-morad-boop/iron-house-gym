"use client";

import { config } from "@/lib/config";
import { waLink } from "@/lib/links";
import { useLang } from "./LanguageProvider";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { UnlimitedIcon } from "./Icons";

export default function Plans() {
  const { t, lang } = useLang();

  const message = (plan) =>
    t.plans.whatsappMessage
      .replace("{plan}", t.plans.items[plan.id].name)
      .replace("{duration}", t.plans.items[plan.id].duration);

  return (
    <section id="plans" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading title={t.plans.title} center />

        <Reveal>
          <ul className="grid gap-5 pt-4 sm:grid-cols-2 lg:grid-cols-5">
            {config.plans.map((plan) => {
              const item = t.plans.items[plan.id];
              const rec = config.recommendedPlanId === plan.id;
              return (
                <li
                  key={plan.id}
                  className={`relative flex flex-col items-center rounded-3xl border-2 p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-brand ${
                    rec
                      ? "border-brand/70 bg-gradient-to-b from-brand/20 to-card shadow-[0_0_40px_rgba(225,29,42,0.3)]"
                      : "border-white/10 bg-card"
                  }`}
                >
                  {rec && (
                    <span className="absolute -top-3 start-4 rounded-full bg-brand px-4 py-1 text-sm font-bold">
                      {t.plans.recommended}
                    </span>
                  )}

                  <h3 className="mt-2 text-xl font-black">{item.name}</h3>
                  <p className="mt-2 text-sm text-muted">{item.duration}</p>

                  <p className="mt-5 flex items-baseline gap-2">
                    <span className="text-5xl font-black">{plan.price}</span>
                    <span className="text-muted">{config.currency[lang]}</span>
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-2 text-sm font-bold">
                    {t.plans.unlimited}
                    <UnlimitedIcon className="h-4 w-4 text-brand" />
                  </span>

                  <a
                    href={waLink(message(plan))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand px-4 font-bold transition hover:bg-brand-hover"
                    style={{ marginTop: "1.5rem" }}
                  >
                    {t.plans.subscribe}
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}