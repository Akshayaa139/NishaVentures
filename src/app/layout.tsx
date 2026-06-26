import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nisha Ventures | Research-Grade Galleria mellonella Larvae",
  description: "Standardized, pathogen-free Galleria mellonella (wax moth) larvae. Premium in vivo models for drug toxicity, bacterial virulence, and antimicrobial R&D.",
  keywords: ["Galleria mellonella", "wax moth larvae", "biotech model", "drug toxicity testing", "bacterial virulence studies", "antimicrobial research", "research models", "Nisha Ventures", "Galleria supplier", "Galleria producer", "procure Galleria larvae", "Galleria mellonella supplier", "wax moth supplier"],
  verification: {
    google: "S3-iWZJFrezmtrfTf80XVQztQ_FhQLdvkn2-M6x4ReY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
