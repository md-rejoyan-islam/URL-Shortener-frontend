import AnalyticsBody from "@/components/analytics/analytics-body";
import { PageHeader } from "@/components/page-header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkSnip - Analytics",
  description: "View detailed analytics for your shortened URLs",
};

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 space-y-4  pt-6">
        <div className="container">
          <PageHeader
            heading="Analytics"
            text="View detailed analytics for your shortened URLs."
          />
          <AnalyticsBody />
        </div>
      </main>
    </div>
  );
}
