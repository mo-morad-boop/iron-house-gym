"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { translations } from "@/lib/translations";
import { extra } from "@/lib/extra";

const LanguageContext = createContext(null);

const subscribe = (cb) => {
  window.addEventListener("langchange", cb);
  return () => window.removeEventListener("langchange", cb);
};
const getSnapshot = () =>
  localStorage.getItem("lang") === "en" ? "en" : "ar";
const getServerSnapshot = () => "ar";

export function LanguageProvider({ children }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const toggleLang = () => {
    localStorage.setItem("lang", lang === "ar" ? "en" : "ar");
    window.dispatchEvent(new Event("langchange"));
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        toggleLang,
        t: translations[lang],
        x: extra[lang],
        isRTL: lang === "ar",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);