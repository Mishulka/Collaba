/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
            protocol: 'https',
            hostname: 'img.clerk.com',
            }
        ]
    },
    logging: {
    level: 'verbose',
  },
  output: 'standalone',
   transpilePackages: [
    '@radix-ui/react-avatar',
    '@radix-ui/react-alert-dialog',
    '@radix-ui/react-dialog',
    '@radix-ui/react-dropdown-menu',
    '@radix-ui/react-slot',
    '@radix-ui/react-tooltip',
    'lucide-react',
    'class-variance-authority',
    // Добавьте сюда любые другие пакеты, которые могут вызывать ошибки
  ],
};

module.exports = nextConfig;
