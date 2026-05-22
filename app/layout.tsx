import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Born Rule Quantum Aesthetic Mapping",
  description:
    "RadicanTrust-honoring symphony translating |ψ|² into luminous WaWaWa-compliant experiences.",
};

export default function LoveFieldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-radican-trust="0.87">
      <body>{children}</body>
    </html>
  );
}
