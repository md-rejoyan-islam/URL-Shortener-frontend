"use client";

import { DevicesChart } from "@/components/analytics/devices-chart";
import { GeoChart } from "@/components/analytics/geo-chart";
import { ClicksChart } from "@/components/clicks-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};
export default function AnalyticsBody() {
  return (
    <>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6  pb-10">
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item} className="glow-effect">
              <Card
                variant="glass"
                className="h-full border-blue-200/50 shadow-[1px] hover:border-blue-200 hover:bg-gradient-to-br from-blue-100/40 to-blue-50/20 transition-all duration-100 dark:border-violet-500/20 dark:hover:bg-gradient-to-br dark:from-violet-500/5  dark:to-violet-500/10"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Clicks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,350</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item} className="glow-effect">
              <Card
                variant="glass"
                className="h-full border-blue-200/50 shadow-[1px] hover:border-blue-200 hover:bg-gradient-to-br from-blue-100/40 to-blue-50/20 transition-all duration-100 dark:border-violet-500/20 dark:hover:bg-gradient-to-br dark:from-violet-500/5  dark:to-violet-500/10"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    +3 from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item} className="glow-effect">
              <Card
                variant="glass"
                className="h-full border-blue-200/50 shadow-[1px] hover:border-blue-200 hover:bg-gradient-to-br from-blue-100/40 to-blue-50/20 transition-all duration-100 dark:border-violet-500/20 dark:hover:bg-gradient-to-br dark:from-violet-500/5  dark:to-violet-500/10 "
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Avg. Click Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24.3%</div>
                  <p className="text-xs text-muted-foreground">
                    +5.1% from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item} className="glow-effect">
              <Card
                variant="glass"
                className="h-full border-blue-200/50 shadow-[1px] hover:border-blue-200 hover:bg-gradient-to-br from-blue-100/40 to-blue-50/20 transition-all duration-100 dark:border-violet-500/20 dark:hover:bg-gradient-to-br dark:from-violet-500/5  dark:to-violet-500/10"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Top Performing Link
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">842</div>
                  <p className="text-xs text-muted-foreground">
                    clicks on linksnip.io/abc123
                  </p>
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
            <Card
              className="col-span-4 h-full border-blue-200/50 shadow-[1px] hover:border-blue-200 hover:bg-gradient-to-br from-blue-100/40 to-blue-50/20 transition-all duration-100 dark:border-violet-500/20 dark:hover:bg-gradient-to-br dark:from-violet-500/5  dark:to-violet-500/10"
              variant="neon"
            >
              <CardHeader>
                <CardTitle>Clicks Over Time</CardTitle>
                <CardDescription>
                  Click activity for all your links over the past 30 days
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ClicksChart />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="geography" className="space-y-4 pb-10">
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

        <TabsContent value="devices" className="space-y-4 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glow-effect"
          >
            <Card className="col-span-4" variant="neon">
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>
                  Types of devices used to access your links
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DevicesChart />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </>
  );
}
