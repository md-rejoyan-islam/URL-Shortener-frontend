import DashboardBody from "@/components/dashboard/dashboard-body";
import { PageHeader } from "@/components/page-header";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="">
          <PageHeader
            heading="Dashboard"
            text="Create and manage your shortened URLs."
          />
          <DashboardBody />
        </div>
      </main>
    </div>
  );
}
