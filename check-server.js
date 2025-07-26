const axios = require('axios');

async function checkServer() {
  const urls = [
    'http://localhost:8000/api/admin/marketplace/',
    'http://localhost:8000/api/blogs/',
    'http://localhost:8000/api/projects/'
  ];

  for (const url of urls) {
    try {
      console.log(`\n🔍 Probando: ${url}`);
      const response = await axios.get(url);
      console.log(`✅ Status: ${response.status}`);
      console.log(`📊 Datos: ${JSON.stringify(response.data).substring(0, 100)}...`);
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
      if (error.code === 'ECONNREFUSED') {
        console.log('💡 El servidor Django no está corriendo. Ejecuta: python manage.py runserver');
      }
    }
  }
}

checkServer(); 