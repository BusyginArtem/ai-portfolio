import localFont from "next/font/local";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";

const oswaldFont = localFont({
  src: "../public/fonts/Oswald/Oswald-VariableFont_wght.ttf",
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
