/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "evenings.s3.amazonaws.com",
      "evenings.s3.us-east-2.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
