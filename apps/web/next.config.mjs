/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: ".next",
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  basePath: "",
  assetPrefix: "",
  amp: {
    canonicalBase: "",
  },
};

export default nextConfig; 