import DashboardBody from "@/components/dashboard/dashboard-body";
import { PageHeader } from "@/components/page-header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkSnip - Dashboard",
  description: "Create and manage your shortened URLs",
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col py-8 pt-6">
      <div>
        <PageHeader
          heading="Dashboard"
          text="Create and manage your shortened URLs."
        />
        <DashboardBody />
      </div>
    </div>
  );
}
