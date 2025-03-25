import DashboardBody from "@/components/dashboard/dashboard-body";
import { PageHeader } from "@/components/page-header";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  return (
    <div className="flex min-h-screen flex-col py-8 pt-6">
      <div>
        <PageHeader
          heading="Dashboard"
          text="Create and manage your shortened URLs."
        />
        <DashboardBody token={token} />
      </div>
    </div>
  );
}
