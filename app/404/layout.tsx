import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "../globals.css";

const oswaldFont = localFont({
  src: "../../public/fonts/Oswald/Oswald-VariableFont_wght.ttf",
  variable: "--font-oswald",
  weight: "100 500 700 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "404 - Page Not Found | Artem Busyhin",
  description: "This page could not be found.",
};

export default function NotFoundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
