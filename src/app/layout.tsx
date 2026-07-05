import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { draAnaMetadata } from "./dra-ana/draAnaData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Host-branch the document metadata: on Ana's custom domain the root ("/")
// serves her page, so the <title>, description, canonical and OG tags must be
// hers — not the generic Vitrina Pro template. This is what flips the root
// domain from "presence" (generic tags, no schema) to a real answer surface.
export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") || "";

  if (host.includes("draanamariaramirez")) {
    return draAnaMetadata;
  }

  return {
    title: "Vitrina Pro — CaboRojo.com",
    description: "Profesionales de Cabo Rojo, Puerto Rico",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
