import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "./_components/theme-provider";

export const metadata: Metadata = {
  title: "SyncSnap",
  description: "Seamless Cross-Device File Upload Service",
  keywords: [
    "SyncSnap",
    "Cross-Device File Upload",
    "File Upload",
    "File Transfer",
  ],
  authors: [{ name: "James Shah", url: "https://github.com/jamesshah" }],
  creator: "James Shah",
  publisher: "James Shah",
  category: "technology",
  applicationName: "SyncSnap",
  robots: "index, follow",
  openGraph: {
    title: "SyncSnap",
    description: "SyncSnap - Seamless Cross-Device File Upload Service",
    images: ["/og-image.png"],
    url: "https://syncsnap.xyz",
    siteName: "SyncSnap",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SyncSnap",
    description: "Seamless Cross-Device File Upload Service",
    images: ["/og-image.png"],
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          termsPageUrl: "/terms",
          privacyPageUrl: "/privacy",
        },
      }}
    >
      <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
        <body>
          <TRPCReactProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
