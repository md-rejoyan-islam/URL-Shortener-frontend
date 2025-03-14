"use client"

import { BarChart3, LinkIcon, QrCode, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function Features() {
  return (
    <section className="container py-12 md:py-24 lg:py-32">
      <motion.div
        className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={item} className="glow-effect">
          <Card variant="feature" className="h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                <LinkIcon className="h-7 w-7 text-primary" />
              </div>
              <div className="space-y-2 flex-grow">
                <h3 className="font-bold text-xl">URL Shortening</h3>
                <p className="text-sm text-muted-foreground">Create short links that are easy to share and remember.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="glow-effect">
          <Card variant="feature" className="h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                <QrCode className="h-7 w-7 text-primary" />
              </div>
              <div className="space-y-2 flex-grow">
                <h3 className="font-bold text-xl">QR Codes</h3>
                <p className="text-sm text-muted-foreground">
                  Generate QR codes for your shortened links for easy mobile access.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="glow-effect">
          <Card variant="feature" className="h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                <BarChart3 className="h-7 w-7 text-primary" />
              </div>
              <div className="space-y-2 flex-grow">
                <h3 className="font-bold text-xl">Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Track clicks, geographic data, and referrers for your links.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="glow-effect">
          <Card variant="feature" className="h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <div className="space-y-2 flex-grow">
                <h3 className="font-bold text-xl">Secure Links</h3>
                <p className="text-sm text-muted-foreground">
                  All links are secured with HTTPS and protected from spam.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}

