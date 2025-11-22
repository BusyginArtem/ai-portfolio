import type { Metadata } from "next";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ChatProvider } from "@/components/providers/chat-context";

import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Artem Busyhin | Personal Portfolio",
  description:
    "Artem Busyhin is a front-end Developer with 7 years of experience.",
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
