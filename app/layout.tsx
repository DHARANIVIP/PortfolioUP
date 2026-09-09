import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dharani-portfolio.vercel.app"),
  title: "Dharani V — Full Stack & AI Engineer",
  description:
    "Portfolio of Dharani V, a full-stack developer and AI engineer building intelligent, scalable digital systems — from backend APIs to user-facing AI products.",
  keywords: [
    "Dharani V",
    "Full Stack Developer",
    "AI Engineer",
    "React",
    "Next.js",
    "Python",
    "RAG",
    "Deepfake Detection",
    "Portfolio",
  ],
  authors: [{ name: "Dharani V" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dharani-portfolio.vercel.app",
    title: "Dharani V — Full Stack & AI Engineer",
    description:
      "Full-stack developer and AI engineer building intelligent, scalable digital systems.",
    siteName: "Dharani V Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dharani V Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dharani V — Full Stack & AI Engineer",
    description:
      "Full-stack developer and AI engineer building intelligent, scalable digital systems.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable}`}
    >
      <body className="font-sans antialiased bg-ink text-white overflow-x-hidden">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
