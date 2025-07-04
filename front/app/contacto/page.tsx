"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useLanguage } from "@/hooks/use-language"

export default function ContactoPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectLocation: "",
    timeline: "",
    comments: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Aquí iría la lógica de envío del formulario
  }

  return (
    <div className="min-h-screen bg-gray-50 neutra-font">
      <Header currentPage="contacto" />

      {/* HERO SECTION */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl neutra-font-black mb-4">{t("Contact Us") || "Contáctanos"}</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto neutra-font">
              {t("contactSubtitle") ||
                "Estamos aquí para ayudarte a convertir tu visión en realidad. Cuéntanos sobre tu proyecto."}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* INFORMACIÓN DE CONTACTO */}
          <div>
            <h2 className="text-3xl neutra-font-bold text-gray-900 mb-8">{t("Get in Touch") || "Ponte en Contacto"}</h2>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg neutra-font-bold text-gray-900 mb-1">{t("email") || "Email"}</h3>
                  <p className="text-gray-600 neutra-font">hello@u2group.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg neutra-font-bold text-gray-900 mb-1">{t("phone") || "Teléfono"}</h3>
                  <p className="text-gray-600 neutra-font">+3043001791</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg neutra-font-bold text-gray-900 mb-1">{t("Office") || "Oficina"}</h3>
                  <p className="text-gray-600 neutra-font">Pasto, Colombia</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl neutra-font-bold text-gray-900 mb-4">
                {t("Why Choose Us") || "¿Por qué elegirnos?"}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-700 neutra-font">{t("Más de 4 años de experiencia") || "Más de 4 años de experiencia"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-700 neutra-font">{t("Diseños personalizados y únicos") || "Diseños personalizados y únicos"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-700 neutra-font">{t("Equipo profesional y dedicado") || "Equipo profesional y dedicado"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span className="text-gray-700 neutra-font">{t("Respuesta en 24 horas") || "Respuesta en 24 horas"}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* FORMULARIO DE CONTACTO */}
          <div>
            <Card className="p-8 shadow-lg">
              <h3 className="text-2xl neutra-font-bold text-gray-900 mb-6">
                {t("Contact Information") || "Información de Contacto"}
              </h3>
              <p className="text-gray-600 neutra-font mb-8">
                {t("Fill Form") ||
                  "Completa este formulario y nuestro equipo te contactará en 24 horas para discutir tu proyecto."}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm neutra-font-bold text-gray-700 mb-2">
                      {t("First Name") || "Nombre"} *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent neutra-font"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm neutra-font-bold text-gray-700 mb-2">
                      {t("Last Name") || "Apellido"} *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent neutra-font"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm neutra-font-bold text-gray-700 mb-2">
                    {t("Email Address") || "Correo Electrónico"} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent neutra-font"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm neutra-font-bold text-gray-700 mb-2">
                    {t("Phone Number") || "Número de Teléfono"}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent neutra-font"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm neutra-font-bold text-gray-700 mb-2">
                    {t("Project Location") || "Ubicación del Proyecto"}
                  </label>
                  <input
                    type="text"
                    name="projectLocation"
                    value={formData.projectLocation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent neutra-font"
                    placeholder="City, Country"
                  />
                </div>

                <div>
                  <label className="block text-sm neutra-font-bold text-gray-700 mb-2">
                    {t("Project Time line") || "Cronograma del Proyecto"}
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent neutra-font"
                  >
                    <option value="">{t("Select Time Line") || "Seleccionar cronograma"}</option>
                    <option value="asap">{t("Asap") || "Lo antes posible"}</option>
                    <option value="3-months">{t("Within 3 Months") || "Dentro de 3 meses"}</option>
                    <option value="6-months">{t("Within 6M onths") || "Dentro de 6 meses"}</option>
                    <option value="1-year">{t("Within 1 Year") || "Dentro de 1 año"}</option>
                    <option value="planning">{t("Just Planning") || "Solo planeando"}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm neutra-font-bold text-gray-700 mb-2">
                    {t("Additional Comments") || "Comentarios Adicionales"}
                  </label>
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent neutra-font"
                    placeholder={t("Comments Placeholder") || "Cuéntanos más sobre tu proyecto..."}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg neutra-font-bold"
                >
                  {t("Send Message") || "Enviar Mensaje"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <p className="text-xs text-gray-500 neutra-font text-center">
                  {t("Submit Form") ||
                    "Al enviar este formulario, aceptas nuestros Términos de Servicio y Política de Privacidad."}
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
