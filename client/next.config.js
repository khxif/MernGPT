/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/:path*",
                destination: process.env.NODE_ENV === "production" ? "https://mern-gpt-server.vercel.app/:path*" : "http://localhost:5000/:path*",
            },
        ];
    },
}

module.exports = nextConfig
