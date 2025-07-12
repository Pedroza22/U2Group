"use client";

import React from "react";

export default function PoliticaPrivacidad() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 py-16 px-2">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl animate-pulse" style={{zIndex:0}} />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-2xl animate-pulse" style={{zIndex:0}} />
      </div>
      <section className="relative z-10 w-full max-w-3xl bg-white/90 dark:bg-zinc-900/90 rounded-3xl shadow-2xl p-8 md:p-12 border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 text-white rounded-full p-4 shadow-lg mb-4 animate-bounce">
            <span className="text-4xl">🛡️</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 tracking-tight text-blue-700 dark:text-blue-300 drop-shadow-lg">Política de Privacidad de U2 Group</h1>
          <p className="text-base text-zinc-500 dark:text-zinc-300 mb-2">Última actualización: 12 de julio de 2025</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 rounded-full mb-2" />
        </div>
        {/* --- Renderizar los elementos de la política de privacidad con key única y sin <li> anidados --- */}
        {(() => {
          const items = [
            // Cada elemento es un objeto con el contenido JSX de la sección
            {
              content: (<><b>Introducción</b><br/>U2 Group está comprometido con la protección de tu privacidad y con el manejo transparente y seguro de tus datos personales, conforme a las leyes aplicables.</>),
            },
            {
              content: (<><b>Ámbito de Aplicación</b><br/>Esta política aplica a:<ul className="list-disc list-inside ml-4 mt-1"><li>El sitio web <a className="text-blue-600 underline" href="https://u2.group" target="_blank">https://u2.group</a></li><li>Venta de planos de casas prediseñados</li><li>Servicios de diseño arquitectónico personalizado</li><li>Recolección de datos vía formularios, correo, redes sociales o portales de clientes</li></ul></>),
            },
            {
              content: (<><b>Cumplimiento Legal Internacional</b><br/>Cumple con:<ul className="list-disc list-inside ml-4 mt-1"><li>GDPR (Unión Europea)</li><li>CCPA/CPRA (California, EE.UU.)</li><li>Ley de Protección de Datos del Reino Unido</li><li>PIPEDA (Canadá)</li><li>Ley 1581 de 2012 (Colombia)</li></ul></>),
            },
            {
              content: (<><b>Datos que Recopilamos</b><div className="overflow-x-auto mt-2"><table className="min-w-full border border-zinc-300 dark:border-zinc-700 text-sm"><thead className="bg-zinc-100 dark:bg-zinc-800"><tr><th className="border px-2 py-1">Categoría</th><th className="border px-2 py-1">Ejemplos</th><th className="border px-2 py-1">Cómo se recopila</th></tr></thead><tbody><tr><td className="border px-2 py-1">Identificadores</td><td className="border px-2 py-1">Nombre, email, teléfono</td><td className="border px-2 py-1">Formularios, contacto directo</td></tr><tr><td className="border px-2 py-1">Facturación</td><td className="border px-2 py-1">Método de pago, dirección de facturación</td><td className="border px-2 py-1">Stripe</td></tr><tr><td className="border px-2 py-1">Datos del proyecto</td><td className="border px-2 py-1">Preferencias, información de propiedad</td><td className="border px-2 py-1">Reuniones, formularios</td></tr><tr><td className="border px-2 py-1">Uso del sitio</td><td className="border px-2 py-1">IP, navegador, comportamiento</td><td className="border px-2 py-1">Cookies, analíticas</td></tr><tr><td className="border px-2 py-1">Comunicaciones</td><td className="border px-2 py-1">Emails, chats de soporte</td><td className="border px-2 py-1">Herramientas CRM</td></tr></tbody></table></div></>),
            },
            {
              content: (<><b>Uso de la Información</b><ul className="list-disc list-inside ml-4 mt-1"><li>Entregar productos y servicios</li><li>Procesar pagos</li><li>Enviar actualizaciones y comunicaciones legales</li><li>Mejorar la experiencia del usuario</li><li>Enviar promociones (si se da consentimiento)</li><li>Cumplimiento legal y prevención de fraude</li></ul></>),
            },
            {
              content: (<><b>Base Legal para Procesar Datos</b><ul className="list-disc list-inside ml-4 mt-1"><li>Consentimiento explícito</li><li>Necesidad contractual</li><li>Obligaciones legales</li><li>Interés legítimo</li></ul></>),
            },
            {
              content: (<><b>Consentimiento del Usuario</b><br/>Se solicita antes de:<ul className="list-disc list-inside ml-4 mt-1"><li>Enviar formularios</li><li>Usar cookies no esenciales</li><li>Suscribirse a boletines</li></ul>Puedes retirarlo en cualquier momento escribiendo a: <a className="text-blue-600 underline" href="mailto:contact@u2.group">contact@u2.group</a></>),
            },
            {
              content: (<><b>Planos Prediseñados</b><ul className="list-disc list-inside ml-4 mt-1"><li>Son propiedad intelectual de U2 Group</li><li>Licencia limitada, no transferible</li><li>Prohibida su reventa o redistribución</li><li>Licencia: <a className="text-blue-600 underline" href="https://u2.group/license-pre" target="_blank">https://u2.group/license-pre</a></li></ul></>),
            },
            {
              content: (<><b>Diseño Arquitectónico Personalizado</b><ul className="list-disc list-inside ml-4 mt-1"><li>Licencia para un solo proyecto y ubicación</li><li>Prohibida su reutilización o venta</li><li>U2 Group puede usar los diseños en su portafolio</li><li>Licencia: <a className="text-blue-600 underline" href="https://u2.group/custom-design-license" target="_blank">https://u2.group/custom-design-license</a></li></ul></>),
            },
            {
              content: (<><b>Compartición de Datos</b><br/>Solo con proveedores confiables:<ul className="list-disc list-inside ml-4 mt-1"><li>Stripe (pagos)</li><li>Google Analytics</li><li>Herramientas CRM</li></ul>Todos bajo acuerdos de procesamiento de datos (DPA).</>),
            },
            {
              content: (<><b>Pagos</b><br/>Procesados por Stripe<br/>U2 Group no accede a los datos completos de la tarjeta<br/>Stripe cumple con PCI DSS: <a className="text-blue-600 underline" href="https://stripe.com/privacy" target="_blank">https://stripe.com/privacy</a></>),
            },
            {
              content: (<><b>Cookies</b><br/>Usamos cookies para:<ul className="list-disc list-inside ml-4 mt-1"><li>Funcionalidad esencial</li><li>Análisis de comportamiento</li><li>Publicidad personalizada (solo con consentimiento)</li></ul>Gestión: <a className="text-blue-600 underline" href="https://u2.group/cookies" target="_blank">https://u2.group/cookies</a></>),
            },
            {
              content: (<><b>Retención de Datos</b><div className="overflow-x-auto mt-2"><table className="min-w-full border border-zinc-300 dark:border-zinc-700 text-sm"><thead className="bg-zinc-100 dark:bg-zinc-800"><tr><th className="border px-2 py-1">Tipo de dato</th><th className="border px-2 py-1">Tiempo</th><th className="border px-2 py-1">Propósito</th></tr></thead><tbody><tr><td className="border px-2 py-1">Facturación</td><td className="border px-2 py-1">7 años</td><td className="border px-2 py-1">Obligaciones legales y fiscales</td></tr><tr><td className="border px-2 py-1">Diseños personalizados</td><td className="border px-2 py-1">10 años</td><td className="border px-2 py-1">Soporte y portafolio</td></tr><tr><td className="border px-2 py-1">Comunicaciones</td><td className="border px-2 py-1">3 años</td><td className="border px-2 py-1">Historial de servicio</td></tr><tr><td className="border px-2 py-1">Analíticas</td><td className="border px-2 py-1">2 años</td><td className="border px-2 py-1">Mejora del sitio</td></tr></tbody></table></div></>),
            },
            {
              content: (<><b>Derechos del Usuario</b><br/>Puedes:<ul className="list-disc list-inside ml-4 mt-1"><li>Acceder a tus datos</li><li>Corregir errores</li><li>Solicitar eliminación</li><li>Retirar consentimiento</li><li>Oponerte al procesamiento</li><li>Presentar quejas ante autoridades</li></ul>Solicitudes: <a className="text-blue-600 underline" href="mailto:contact@u2.group">contact@u2.group</a></>),
            },
            {
              content: (<><b>Portabilidad de Datos</b><br/>Puedes solicitar tus datos en formato estructurado (CSV o JSON) dentro de 30 días.</>),
            },
            {
              content: (<><b>Medidas de Seguridad</b><ul className="list-disc list-inside ml-4 mt-1"><li>Cifrado HTTPS/TLS</li><li>Firewalls y antimalware</li><li>Acceso restringido</li><li>Auditorías regulares</li><li>Backups cifrados y distribuidos</li></ul></>),
            },
            {
              content: (<><b>Menores de Edad</b><br/>No se recopilan datos de menores de 13 años. Si ocurre, se eliminarán inmediatamente.</>),
            },
            {
              content: (<><b>Enlaces a Terceros</b><br/>No nos responsabilizamos por las prácticas de privacidad de sitios enlazados (Pinterest, Instagram, etc.).</>),
            },
            {
              content: (<><b>Transferencias Internacionales</b><br/>Se realizan conforme a:<ul className="list-disc list-inside ml-4 mt-1"><li>Cláusulas contractuales estándar</li><li>Acuerdos transfronterizos</li></ul></>),
            },
            {
              content: (<><b>Notificación de Brechas</b><br/>Se notificará dentro de las 72 horas<br/>Se informará a los afectados y autoridades</>),
            },
            {
              content: (<><b>Decisiones Automatizadas</b><br/>No realizamos decisiones automáticas que afecten significativamente al usuario.</>),
            },
            {
              content: (<><b>Precisión de Datos</b><br/>Puedes actualizar tus datos en cualquier momento. Revisamos y verificamos periódicamente.</>),
            },
            {
              content: (<><b>Mecanismos de Opt-Out</b><br/>Puedes optar por no recibir:<ul className="list-disc list-inside ml-4 mt-1"><li>Emails (enlace “Darse de baja”)</li><li>Cookies (ajustes del navegador o <a className="text-blue-600 underline" href="https://u2.group/cookies" target="_blank">https://u2.group/cookies</a>)</li><li>Publicidad: <a className="text-blue-600 underline" href="https://optout.aboutads.info" target="_blank">https://optout.aboutads.info</a></li></ul></>),
            },
            {
              content: (<><b>Responsable del Tratamiento</b><br/>U2 Group es el responsable. Usa procesadores como:<ul className="list-disc list-inside ml-4 mt-1"><li>Stripe (pagos)</li><li>Google Analytics</li><li>CRM (comunicaciones)</li></ul></>),
            },
            {
              content: (<><b>Ley Aplicable y Disputas</b><br/>Ley de la República de Colombia<br/>Jurisdicción exclusiva: Pasto, Nariño<br/>Se prefiere solución amigable antes de acciones legales</>),
            },
            {
              content: (<><b>Registros y Consentimientos</b><br/>Se almacenan registros de:<ul className="list-disc list-inside ml-4 mt-1"><li>Consentimientos</li><li>Solicitudes de usuarios</li><li>Notificaciones de brechas</li></ul></>),
            },
            {
              content: (<><b>Delegado de Protección de Datos (DPO)</b><br/>Juan José Lima<br/><span className="inline-flex items-center gap-1">📧 <a className="text-blue-600 underline" href="mailto:dpo@u2.group">dpo@u2.group</a></span><br/><span className="inline-flex items-center gap-1">📍 U2 Group, Pasto, Nariño, Colombia</span></>),
            },
            {
              content: (<><b>Privacidad por Diseño</b><ul className="list-disc list-inside ml-4 mt-1"><li>Solo se recolecta lo necesario</li><li>Seguridad desde el inicio</li><li>Configuración de privacidad por defecto</li></ul></>),
            },
            {
              content: (<><b>Registro de Terceros</b><br/>Registro público de terceros con los que se comparte datos:<br/>👉 <a className="text-blue-600 underline" href="https://u2.group/transparency-register" target="_blank">https://u2.group/transparency-register</a></>),
            },
            {
              content: (<><b>Acuerdos de Procesamiento de Datos (DPAs)</b><br/>Incluyen:<ul className="list-disc list-inside ml-4 mt-1"><li>Cláusulas del GDPR</li><li>Obligaciones de seguridad</li><li>Responsabilidad en caso de brechas</li></ul></>),
            },
            {
              content: (<><b>Idioma</b><br/>Disponible en español e inglés. En caso de conflicto, prevalece la versión en inglés.</>),
            },
            {
              content: (<><b>Glosario</b><br/><b>Datos personales:</b> información que identifica a una persona<br/><b>Responsable:</b> quien decide cómo se tratan los datos<br/><b>Encargado:</b> quien procesa datos por encargo del responsable<br/><b>Consentimiento:</b> aceptación libre e informada</>),
            },
            {
              content: (<><b>Cumplimiento por Región</b><div className="overflow-x-auto mt-2"><table className="min-w-full border border-zinc-300 dark:border-zinc-700 text-sm"><thead className="bg-zinc-100 dark:bg-zinc-800"><tr><th className="border px-2 py-1">Región</th><th className="border px-2 py-1">Ley</th><th className="border px-2 py-1">Medidas Cumplidas</th></tr></thead><tbody><tr><td className="border px-2 py-1">UE</td><td className="border px-2 py-1">GDPR</td><td className="border px-2 py-1">DPO, registros, herramientas de acceso</td></tr><tr><td className="border px-2 py-1">EE.UU.</td><td className="border px-2 py-1">CCPA/CPRA</td><td className="border px-2 py-1">Derecho a eliminar, mecanismos de opt-out</td></tr><tr><td className="border px-2 py-1">Canadá</td><td className="border px-2 py-1">PIPEDA</td><td className="border px-2 py-1">Consentimiento y notificación de brechas</td></tr><tr><td className="border px-2 py-1">Colombia</td><td className="border px-2 py-1">Ley 1581/2012</td><td className="border px-2 py-1">Derechos de habeas data, registro de bases</td></tr><tr><td className="border px-2 py-1">Brasil</td><td className="border px-2 py-1">LGPD</td><td className="border px-2 py-1">Fundamento legal, notificaciones, acceso</td></tr></tbody></table></div></>),
            },
            {
              content: (<><b>Registro de Actividades</b><br/>Se lleva un ROPA que documenta:<ul className="list-disc list-inside ml-4 mt-1"><li>Qué datos se recopilan</li><li>Para qué se usan</li><li>Dónde se almacenan</li><li>Cuánto tiempo se conservan</li></ul></>),
            },
            {
              content: (<><b>Publicidad Basada en Comportamiento</b><br/>Podemos usar:<ul className="list-disc list-inside ml-4 mt-1"><li>Meta Pixel</li><li>Google Ads</li><li>TikTok Pixel</li></ul>Se puede desactivar en: <a className="text-blue-600 underline" href="https://u2.group/cookies" target="_blank">https://u2.group/cookies</a> y <a className="text-blue-600 underline" href="https://optout.aboutads.info" target="_blank">https://optout.aboutads.info</a></>),
            },
            {
              content: (<><b>Cifrado</b><br/>AES-256 para datos en reposo<br/>TLS 1.2 o superior para datos en tránsito</>),
            },
            {
              content: (<><b>Evaluación de Impacto</b><br/>Se realiza antes de lanzar nuevas tecnologías o procesamientos masivos de datos.</>),
            },
            {
              content: (<><b>Actualizaciones</b><br/>Se notificará por email o en el sitio web ante cambios importantes.<br/>Versión actual: <a className="text-blue-600 underline" href="https://u2.group/privacy" target="_blank">https://u2.group/privacy</a></>),
            },
            {
              content: (<><b>Contacto</b><br/>U2 Group<br/><span className="inline-flex items-center gap-1">📍 Pasto, Colombia</span><br/><span className="inline-flex items-center gap-1">📧 <a className="text-blue-600 underline" href="mailto:contact@u2.group">contact@u2.group</a></span><br/><span className="inline-flex items-center gap-1">🌐 <a className="text-blue-600 underline" href="https://u2.group" target="_blank">https://u2.group</a></span></>),
            },
          ];
          return (
            <ol className="space-y-8 list-inside text-lg relative">
              {items.map((item, idx) => (
                <li key={`privacidad-li-${idx}`} className="relative pl-10">
                  <span className="absolute left-0 top-1 text-white font-extrabold bg-blue-600 dark:bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center shadow-md text-lg border-4 border-white dark:border-zinc-900 select-none" style={{zIndex:2}}>
                    {idx + 1}
                  </span>
                  {item.content}
                </li>
              ))}
            </ol>
          );
        })()}
      </section>
    </main>
  );
} 