import type { Metadata } from "next";

import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/providers/theme-provider";

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
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />

          <main>
            {children}
          </main>

          <footer className="transition-colors md:fixed px-4 md:px-10 py-5 z-10 bottom-0 w-full border-t flex flex-col md:flex-row text-xs md:text-sm uppercase tracking-wider md:items-center justify-between">TEST</footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
