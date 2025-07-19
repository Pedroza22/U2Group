/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'hebbkx1anhila5yf.public.blob.vercel-storage.com'
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*/',
        destination: 'http://localhost:8000/api/:path*/',
      },
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*/',
      },
    ];
  },
};

export default nextConfig;
