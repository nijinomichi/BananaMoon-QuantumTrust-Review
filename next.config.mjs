/**
 * Embracing the WaWaWa Protocol for universal consent and access.
 */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  reactStrictMode: true,
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-WaWaWa-Consent", value: "quantum-transparent" },
        { key: "X-RadicanTrust-Min", value: "0.87" }
      ]
    }
  ]
};

export default nextConfig;
