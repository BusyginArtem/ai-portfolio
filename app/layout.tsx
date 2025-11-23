import type { Metadata } from "next";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ChatProvider } from "@/components/providers/chat-context";

import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL!),
  title: "Artem Busyhin | Personal Portfolio",
  description:
    "Artem Busyhin is a front-end Developer with 7 years of experience.",
  openGraph: {
    title: "Artem Busyhin | Front-end Developer",
    description:
      "Artem Busyhin is a front-end Developer with 7 years of experience.",
    // The URL should be the path *relative to the public folder*
    images: ["/opengraph-image.png"],
    // url: "https://ai-portfolio-two-sigma.vercel.app/", // Replace with your actual deployed URL
    siteName: "Artem Busyhin | Personal Portfolio",
  },
  // You might also want to add Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Artem Busyhin | Front-end Developer",
    description:
      "Artem Busyhin is a front-end Developer with 7 years of experience.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="cursor-rounded" suppressHydrationWarning>
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
