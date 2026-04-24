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
};

module.exports = nextConfig;
