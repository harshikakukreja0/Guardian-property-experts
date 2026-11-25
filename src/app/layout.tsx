import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://guardianpropertyexpert.com"),
  title: "Guardian PropertyExpert | India's Premium Real Estate Marketplace",
  description:
    "Discover luxury apartments, penthouses, golf course villas, and Grade A commercial spaces with 100% RERA verification across Mumbai, Delhi NCR, Bangalore, and Pune.",
  keywords: [
    "Guardian PropertyExpert",
    "Real Estate India",
    "Luxury Apartments Mumbai",
    "Golf Course Villas Bangalore",
    "Commercial Office Space Gurugram",
    "RERA Verified Properties",
  ],
  authors: [{ name: "Guardian PropertyExpert" }],
  openGraph: {
    title: "Guardian PropertyExpert | India's Premium Real Estate Marketplace",
    description:
      "Direct owner listings, top builder projects, and verified brokers across India.",
    url: "https://guardianpropertyexpert.com",
    siteName: "Guardian PropertyExpert",
    images: [
      {
        url: "/images/architecture.jpg",
        width: 1200,
        height: 630,
        alt: "Guardian PropertyExpert Luxury Real Estate",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans bg-stone-50/50 text-stone-900 selection:bg-emerald-600 selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
