import type { Metadata } from "next";

import { ChatProvider } from "@/components/providers/chat-context";

import Header from "@/components/header";
import Footer from "@/components/footer";
// import { CursorFollower } from "@/components/cursor-follower";

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

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <CursorFollower /> */}

      <Header />

      <ChatProvider>{children}</ChatProvider>

      <Footer />
    </>
  );
}
