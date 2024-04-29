/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: () => [
        {
            source: '/',
            destination: '/site/',
            permanent: false,
        },
    ],
};

export default nextConfig;
