export const metadata: Metadata = {
  title: "Page not found",
  description: "This is default page show when page not found.",
};

import NotFoundPage from "@/components/not-found";
import { Metadata } from "next";

export default function NotFound() {
  return <NotFoundPage />;
}
