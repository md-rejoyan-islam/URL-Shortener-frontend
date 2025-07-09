"use client";
import { Button } from "@/components/ui/button";
import { deleteUrlById, getAllUrls } from "@/lib/url-api";
import { motion } from "framer-motion";
import { Copy, ExternalLink, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type UrlItem = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  qrCodeUrl: string;
};

export function UrlList({
  urls,
  setUrls,
}: {
  urls: UrlItem[];
  setUrls: (urls: UrlItem[]) => void;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const {
          data = [],
        }: {
          data: {
            _id: string;
            originalUrl: string;
            shortUrl: string;
            clicks: string[];
            createdAt: string;
            qrCodeUrl: string;
          }[];
        } = await getAllUrls();

        setUrls(
          data?.map((url) => ({
            id: url._id,
            originalUrl: url.originalUrl,
            shortUrl: url.shortUrl,
            clicks: url.clicks?.length,
            createdAt: url.createdAt,
            qrCodeUrl: url.qrCodeUrl,
          }))
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard");
  };

  const deleteUrl = async (id: string) => {
    try {
      const { data } = await deleteUrlById(id);

      if (data) {
        setUrls(urls.filter((url: UrlItem) => url.id !== id));
        toast.success("URL deleted successfully");
      }

      // setUrls((urls) => urls.filter((url) => url.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to delete URL");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  if (urls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-muted-foreground">
          You haven&apos;t created any links yet.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="rounded-md border overflow-hidden bg-card/50 backdrop-blur-sm">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left font-medium">
                  Original URL
                </th>
                <th className="h-12 px-4 text-left font-medium">Short URL</th>
                <th className="h-12 px-4 text-left font-medium">Clicks</th>
                <th className="h-12 px-4 text-left font-medium">QR Code</th>
                <th className="h-12 px-4 text-left font-medium">Created</th>
                <th className="h-12 px-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={6} className="p-4 text-center">
                    Loading...
                  </td>
                </tr>
              )}

              {urls.map((url) => (
                <motion.tr
                  key={url.id}
                  className="border-b transition-colors hover:bg-gray-100 "
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{
                    backgroundColor: "rgba(var(--primary-rgb), 0.05)",
                  }}
                >
                  <td className="p-4 align-middle">
                    <div className="max-w-[200px] truncate">
                      <div className="flex items-center gap-2">
                        <a
                          href={url.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {url.originalUrl}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle text-primary">
                    <div className="flex items-center gap-2">
                      <a
                        href={url.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {url.shortUrl.split("//")[1]}
                      </a>
                    </div>
                  </td>
                  <td className="p-4 align-middle">{url.clicks}</td>
                  <td className="p-4 align-middle">
                    <Image
                      src={url?.qrCodeUrl}
                      alt="QR Code for shortened URL"
                      width={50}
                      height={50}
                      unoptimized
                      className="w-10 h-10 object-contain "
                    />
                  </td>
                  <td className="p-4 align-middle">
                    {new Date(url.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(url.shortUrl)}
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy</span>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <a
                          href={url.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">Open</span>
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => deleteUrl(url.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
