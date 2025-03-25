"use client";
import { UrlList } from "@/components/dashboard/url-list";
import { UrlShortener } from "@/components/home/url-shortener";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
type UrlItem = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  qrCodeUrl: string;
};

export default function DashboardBody() {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  return (
    <motion.div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="col-span-full w-full max-w-full " variant="neon">
        <CardHeader>
          <CardTitle>Create New Link</CardTitle>
          <CardDescription>
            Enter a long URL to create a shortened link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UrlShortener urls={urls} setUrls={setUrls} />
        </CardContent>
      </Card>
      <Card
        className="col-span-full overflow-x-scroll"
        variant="neon"
        showWhile={false}
      >
        <CardHeader>
          <CardTitle>Your Links</CardTitle>
          <CardDescription>
            Manage and track your shortened URLs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UrlList urls={urls} setUrls={setUrls} />
        </CardContent>
      </Card>
    </motion.div>
  );
}
