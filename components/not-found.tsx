"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AlertCircle, Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="h-screen">
      <main className="flex-1 container min-h-screen flex flex-col items-center justify-center py-20">
        <motion.div
          className="w-full max-w-md mx-auto h-full text-center space-y-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    rotate: [0, -5, 5, -5, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    repeatDelay: 1,
                  }}
                  className="w-32 h-32 flex items-center justify-center bg-primary/10 rounded-full"
                >
                  <AlertCircle className="h-16 w-16 text-primary" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center"
                >
                  4
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -bottom-2 -right-2 bg-destructive text-destructive-foreground text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center"
                >
                  0
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="absolute -bottom-2 -left-2 bg-destructive text-destructive-foreground text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center"
                >
                  4
                </motion.div>
              </div>
            </motion.div>

            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">
                Link Not Found
              </h1>
              <p className="text-muted-foreground">
                The shortened URL you&apos;re looking for doesn&apos;t exist or
                has expired.
              </p>
            </div>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button asChild variant="default" className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link href="/#">
                <Search className="h-4 w-4" />
                Create New Link
              </Link>
            </Button>
          </motion.div>

          <motion.div
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p>
              Need help?{" "}
              <Link href="#" className="text-primary hover:underline">
                Contact Support
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
