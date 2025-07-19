"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/use-language";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setVisible(localStorage.getItem("cookiesAccepted") !== "true");
    }
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 text-white p-4 text-center text-sm z-[1000] shadow-lg flex flex-col md:flex-row items-center justify-center gap-2">
      <span>{t("cookieBannerText")} <a href="/cookies" className="text-blue-400 underline">{t("cookieBannerReadMore")}</a>.</span>
      <button
        className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
        onClick={() => {
          localStorage.setItem("cookiesAccepted", "true");
          setVisible(false);
        }}
      >
        {t("cookieBannerAccept")}
      </button>
    </div>
  );
} 