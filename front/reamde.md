
✅ Pasos para la configuración

1. Crear una Página de Política de Cookies

Crea una ruta /cookies o una sección en tu política de privacidad con la siguiente información:

- Qué tipos de cookies se usan (funcionales, analíticas, publicitarias)
- Qué datos recogen
- Cómo el usuario puede aceptar o rechazar su uso
- Cómo revocar consentimiento

Ejemplo: https://u2.group/cookies

---

2. Agregar el Banner de Cookies

Añade este código HTML justo antes del </body> en tu archivo principal:

<div id="cookie-banner" style="
  position: fixed; bottom: 0; left: 0; right: 0;
  background-color: #222; color: white;
  padding: 15px; text-align: center; font-size: 14px; z-index: 1000;">
  Este sitio usa cookies para mejorar tu experiencia. 
  <a href="/cookies" style="color: #4EA8DE; text-decoration: underline;">Leer más</a>.
  <button onclick="acceptCookies()" style="margin-left: 10px; padding: 5px 10px;">Aceptar</button>
</div>

<script>
  function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookie-banner').style.display = 'none';
  }

  window.onload = function() {
    if (localStorage.getItem('cookiesAccepted') === 'true') {
      document.getElementById('cookie-banner').style.display = 'none';
    }
  };
</script>

Este script:
- Muestra un aviso solo si el usuario no ha aceptado aún.
- Guarda la elección en el navegador con localStorage.

---

3. Opcional: Agregar botón para revocar consentimiento

En la página /cookies puedes agregar:

<a href="#" onclick="localStorage.removeItem('cookiesAccepted'); location.reload();">
  Revocar consentimiento
</a>

---

4. (Opcional) Usar soluciones de terceros si necesitas categorías de cookies

Si necesitas clasificar cookies en categorías (esenciales, estadísticas, marketing), puedes usar alguna de estas herramientas:

- Cookiebot: https://www.cookiebot.com/
- Osano: https://www.osano.com/
- Tarteaucitron.js: https://tarteaucitron.io

---

🧪 Recomendaciones

- Verifica el banner en modo incógnito.
- Prueba en varios navegadores.
- Asegúrate de que el consentimiento se guarda y respeta antes de ejecutar cookies analíticas (ej: Google Analytics).

---

📬 Contacto

Para dudas o sugerencias, puedes escribir a contact@u2.group
