"use client";

import React from "react";
import { useLanguage } from "@/hooks/use-language";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Cookie } from "lucide-react";

export default function PoliticaPrivacidad() {
  const { t } = useLanguage();

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 px-4">
      {/* Botones de navegación */}
      <div className="fixed top-8 left-8 flex flex-col gap-4 z-50">
        <Link href="/">
          <Button 
            variant="outline" 
            className="w-64 h-16 bg-white hover:bg-blue-50 border-3 border-blue-300 shadow-xl hover:shadow-2xl transition-all duration-300 group flex items-center gap-3 px-6 py-4 rounded-xl"
            style={{
              background: 'linear-gradient(to right, white, #f0f7ff)',
              boxShadow: '0 4px 14px 0 rgba(0, 118, 255, 0.2)',
            }}
          >
            <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
              <Home className="w-7 h-7 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
              {t("backToHome")}
            </span>
          </Button>
        </Link>
        <Link href="/cookies">
          <Button 
            variant="outline" 
            className="w-64 h-16 bg-white hover:bg-blue-50 border-3 border-blue-300 shadow-xl hover:shadow-2xl transition-all duration-300 group flex items-center gap-3 px-6 py-4 rounded-xl"
            style={{
              background: 'linear-gradient(to right, white, #f0f7ff)',
              boxShadow: '0 4px 14px 0 rgba(0, 118, 255, 0.2)',
            }}
          >
            <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
              <Cookie className="w-7 h-7 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
              {t("viewCookiePolicy")}
            </span>
          </Button>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
        <div className="flex flex-col items-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 text-blue-700">{t("privacyTitle")}</h1>
            <p className="text-base text-zinc-500 mb-2">{t("privacyLastUpdate")}</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 rounded-full mb-2" />
          </div>

          {/* Resto del contenido existente */}
          {/* Introducción */}
          <div className="mb-8">
            <p className="text-lg text-gray-700 dark:text-gray-300">{t("privacyIntro")}</p>
          </div>
          {/* Ámbito de Aplicación */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">{t("privacyScope")}</h2>
            <ul className="list-disc list-inside ml-4">
              <li>{t("privacyScopeItems.website")}</li>
              <li>{t("privacyScopeItems.plans")}</li>
              <li>{t("privacyScopeItems.design")}</li>
              <li>{t("privacyScopeItems.data")}</li>
            </ul>
          </div>
          {/* Cumplimiento Legal */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">{t("privacyCompliance")}</h2>
            <ul className="list-disc list-inside ml-4">
              <li>{t("privacyComplianceItems.gdpr")}</li>
              <li>{t("privacyComplianceItems.ccpa")}</li>
              <li>{t("privacyComplianceItems.uk")}</li>
              <li>{t("privacyComplianceItems.pipeda")}</li>
              <li>{t("privacyComplianceItems.colombia")}</li>
            </ul>
          </div>
          {/* Datos que Recopilamos */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">{t("privacyDataCollected")}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-zinc-300 dark:border-zinc-700 text-sm">
                <thead className="bg-zinc-100 dark:bg-zinc-800">
                  <tr>
                    <th className="border px-2 py-1">{t("privacyDataTable.category")}</th>
                    <th className="border px-2 py-1">{t("privacyDataTable.examples")}</th>
                    <th className="border px-2 py-1">{t("privacyDataTable.howCollected")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-2 py-1">{t("privacyDataTable.identifiers")}</td>
                    <td className="border px-2 py-1">{t("privacyDataTable.identifiersExamples")}</td>
                    <td className="border px-2 py-1">{t("privacyDataTable.identifiersHow")}</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">{t("privacyDataTable.billing")}</td>
                    <td className="border px-2 py-1">{t("privacyDataTable.billingExamples")}</td>
                    <td className="border px-2 py-1">{t("privacyDataTable.billingHow")}</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">{t("privacyDataTable.projectData")}</td>
                    <td className="border px-2 py-1">{t("privacyDataTable.projectDataExamples")}</td>
                    <td className="border px-2 py-1">{t("privacyDataTable.projectDataHow")}</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">{t("privacyDataTable.siteUsage")}</td>
                    <td className="border px-2 py-1">{t("privacyDataTable.siteUsageExamples")}</td>
                    <td className="border px-2 py-1">{t("privacyDataTable.siteUsageHow")}</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">{t("privacyDataTable.communications")}</td>
                    <td className="border px-2 py-1">{t("privacyDataTable.communicationsExamples")}</td>
                    <td className="border px-2 py-1">{t("privacyDataTable.communicationsHow")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
      </section>
      </div>
    </main>
  );
} 