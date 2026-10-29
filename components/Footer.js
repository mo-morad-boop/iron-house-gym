"use client";

import { config } from "@/lib/config";
import { navIds } from "@/lib/extra";
import { socialLinks } from "@/lib/links";
import { useLang } from "./LanguageProvider";
import Logo from "./Logo";
import { ArrowUpIcon, FacebookIcon, InstagramIcon, WhatsAppIcon } from "./Icons";

export default function Footer() {
  const { t, x, lang } = useLang();
  const links = socialLinks();
  const address = config.contact.address[lang];
  const number = config.contact.whatsappNumber;

  const social = [
    { label: t.contact.whatsapp, Icon: WhatsAppIcon, url: links.whatsapp },
    { label: t.contact.instagram, Icon: InstagramIcon, url: links.instagram },
    { label: t.contact.facebook, Icon: FacebookIcon, url: links.facebook },
  ];

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 text-muted">{t.footer.tagline}</p>
          <div className="mt-5 flex gap-3">
            {social.map(({ label, Icon, url }) => (
              <a
                key={label}
                href={url || "#contact"}
                {...(url ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition hover:border-brand hover:text-brand"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="footer">
          <h3 className="text-xl font-black">{t.footer.sections}</h3>
          <ul className="mt-4 space-y-1">
            {navIds.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="inline-flex min-h-11 items-center text-muted transition hover:text-white">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xl font-black">{x.footerContact}</h3>
          <p className="mt-4 text-muted">{address || x.addressPlaceholder}</p>
          <p className="mt-3 text-muted" dir="ltr">
            {number ? `+${number.replace(/\D/g, "")}` : t.contact.notSet}
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-white/10 px-5 py-6">
        <p className="text-sm text-muted">
          © {config.brand.copyrightYear} {config.brand.name} {config.brand.sub}. {t.footer.rights}
        </p>
        <button
          type="button"
          onClick={toTop}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 font-bold transition hover:border-brand hover:text-brand"
        >
          <ArrowUpIcon className="h-4 w-4" />
          {t.footer.backToTop}
        </button>
      </div>
    </footer>
  );
}