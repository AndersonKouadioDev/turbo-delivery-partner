/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: process.env.NEXT_PUBLIC_BACKEND_PROTOCOL,
                hostname: process.env.NEXT_PUBLIC_BACKEND_HOST,
                // port: '',
                // pathname: '/demos/images/**',
            },
        ],
    },
};

module.exports = nextConfig;
