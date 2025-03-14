"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClicksChart } from "@/components/clicks-chart"
import { GeoChart } from "@/components/geo-chart"
import { ReferrersChart } from "@/components/referrers-chart"
import { DevicesChart } from "@/components/devices-chart"
import { motion } from "framer-motion"

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

export default function AnalyticsPage() {
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
      <DashboardHeader heading="Analytics" text="View detailed analytics for your shortened URLs." />
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
          <TabsTrigger value="referrers">Referrers</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item} className="glow-effect">
              <Card variant="glass" className="h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,350</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item} className="glow-effect">
              <Card variant="glass" className="h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+3 from last month</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item} className="glow-effect">
              <Card variant="glass" className="h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Click Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24.3%</div>
                  <p className="text-xs text-muted-foreground">+5.1% from last month</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item} className="glow-effect">
              <Card variant="glass" className="h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Performing Link</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">842</div>
                  <p className="text-xs text-muted-foreground">clicks on linksnip.io/abc123</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="glow-effect"
          >
            <Card className="col-span-4" variant="neon">
              <CardHeader>
                <CardTitle>Clicks Over Time</CardTitle>
                <CardDescription>Click activity for all your links over the past 30 days</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ClicksChart />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="geography" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glow-effect"
          >
            <Card className="col-span-4" variant="neon">
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Click distribution by country</CardDescription>
              </CardHeader>
              <CardContent>
                <GeoChart />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="referrers" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glow-effect"
          >
            <Card className="col-span-4" variant="neon">
              <CardHeader>
                <CardTitle>Top Referrers</CardTitle>
                <CardDescription>Sources that drive traffic to your links</CardDescription>
              </CardHeader>
              <CardContent>
                <ReferrersChart />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glow-effect"
          >
            <Card className="col-span-4" variant="neon">
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Types of devices used to access your links</CardDescription>
              </CardHeader>
              <CardContent>
                <DevicesChart />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

