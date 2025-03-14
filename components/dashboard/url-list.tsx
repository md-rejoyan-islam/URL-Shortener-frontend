import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, ExternalLink, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type UrlItem = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
};

export function UrlList() {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Mock data
    const mockUrls: UrlItem[] = [
      {
        id: "1",
        originalUrl:
          "https://example.com/very/long/url/that/needs/to/be/shortened/for/better/sharing",
        shortUrl: "https://linksnip.io/abc123",
        clicks: 42,
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        id: "2",
        originalUrl:
          "https://verylongwebsiteaddress.com/with/many/parameters?param1=value1&param2=value2",
        shortUrl: "https://linksnip.io/def456",
        clicks: 18,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: "3",
        originalUrl: "https://anotherexample.org/path/to/resource",
        shortUrl: "https://linksnip.io/ghi789",
        clicks: 7,
        createdAt: new Date().toISOString(),
      },
    ];

    setUrls(mockUrls);
  }, []);

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied to clipboard",
      description: "The URL has been copied to your clipboard.",
    });
  };

  const deleteUrl = (id: string) => {
    setUrls(urls.filter((url) => url.id !== id));
    toast({
      title: "URL deleted",
      description: "The shortened URL has been deleted.",
    });
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
      className="space-y-4 w-fit"
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
                <th className="h-12 px-4 text-left font-medium">Created</th>
                <th className="h-12 px-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
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
                      <div
                        className="max-w-[200px] truncate"
                        title={url.originalUrl}
                      >
                        {url.originalUrl}
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
                          onClick={() => deleteUrl(url.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
