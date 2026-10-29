"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { config } from "@/lib/config";
import { useLang } from "./LanguageProvider";
import SmartImage from "./SmartImage";
import Reveal from "./Reveal";
import { ChevronIcon, CloseIcon } from "./Icons";

const kinds = ["hall", "bench", "rack", "cardio", "barbell", "hall", "athlete"];
const kindOf = (i) => kinds[i % kinds.length];

function Lightbox({ start, onClose }) {
  const { t, x, isRTL } = useLang();
  const items = config.images.gallery;
  const total = items.length;
  const [index, setIndex] = useState(start);
  const closeRef = useRef(null);
  const touchX = useRef(null);

  const go = useCallback((d) => setIndex((i) => (i + d + total) % total), [total]);

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
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(isRTL ? -1 : 1);
      if (e.key === "ArrowLeft") go(isRTL ? 1 : -1);
      if (e.key === "Home") setIndex(0);
      if (e.key === "End") setIndex(total - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, isRTL, onClose, total]);

  useEffect(() => {
    document
      .getElementById(`thumb-${index}`)
      ?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [index]);

  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 50) return;
    const next = isRTL ? dx > 0 : dx < 0;
    go(next ? 1 : -1);
  };

  const navBtn =
    "absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-black/60 backdrop-blur transition hover:bg-brand";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={x.galleryTitle}
      className="fixed inset-0 z-[60] flex flex-col bg-black/95"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <p className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold" dir="ltr">
          {index + 1} / {total}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t.discover.lightbox.close}
          className="grid h-12 w-12 place-items-center rounded-full bg-white/10 transition hover:bg-brand"
        >
          <CloseIcon />
        </button>
      </div>

      <div
        className="relative mx-auto min-h-0 w-full max-w-6xl flex-1 px-4"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        <div key={index} className="fade-in h-full w-full">
          <SmartImage
            src={items[index]}
            kind={kindOf(index)}
            alt={`${x.galleryTitle} ${index + 1}`}
            className="h-full w-full rounded-2xl object-contain"
          />
        </div>
        <button type="button" onClick={() => go(-1)} aria-label={t.discover.lightbox.prev} className={`${navBtn} start-6`}>
          <ChevronIcon dir="prev" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label={t.discover.lightbox.next} className={`${navBtn} end-6`}>
          <ChevronIcon dir="next" />
        </button>
      </div>

      <div className="mx-auto w-full max-w-6xl overflow-x-auto px-4 py-4">
        <div className="flex w-max gap-2" dir="ltr">
          {items.map((src, i) => (
            <button
              key={i}
              id={`thumb-${i}`}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${x.galleryTitle} ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                i === index ? "border-brand opacity-100" : "border-transparent opacity-50 hover:opacity-90"
              }`}
            >
              <SmartImage src={src} kind={kindOf(i)} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Discover() {
  const { x } = useLang();
  const items = config.images.gallery;
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const extraCount = Math.max(items.length - 3, 0);

  return (
    <section id="discover" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-label={`${x.galleryTitle} - ${x.viewPhotos}`}
            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-card text-start sm:aspect-[21/9]"
          >
            <SmartImage
              src={items[0]}
              kind={kindOf(0)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(225,29,42,0.30),transparent_55%)]" />

            <span className="absolute end-4 top-4 flex items-center sm:end-6 sm:top-6">
              {items.slice(1, 4).map((src, i) => (
                <span
                  key={i}
                  className={`h-14 w-14 overflow-hidden rounded-xl border-2 border-white/30 shadow-lg sm:h-20 sm:w-20 ${i > 0 ? "-ms-5" : ""}`}
                >
                  <SmartImage src={src} kind={kindOf(i + 1)} alt="" className="h-full w-full object-cover" />
                </span>
              ))}
              {extraCount > 0 && (
                <span className="-ms-5 grid h-14 w-14 place-items-center rounded-xl border-2 border-white/30 bg-brand text-sm font-black sm:h-20 sm:w-20 sm:text-lg" dir="ltr">
                  +{extraCount}
                </span>
              )}
            </span>

            <span className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 sm:p-8">
              <span>
                <span className="block text-2xl font-black sm:text-4xl">{x.galleryTitle}</span>
                <span className="mt-1 block text-sm text-white/70">
                  {items.length} {x.photosWord}
                </span>
              </span>
              <span className="inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-7 font-bold shadow-[0_0_30px_rgba(225,29,42,0.4)] transition group-hover:bg-brand-hover">
                {x.viewPhotos}
                <ChevronIcon dir="next" className="h-4 w-4" />
              </span>
            </span>
          </button>
        </Reveal>
      </div>

      {open && <Lightbox start={0} onClose={close} />}
    </section>
  );
}