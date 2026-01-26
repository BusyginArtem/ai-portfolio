import type { Metadata } from "next";

import NotFoundPage from "@/components/not-found-page";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Artem Busyhin",
  description: "This page could not be found.",
};

export default function NotFound() {
  return <NotFoundPage />;
}
