import { Features } from "@/components/home/features";
import { UrlShortener } from "@/components/home/url-shortener";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkSnip - URL Shortener",
  description: "Shorten your URLs and track their performance",
};

export default function Home() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-16 md:pb-12 md:pt-16 lg:py-32">
        <div className="container flex max-w-[60rem] mx-auto flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-transparent bg-clip-text tracking-tighter sm:text-5xl md:text-6xl">
            Shorten, Share, and Track Your Links
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            LinkSnip helps you create shorter links, QR codes, and track your
            link performance with detailed analytics.
          </p>
          <UrlShortener />
        </div>
      </section>
      <Features />
    </>
  );
}
