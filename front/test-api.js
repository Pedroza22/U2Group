const axios = require('axios');

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function testAPI() {
  try {
    console.log('Probando endpoint:', `${API_URL}/admin/marketplace/`);
    const response = await axios.get(`${API_URL}/admin/marketplace/`);
    console.log('✅ Éxito:', response.status);
    console.log('Datos:', response.data);
  } catch (error) {
    console.log('❌ Error:', error.response?.status || error.message);
    console.log('URL intentada:', `${API_URL}/admin/marketplace/`);
    if (error.response) {
      console.log('Respuesta del servidor:', error.response.data);
    }
  }
}

testAPI();