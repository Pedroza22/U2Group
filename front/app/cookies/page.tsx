"use client";

import React from "react";
import { useLanguage } from "@/hooks/use-language";

export default function PoliticaCookies() {
  const { t } = useLanguage();

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 py-16 px-2">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl animate-pulse" style={{zIndex:0}} />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-2xl animate-pulse" style={{zIndex:0}} />
      </div>
      <section className="relative z-10 w-full max-w-2xl bg-white/90 dark:bg-zinc-900/90 rounded-3xl shadow-2xl p-8 md:p-12 border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-yellow-400 text-white rounded-full p-4 shadow-lg mb-4 animate-bounce">
            <span className="text-4xl">🍪</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 tracking-tight text-yellow-600 dark:text-yellow-300 drop-shadow-lg">{t("cookiesTitle")}</h1>
          <p className="text-base text-zinc-500 dark:text-zinc-300 mb-2">{t("cookiesLastUpdate")}</p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 rounded-full mb-2" />
        </div>
        <h2 className="text-xl font-semibold mb-2">{t("cookiesWhatAre")}</h2>
        <p className="mb-4">{t("cookiesWhatAreDesc")}</p>
        <h2 className="text-xl font-semibold mb-2">{t("cookiesTypes")}</h2>
        <ul className="list-disc ml-6 mb-4">
          <li><b>{t("cookiesFunctional")}:</b> {t("cookiesFunctionalDesc")}</li>
          <li><b>{t("cookiesAnalytics")}:</b> {t("cookiesAnalyticsDesc")}</li>
          <li><b>{t("cookiesAds")}:</b> {t("cookiesAdsDesc")}</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">{t("cookiesDataCollected")}</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>{t("cookiesDataIP")}</li>
          <li>{t("cookiesDataPages")}</li>
          <li>{t("cookiesDataPrefs")}</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">{t("cookiesConsent")}</h2>
        <p className="mb-4">{t("cookiesConsentDesc")}</p>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={() => {
            localStorage.removeItem('cookiesAccepted');
            window.location.reload();
          }}
        >
          {t("cookiesRevokeConsent")}
        </button>
        <h2 className="text-xl font-semibold mb-2">{t("cookiesMoreInfo")}</h2>
        <p>{t("cookiesMoreInfoDesc")} <a href="/privacidad" className="text-blue-600 underline">{t("cookiesPrivacyPolicy")}</a> {t("cookiesOrWriteUs")} <a href="mailto:contact@u2.group" className="text-blue-600 underline">contact@u2.group</a>.</p>
      </section>
    </main>
  );
} 