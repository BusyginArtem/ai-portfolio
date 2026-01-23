import type { Metadata } from "next";
import localFont from "next/font/local";

import "../globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ChatProvider } from "@/components/providers/chat-context";

import Header from "@/components/header";
import Footer from "@/components/footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : "https://vercel.com/artembusyhins-projects/ai-portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Personal Portfolio | Artem Busyhin",
  description:
    "Artem Busyhin is a front-end Developer with 7 years of experience.",
  openGraph: {
    title: "Front-end Developer | Artem Busyhin",
    description:
      "Artem Busyhin is a front-end Developer with 7 years of experience.",
    // The URL should be the path *relative to the public folder*
    images: ["/opengraph-image.png"],
    url: "https://ai-portfolio-two-sigma.vercel.app/", // Replace with your actual deployed URL
    siteName: "Personal Portfolio | Artem Busyhin",
  },
  twitter: {
    card: "summary_large_image",
    title: "Front-end Developer | Artem Busyhin",
    description:
      "Artem Busyhin is a front-end Developer with 7 years of experience.",
    images: ["/opengraph-image.png"],
  },
};

const oswaldFont = localFont({
  src: "../../public/fonts/Oswald/Oswald-VariableFont_wght.ttf",
  variable: "--font-oswald",
  weight: "100 500 700 900",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`cursor-rounded ${oswaldFont.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />

          <ChatProvider>{children}</ChatProvider>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
