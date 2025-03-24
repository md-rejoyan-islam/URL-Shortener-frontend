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
import { analyticUrls } from "@/lib/url-api";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ClickLocation {
  country: string;
  clicks: number;
}

interface ClickDevice {
  name: "mobile" | "desktop" | "tablet" | "unknown";
  value: number;
}

interface TopPerformingLink {
  _id: string;
  shortUrl: string;
  clickCount: number;
}
interface last15DaysClicks {
  date: string;
  clicks: number;
}

interface AnalyticsData {
  activeLinks: number;
  activePercentage: number;
  avgClickRate: number;
  lastMonthClicks: number;
  percentageChange: number;
  totalClicks: number;
  totalLinks: number;
  topLink: TopPerformingLink;
  locationClicks: ClickLocation[];
  deviceClicks: ClickDevice[];
  last15DaysClicks: last15DaysClicks[];
}

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
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );

  console.log(analyticsData);

  useEffect(() => {
    const fetchData = async () => {
      const response = await analyticUrls();

      setAnalyticsData(response?.data);
    };

    fetchData();
  }, []);

  const lastMonthClicksPercentage = (
    ((analyticsData?.totalClicks || 0) -
      (analyticsData?.lastMonthClicks || 0)) /
    (analyticsData?.lastMonthClicks || 0)
  ).toFixed(2);

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
                  <div className="text-2xl font-bold">
                    {analyticsData?.totalClicks || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {+lastMonthClicksPercentage > 0 ? "+" : "-"}
                    {lastMonthClicksPercentage}% from last month
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
                  <div className="text-2xl font-bold">
                    {analyticsData?.activeLinks || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {+(analyticsData?.lastMonthClicks || 0) > 0 ? "+" : "-"}
                    {analyticsData?.lastMonthClicks || 0} from last month
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
                  <div className="text-2xl font-bold">
                    {analyticsData?.avgClickRate || 0}%
                  </div>
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
                  <div className="text-2xl font-bold">
                    {analyticsData?.topLink?.clickCount}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    clicks on {analyticsData?.topLink?.shortUrl}
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
                  Click activity for all your links over the past 15 days
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ClicksChart
                  daysClick={analyticsData?.last15DaysClicks?.sort(
                    (a, b) =>
                      new Date(a.date).getDate() - new Date(b.date).getDate()
                  )}
                />
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
                <GeoChart locations={analyticsData?.locationClicks} />
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
                <DevicesChart deviceClicks={analyticsData?.deviceClicks} />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </>
  );
}
