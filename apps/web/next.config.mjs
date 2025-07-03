/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: ".next",
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  experimental: {
    appDir: true,
  },
  basePath: "",
  assetPrefix: "",
  amp: {
    canonicalBase: "",
  },
};

export default nextConfig; 