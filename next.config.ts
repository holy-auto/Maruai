import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // 施工写真を Supabase Storage に置く場合、ホストを許可（xxxx を自分のプロジェクトに）
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
