"use client";

import { useEffect, useState } from "react";
import { navIds } from "@/lib/extra";
import { useLang } from "./LanguageProvider";
import Logo from "./Logo";
import { CloseIcon, GlobeIcon, MenuIcon } from "./Icons";

const observed = ["home", "discover", "plans", "coaches", "contact"];

export default function Navbar() {
  const { t, lang, toggleLang } = useLang();
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    observed.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkCls = (id) =>
    `font-bold transition-colors ${
      active === id ? "text-brand" : "text-white/80 hover:text-white"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between gap-3 px-4">
        <Logo />

        <nav aria-label="main" className="hidden items-center gap-8 md:flex">
          {navIds.map((id) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined} className={`py-2 ${linkCls(id)}`}>
              {t.nav[id]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            dir="ltr"
            onClick={toggleLang}
            aria-label={t.langLabel}
            className="flex min-h-11 items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 ps-3 text-sm font-bold"
          >
            <GlobeIcon className="h-4 w-4 text-muted" />
            <span className={`rounded-full px-3 py-2 ${lang === "en" ? "bg-brand text-white" : "text-muted"}`}>EN</span>
            <span className={`rounded-full px-3 py-2 ${lang === "ar" ? "bg-brand text-white" : "text-muted"}`}>عربي</span>
          </button>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={t.nav.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="mobile" className="border-t border-white/10 bg-black/90 px-4 py-3 md:hidden">
          {navIds.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className={`flex min-h-12 items-center ${linkCls(id)}`}
            >
              {t.nav[id]}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}