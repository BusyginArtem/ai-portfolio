import type { Metadata } from "next";
// import localFont from 'next/font/local';

import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ChatProvider } from "@/components/providers/chat-context";

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

          <footer className='bg-background fixed px-4 md:px-10 py-5 z-10 bottom-0 w-full border-t flex flex-col gap-2 sm:gap-0 sm:flex-row text-lg md:text-xl uppercase tracking-wider md:items-center justify-between'>
            <div>Currently in Europe (GMT +01:00)</div>

            <a href='mailto:artembusygin87@gmail.com?subject=Hi Artem'>
              <p className='underline underline-offset-4'> Write Me</p>
            </a>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
