import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Artem Busyhin",
  description: "This page could not be found.",
};

export default function NotFoundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
