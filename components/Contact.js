"use client";

import { config } from "@/lib/config";
import { mapsLink, socialLinks } from "@/lib/links";
import { useLang } from "./LanguageProvider";
import Reveal from "./Reveal";
import { FacebookIcon, InstagramIcon, PinIcon, WhatsAppIcon } from "./Icons";

export default function Contact() {
  const { t, x, lang } = useLang();
  const links = socialLinks();
  const address = config.contact.address[lang];

  const buttons = [
    { key: "whatsapp", label: t.contact.whatsapp, Icon: WhatsAppIcon, cls: "bg-green-700 hover:bg-green-600" },
    { key: "instagram", label: t.contact.instagram, Icon: InstagramIcon, cls: "bg-pink-700 hover:bg-pink-600" },
    { key: "facebook", label: t.contact.facebook, Icon: FacebookIcon, cls: "bg-blue-700 hover:bg-blue-600" },
  ];

  return (
    <section id="contact" className="bg-[radial-gradient(circle_at_50%_0%,rgba(225,29,42,0.12),transparent_60%)] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5">
        <Reveal className="text-center">
          <h2 className="text-3xl font-black leading-tight sm:text-5xl">{t.contact.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">{t.contact.desc}</p>
        </Reveal>

        <Reveal className="mt-10 grid gap-3 md:grid-cols-3">
          {buttons.map(({ key, label, Icon, cls }) => {
            const inner = (
              <>
                <Icon className="h-8 w-8 shrink-0" />
                <span className="flex flex-col text-start">
                  <span className="text-xl font-black">{label}</span>
                  {!links[key] && <span className="text-xs text-white/80">{t.contact.notSet}</span>}
                </span>
              </>
            );
            const common = `flex min-h-16 items-center gap-4 rounded-2xl px-5 py-4 transition ${cls}`;
            return links[key] ? (
              <a key={key} href={links[key]} target="_blank" rel="noopener noreferrer" className={common}>
                {inner}
              </a>
            ) : (
              <div key={key} aria-disabled="true" className={common}>
                {inner}
              </div>
            );
          })}
        </Reveal>

        <Reveal className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-card">
          {config.contact.mapEmbedUrl ? (
            <iframe
              src={config.contact.mapEmbedUrl}
              title={t.contact.addressTitle}
              loading="lazy"
              className="h-72 w-full border-0"
            />
          ) : (
            <div className="relative grid h-56 place-items-center bg-[#15151a] sm:h-72">
              <svg viewBox="0 0 400 200" className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <path d="M0 60 L400 40 M0 130 L400 150 M120 0 L100 200 M280 0 L300 200" stroke="#2a2a31" strokeWidth="3" fill="none" />
              </svg>
              <div className="relative flex flex-col items-center gap-2 px-4 text-center">
                <PinIcon className="h-12 w-12 text-brand" />
                <p className="text-sm text-muted">{t.contact.mapPlaceholder}</p>
              </div>
            </div>
          )}

          <div className="p-6">
            <p className="font-bold text-brand">{t.contact.addressTitle}</p>
            <p className="mt-2 text-lg">{address || x.addressPlaceholder}</p>
            <a
              href={mapsLink(address)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-12 items-center rounded-full bg-brand px-8 font-bold transition hover:bg-brand-hover"
            >
              {x.directions}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}