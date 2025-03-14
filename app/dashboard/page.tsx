"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { UrlList } from "@/components/url-list"
import { UrlShortener } from "@/components/url-shortener"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Create and manage your shortened URLs." />
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="col-span-full" variant="neon">
          <CardHeader>
            <CardTitle>Create New Link</CardTitle>
            <CardDescription>Enter a long URL to create a shortened link.</CardDescription>
          </CardHeader>
          <CardContent>
            <UrlShortener />
          </CardContent>
        </Card>
        <Card className="col-span-full" variant="neon">
          <CardHeader>
            <CardTitle>Your Links</CardTitle>
            <CardDescription>Manage and track your shortened URLs.</CardDescription>
          </CardHeader>
          <CardContent>
            <UrlList />
          </CardContent>
        </Card>
      </motion.div>
    </DashboardShell>
  )
}

