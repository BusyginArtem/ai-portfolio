import type { Metadata } from "next";

import { ChatProvider } from "@/components/providers/chat-context";

import Header from "@/components/header";
import Footer from "@/components/footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : "https://vercel.com/artembusyhins-projects/ai-portfolio";

function getYearsOfExperience(): number {
  const start = new Date("2018-07-01");
  const now = new Date();
  return Math.floor(
    (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  );
}

const yearsOfExperience = getYearsOfExperience();
const description = `Artem Busyhin is a front-end Developer with ${yearsOfExperience}+ years of experience.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Personal Portfolio | Artem Busyhin",
  description,
  keywords: [
    "Artem Busyhin",
    "front-end developer",
    "React",
    "Next.js",
    "TypeScript",
    "portfolio",
    "web developer",
  ],
  openGraph: {
    title: "Front-end Developer | Artem Busyhin",
    description,
    // The URL should be the path *relative to the public folder*
    images: ["/opengraph-image.png"],
    url: "https://ai-portfolio-two-sigma.vercel.app/", // Replace with your actual deployed URL
    siteName: "Personal Portfolio | Artem Busyhin",
  },
  twitter: {
    card: "summary_large_image",
    title: "Front-end Developer | Artem Busyhin",
    description,
    images: ["/opengraph-image.png"],
  },
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      <ChatProvider>{children}</ChatProvider>

      <Footer />
    </>
  );
}
