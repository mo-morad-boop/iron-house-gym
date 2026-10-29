"use client";

import { useState } from "react";
import Art from "./Art";

// لو الصورة مش موجودة، يعرض رسمة مؤقتة بدل صورة مكسورة.
export default function SmartImage({ src, kind, alt = "", className = "", eager = false }) {
  const [failed, setFailed] = useState(!src);

  if (failed) return <Art kind={kind} alt={alt} className={className} />;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      className={className}
      onError={() => setFailed(true)}
      ref={(el) => {
        if (el && el.complete && el.naturalWidth === 0) setFailed(true);
      }}
    />
  );
}