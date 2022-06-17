/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Setting this to true caused bug where components render twice. This caused click of modal to open 2 of same modal. Strict mode did this on purpose. Read here: https://github.com/facebook/react/issues/15074
}

module.exports = nextConfig
