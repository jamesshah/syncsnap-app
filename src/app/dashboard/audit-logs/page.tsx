import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { HydrateClient } from "~/trpc/server";
import { DashboardHeader } from "@/_components/dashboard/header";

export default async function AuditLogsPage() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  return (
    <HydrateClient>
      <div className="flex h-screen flex-col">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-7xl p-4 sm:p-6">
            <h1 className="mb-6 text-2xl font-bold">Audit Logs</h1>
            <p className="text-muted-foreground">
              View audit logs and activity history.
            </p>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
