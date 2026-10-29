"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";
import SmartImage from "./SmartImage";
import { ExpandIcon } from "./Icons";

export default function BeforeAfter({ pair, index, onZoom }) {
  const { t } = useLang();
  const [pos, setPos] = useState(50);

  return (
    <figure className="overflow-hidden rounded-2xl border border-white/10 bg-card">
      <div dir="ltr" className="relative aspect-[4/5] select-none overflow-hidden">
        <SmartImage
          src={pair.after}
          kind="athlete"
          alt={`${t.coaches.after} ${index + 1}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <SmartImage
            src={pair.before}
            kind="hall"
            alt={`${t.coaches.before} ${index + 1}`}
            className="h-full w-full object-cover"
          />
        </div>

        <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-bold">
          {t.coaches.before}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-bold">
          {t.coaches.after}
        </span>

        <input
          type="range"
          min="0"
          max="100"
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={t.coaches.slider}
          style={{ touchAction: "pan-y" }}
          className="peer absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute top-1/2 grid h-10 w-10 -translate-x-[45%] -translate-y-1/2 place-items-center rounded-full bg-white text-sm font-black text-black peer-focus-visible:ring-4">
            ⇆
          </span>
        </div>

        <span className="pointer-events-none absolute inset-x-2 bottom-2 rounded-lg bg-black/75 px-2 py-1 text-center text-xs">
          {t.coaches.demoLabel}
        </span>
      </div>

      <figcaption className="p-3">
        <button
          type="button"
          onClick={() => onZoom(index)}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-white/20 font-bold transition hover:border-brand hover:text-brand"
        >
          <ExpandIcon className="h-4 w-4" />
          {t.coaches.zoom}
        </button>
      </figcaption>
    </figure>
  );
}