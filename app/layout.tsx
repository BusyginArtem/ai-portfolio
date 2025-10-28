import type { Metadata } from "next";
// import localFont from 'next/font/local';

import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/providers/theme-provider";

// const oswald = localFont({ src: '../public/fonts/Oswald/Oswald-VariableFont_wght.ttf' })

export const metadata: Metadata = {
  title: "Artem Busyhin | Personal Portfolio",
  description:
    "Artem Busyhin is a front-end Developer with 6 years of experience.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />

          {children}

          <footer className="bg-background transition-colors fixed px-4 md:px-10 py-5 z-10 bottom-0 w-full border-t flex flex-col md:flex-row uppercase tracking-wider md:items-center justify-between">
            {/* <h1 className="text-xl md:text-2xl lg:text-6xl">Artem Busyhin</h1> */}
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
