"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createUrlShorten } from "@/lib/url-api";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  LinkIcon,
  QrCode,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../providers/auth-provider";
import { Alert, AlertDescription } from "../ui/alert";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

type UrlItem = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  qrCodeUrl: string;
};

export function UrlShortener({
  urls,
  setUrls,
}: {
  urls?: UrlItem[];
  setUrls?: (urls: UrlItem[]) => void;
}) {
  const { user } = useAuth();

  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [useCustomId, setUseCustomId] = useState(false);
  const [qrCode, setQrCode] = useState("");

  const [customId, setCustomId] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateCustomId = (id: string) => {
    // Check if the custom ID is valid (alphanumeric, hyphens, and underscores only)
    const validPattern = /^[a-zA-Z0-9-_]+$/;
    return validPattern.test(id);
  };

  const shortenUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    setShortUrl("");
    setQrCode("");
    setError(null);
    if (!url) {
      setError("Please enter a URL to shorten");
      return;
    }

    if (useCustomId && !customId) {
      setError("Please enter a custom ID or disable the custom ID option");
      return;
    }

    if (useCustomId && !validateCustomId(customId)) {
      setError(
        "Custom ID can only contain letters, numbers, hyphens, and underscores"
      );
      return;
    }

    setIsLoading(true);
    const details = {
      originalUrl: url,
      customAlias: (useCustomId && customId) || null,
    };

    try {
      const {
        data,
      }: {
        data: UrlItem;
      } = await createUrlShorten(details);

      if (setUrls) {
        setUrls([...(urls || []), data]);
      }
      setShortUrl(data?.shortUrl);
      setQrCode(data?.qrCodeUrl);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard", {
      description: "The shortened URL has been copied to your clipboard.",
    });
  };

  const downloadQrCode = () => {
    // Create a link element
    const link = document.createElement("a");
    link.href = qrCode;

    link.download = "qrcode.png";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("QR Code downloaded", {
      description: "The QR code has been downloaded to your device.",
    });
  };

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
    if (!showAdvanced) {
      // Reset custom ID settings when hiding advanced options
      setUseCustomId(false);
      setCustomId("");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.form
        onSubmit={shortenUrl}
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex w-full items-center space-x-2">
          <Input
            type="url"
            placeholder="Enter your long URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading} variant="gradient">
            {isLoading ? (
              <motion.div
                className="h-5 w-5 rounded-full border-2 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ) : (
              "Shorten"
            )}
          </Button>
        </div>
        <div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs flex items-center gap-1 text-muted-foreground"
            disabled={isLoading || !user}
            onClick={toggleAdvanced}
          >
            {showAdvanced ? (
              <>
                <ChevronUp className="h-3.5 w-3.5" />
                Hide advanced options
              </>
            ) : (
              <>
                <ChevronDown className="h-3.5 w-3.5" />
                Show advanced options {!user && "(Sign in to use custom ID)"}
              </>
            )}
          </Button>

          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="custom-id"
                      checked={useCustomId}
                      onCheckedChange={setUseCustomId}
                    />
                    <Label htmlFor="custom-id">Use custom ID</Label>
                  </div>
                </div>

                <AnimatePresence>
                  {useCustomId && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="flex-shrink-0 text-sm text-muted-foreground">
                          linksnip.io/
                        </div>
                        <Input
                          type="text"
                          placeholder="your-custom-id"
                          value={customId}
                          onChange={(e) => setCustomId(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Custom ID can contain letters, numbers, hyphens, and
                        underscores.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.form>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Alert variant="destructive" className="py-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="ml-2 text-sm">
                {error}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {shortUrl && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card variant="neon" className="mt-4 overflow-hidden">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-grow space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4 text-primary" />
                        <a
                          href={shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm md:text-base truncate max-w-[180px] md:max-w-[250px]"
                        >
                          {shortUrl}
                        </a>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={copyToClipboard}
                        type="button"
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy</span>
                      </Button>
                    </div>

                    <div className="md:hidden flex justify-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="relative w-32 h-32 bg-white rounded-lg p-2 shadow-md"
                      >
                        <Image
                          src={qrCode}
                          alt="QR Code for shortened URL"
                          width={200}
                          height={200}
                          unoptimized
                          className="w-full h-full object-contain"
                        />
                      </motion.div>
                    </div>

                    <div className="flex justify-center md:justify-start">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs gap-1.5"
                        type="button"
                        onClick={downloadQrCode}
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download QR Code
                      </Button>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="relative w-24 h-24 bg-white rounded-lg p-2 shadow-md"
                    >
                      <Image
                        src={qrCode}
                        alt="QR Code for shortened URL"
                        width={200}
                        height={200}
                        className="w-full h-full object-contain"
                        unoptimized
                      />
                      <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1 shadow-md">
                        <QrCode className="h-3.5 w-3.5" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
