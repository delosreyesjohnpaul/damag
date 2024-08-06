/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "avatar.vercel.sh",
                port:"",
            },
            {
                hostname: "utfs.io",
                port: "",
            }
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
