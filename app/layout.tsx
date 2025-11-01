import type { Metadata } from "next";
// import localFont from 'next/font/local';

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ChatProvider } from "@/components/providers/chat-context";

import Header from "@/components/header";
import Footer from "@/components/footer";

// const oswald = localFont({ src: '../public/fonts/Oswald/Oswald-VariableFont_wght.ttf' })

export const metadata: Metadata = {
  title: "Artem Busyhin | Personal Portfolio",
  description: "Artem Busyhin is a front-end Developer with 6 years of experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth' suppressHydrationWarning>
      <body>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <Header />

          <ChatProvider>{children}</ChatProvider>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
