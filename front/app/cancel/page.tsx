"use client"

import { useState, useEffect } from "react"
import { Card } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import Link from "next/link"
import Header from "../../components/layout/header"
import Footer from "../../components/layout/footer"

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-white neutra-font">
      <Header currentPage="cancel" />
      <section className="w-full py-20 bg-gradient-to-b from-white via-red-50 to-gray-100">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Pago Cancelado</h1>
              <p className="text-gray-600 mb-6">
                Tu pago ha sido cancelado. No se ha realizado ningún cargo a tu cuenta.
              </p>
            </div>
            
            <div className="space-y-4">
              <Link href="/marketplace">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Volver al Marketplace
                </Button>
              </Link>
              
              <Link href="/contacto">
                <Button variant="outline" className="w-full">
                  ¿Necesitas ayuda? Contáctanos
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  )
}