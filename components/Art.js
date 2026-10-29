"use client";

import { useId } from "react";

const scenes = {
  bench: (
    <g stroke="#e11d2a" strokeWidth="1.5">
      <rect x="60" y="90" width="26" height="75" rx="6" fill="#16161a" />
      <rect x="84" y="150" width="200" height="16" rx="4" fill="#e11d2a" stroke="none" />
      <rect x="100" y="166" width="10" height="75" fill="#16161a" />
      <rect x="260" y="166" width="10" height="75" fill="#16161a" />
      <rect x="305" y="30" width="14" height="220" fill="#1a1a1f" stroke="none" />
      <rect x="345" y="30" width="14" height="220" fill="#1a1a1f" stroke="none" />
      {[50, 70, 90, 110, 130, 150].map((y, i) => (
        <rect key={y} x="320" y={y} width="24" height="12" fill={i === 1 ? "#e11d2a" : "#22222a"} stroke="none" />
      ))}
    </g>
  ),
  rack: (
    <g>
      {[70, 140, 210].map((y) => (
        <g key={y}>
          <rect x="15" y={y + 18} width="370" height="6" fill="#1b1b20" />
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i} transform={`translate(${34 + i * 44} ${y})`}>
              <rect x="0" y="4" width="8" height="14" rx="2" fill="#3a3a42" />
              <rect x="8" y="9" width="14" height="3" fill="#666" />
              <rect x="22" y="4" width="8" height="14" rx="2" fill={i % 3 === 0 ? "#e11d2a" : "#3a3a42"} />
            </g>
          ))}
        </g>
      ))}
    </g>
  ),
  cardio: (
    <g>
      {[
        [30, 150, 0.8],
        [140, 110, 1],
        [270, 150, 0.8],
      ].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M0 120 L100 120 L120 95 L20 95 Z" fill="#1a1a1f" stroke="#e11d2a" strokeWidth="1.5" />
          <rect x="88" y="10" width="6" height="90" fill="#22222a" />
          <rect x="66" y="0" width="52" height="24" rx="3" fill="#15151a" stroke="#e11d2a" />
        </g>
      ))}
      <ellipse cx="200" cy="275" rx="170" ry="9" fill="#e11d2a" opacity=".15" />
    </g>
  ),
  barbell: (
    <g>
      <rect x="25" y="68" width="350" height="8" rx="4" fill="#bdbdc4" />
      {[36, 50, 338, 352].map((x) => (
        <rect key={x} x={x} y="45" width="11" height="54" rx="2" fill="#1b1b20" stroke="#e11d2a" />
      ))}
      <rect x="85" y="40" width="10" height="220" fill="#16161a" />
      <rect x="305" y="40" width="10" height="220" fill="#16161a" />
      <rect x="120" y="185" width="160" height="22" rx="10" fill="#0f0f12" stroke="#e11d2a" strokeWidth="1.5" />
      <rect x="190" y="207" width="20" height="55" fill="#16161a" />
    </g>
  ),
  hall: (
    <g stroke="#e11d2a" strokeWidth="1.5" fill="none" opacity=".9">
      <path d="M0 0 L140 110 M400 0 L260 110 M200 0 V110" />
      <rect x="140" y="110" width="120" height="70" fill="#4a0a10" stroke="none" />
      <path d="M140 180 L0 300 M260 180 L400 300" />
    </g>
  ),
  athlete: (
    <g>
      <rect x="60" y="30" width="280" height="8" rx="4" fill="#bdbdc4" />
      <circle cx="200" cy="140" r="28" fill="#0b0b0d" />
      <path d="M150 300 L160 190 Q200 170 240 190 L250 300Z" fill="#0b0b0d" />
      <path d="M165 195 L120 40 M235 195 L280 40" stroke="#0b0b0d" strokeWidth="18" strokeLinecap="round" />
    </g>
  ),
  coach: (
    <g>
      <path d="M50 500 Q60 360 200 340 Q340 360 350 500Z" fill="#0b0b0d" stroke="#e11d2a" strokeWidth="2" />
      <rect x="170" y="270" width="60" height="80" rx="12" fill="#2a2523" />
      <ellipse cx="200" cy="210" rx="62" ry="78" fill="#3a2f2b" />
      <path d="M138 200 Q140 120 200 118 Q262 120 262 200 Q240 150 200 150 Q160 150 138 200Z" fill="#0b0b0d" />
    </g>
  ),
};

export default function Art({ kind = "hall", className = "", alt = "" }) {
  const id = "g" + useId().replace(/:/g, "");
  const portrait = kind === "coach";
  const h = portrait ? 500 : 300;
  return (
    <svg
      viewBox={`0 0 400 ${h}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <defs>
        <radialGradient id={id} cx="50%" cy="45%" r="75%">
          <stop offset="0" stopColor="#7a0f18" />
          <stop offset="1" stopColor="#0a0a0b" />
        </radialGradient>
      </defs>
      <rect width="400" height={h} fill={`url(#${id})`} />
      {scenes[kind]}
    </svg>
  );
}