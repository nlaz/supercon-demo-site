/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "ecr-streams.s3.amazonaws.com",
      "ecr-streams.s3.us-east-2.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
