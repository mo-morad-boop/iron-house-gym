"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { config } from "@/lib/config";
import { useLang } from "./LanguageProvider";
import SmartImage from "./SmartImage";
import SectionHeading from "./SectionHeading";
import BeforeAfter from "./BeforeAfter";
import Reveal from "./Reveal";
import { CloseIcon } from "./Icons";

function Zoom({ pair, index, onClose }) {
  const { t } = useLang();
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.coaches.zoom}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4"
    >
      <button
        ref={ref}
        type="button"
        onClick={onClose}
        aria-label={t.coaches.close}
        className="absolute end-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 hover:bg-brand"
      >
        <CloseIcon />
      </button>
      <div onClick={(e) => e.stopPropagation()} dir="ltr" className="grid w-full max-w-4xl grid-cols-2 gap-3">
        {[
          [pair.before, "hall", t.coaches.before],
          [pair.after, "athlete", t.coaches.after],
        ].map(([src, kind, label]) => (
          <figure key={label} className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
            <SmartImage src={src} kind={kind} alt={`${label} ${index + 1}`} className="h-full w-full object-cover" />
            <figcaption className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-sm font-bold">
              {label}
            </figcaption>
          </figure>
        ))}
        <p className="col-span-2 text-center text-sm text-muted">{t.coaches.demoLabel}</p>
      </div>
    </div>
  );
}

function CoachModal({ onClose }) {
  const { t, x, lang } = useLang();
  const [zoom, setZoom] = useState(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const opener = document.activeElement;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && zoom === null && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom, onClose]);

  const pairs = config.images.transformations;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.coaches.name}
      onClick={onClose}
      className="fixed inset-0 z-[60] overflow-y-auto bg-black/90 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto my-6 max-w-4xl rounded-3xl border border-white/10 bg-card p-5 sm:p-8"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t.coaches.close}
          className="absolute end-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 hover:bg-brand"
        >
          <CloseIcon />
        </button>

        <div className="grid gap-6 md:grid-cols-[280px_1fr] md:items-center">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
            <SmartImage src={config.coach.photo} kind="coach" alt={t.coaches.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="font-bold text-brand">{t.coaches.role}</p>
            <h3 className="mt-2 text-3xl font-black sm:text-4xl">{t.coaches.name}</h3>
            {lang === "ar" && (
              <p className="mt-1 font-display tracking-widest text-muted" dir="ltr">
                {x.coachNameEn}
              </p>
            )}
            <p className="mt-5 leading-8 text-white/85">{config.coach.bio[lang]}</p>
          </div>
        </div>

        <h4 className="mb-4 mt-10 text-2xl font-black">{t.coaches.storiesTitle}</h4>
        <div className="grid gap-4 sm:grid-cols-3">
          {pairs.map((pair, i) => (
            <BeforeAfter key={i} pair={pair} index={i} onZoom={setZoom} />
          ))}
        </div>
      </div>

      {zoom !== null && <Zoom pair={pairs[zoom]} index={zoom} onClose={() => setZoom(null)} />}
    </div>
  );
}

export default function Coach() {
  const { t, x, lang } = useLang();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <section id="coaches" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading title={x.coachTitle} />

        <Reveal>
          <article className="mx-auto max-w-md overflow-hidden rounded-3xl border border-white/10 bg-card">
            <div className="aspect-[4/5]">
              <SmartImage src={config.coach.photo} kind="coach" alt={t.coaches.name} className="h-full w-full object-cover" />
            </div>
            <div className="p-6">
              <p className="font-bold text-brand">{t.coaches.role}</p>
              <h3 className="mt-2 text-3xl font-black">{t.coaches.name}</h3>
              {lang === "ar" && (
                <p className="mt-1 font-display tracking-widest text-muted" dir="ltr">
                  {x.coachNameEn}
                </p>
              )}
              <p className="mt-4 line-clamp-3 leading-8 text-white/80">{config.coach.bio[lang]}</p>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
                className="mt-6 min-h-12 rounded-full bg-brand px-8 font-bold transition hover:bg-brand-hover"
              >
                {t.coaches.learnMore}
              </button>
            </div>
          </article>
        </Reveal>
      </div>

      {open && <CoachModal onClose={close} />}
    </section>
  );
}