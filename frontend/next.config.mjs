/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: () => [
        {
            source: '/',
            destination: '/pages/',
            permanent: false,
        },
    ],
};

export default nextConfig;
