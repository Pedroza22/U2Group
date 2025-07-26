const axios = require('axios');

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

async function testAllEndpoints() {
  const endpoints = [
    { name: 'Blogs', url: `${API_URL}/admin/blogs/` },
    { name: 'Blog Interactions', url: `${API_URL}/admin/blog-interactions/` },
    { name: 'Projects', url: `${API_URL}/admin/projects/` },
    { name: 'Marketplace', url: `${API_URL}/admin/marketplace/` },
  ];

  console.log('🔍 Probando todos los endpoints...\n');

  for (const endpoint of endpoints) {
    try {
      console.log(`📡 Probando: ${endpoint.name}`);
      console.log(`   URL: ${endpoint.url}`);
      const response = await axios.get(endpoint.url);
      console.log(`   ✅ Status: ${response.status}`);
      console.log(`   📊 Datos: ${JSON.stringify(response.data).substring(0, 100)}...`);
      console.log('');
    } catch (error) {
      console.log(`   ❌ Error: ${error.response?.status || error.message}`);
      if (error.response?.data) {
        console.log(`   📝 Detalles: ${JSON.stringify(error.response.data)}`);
      }
      console.log('');
    }
  }
}

testAllEndpoints(); 