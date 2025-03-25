import { getCookies } from "@/app/actions/actions";
import AnalyticsBody from "@/components/analytics/analytics-body";
import { PageHeader } from "@/components/page-header";

export default async function AnalyticsPage() {
  const token = await getCookies();
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 space-y-4  pt-6">
        <div className="container">
          <PageHeader
            heading="Analytics"
            text="View detailed analytics for your shortened URLs."
          />
          <AnalyticsBody token={token} />
        </div>
      </main>
    </div>
  );
}
