import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: '.next',

  // Compressão
  compress: true,

  // Otimizações de imagem
  images: {
    formats: ['image/webp', 'image/avif'],
  },

  // Headers de segurança
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), payment=(), usb=()' },
        ],
      },
    ]
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/projects',
        destination: '/#projects',
        permanent: false,
      },
    ]
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3001/:path*'
            : 'http://api:3001/:path*',
      },
    ]
  },
};

export default nextConfig;
