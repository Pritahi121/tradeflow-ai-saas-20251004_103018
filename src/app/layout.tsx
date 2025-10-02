import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auto-Deploy App - Live Vercel Deployment",
  description: "Next.js application with automatic Vercel deployments. Push to GitHub and see live updates instantly.",
  keywords: ["Vercel", "Next.js", "Auto-deploy", "TypeScript", "Tailwind CSS", "React", "Live deployment"],
  authors: [{ name: "Auto-Deploy Team" }],
  openGraph: {
    title: "Auto-Deploy App",
    description: "Next.js app with automatic Vercel deployments - Push to GitHub, see live updates",
    siteName: "Auto-Deploy App",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto-Deploy App",
    description: "Next.js app with automatic Vercel deployments",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
