"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, LinkIcon, QrCode, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export function UrlShortener() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const shortenUrl = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const randomString = Math.random().toString(36).substring(2, 8)
      setShortUrl(`https://linksnip.io/${randomString}`)
      setIsLoading(false)
    }, 1000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
    toast({
      title: "Copied to clipboard",
      description: "The shortened URL has been copied to your clipboard.",
    })
  }

  const downloadQrCode = () => {
    // Create a link element
    const link = document.createElement("a")
    link.href = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shortUrl)}`
    link.download = "qrcode.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "QR Code downloaded",
      description: "The QR code has been downloaded to your device.",
    })
  }

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
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            ) : (
              "Shorten"
            )}
          </Button>
        </div>

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
                        <Button variant="ghost" size="icon" onClick={copyToClipboard}>
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
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shortUrl)}`}
                            alt="QR Code for shortened URL"
                            width={200}
                            height={200}
                            className="w-full h-full object-contain"
                          />
                        </motion.div>
                      </div>

                      <div className="flex justify-center md:justify-start">
                        <Button variant="outline" size="sm" className="text-xs gap-1.5" onClick={downloadQrCode}>
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
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shortUrl)}`}
                          alt="QR Code for shortened URL"
                          width={200}
                          height={200}
                          className="w-full h-full object-contain"
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
      </motion.form>
    </div>
  )
}

