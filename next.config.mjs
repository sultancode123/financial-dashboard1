/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // enables `next export` for static assets (works great with Capacitor)
  images: {
    unoptimized: true
  }
};
export default nextConfig;
