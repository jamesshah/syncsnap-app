import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { HydrateClient } from "~/trpc/server";
import { DashboardHeader } from "@/_components/dashboard/header";
import { Badge } from "~/components/ui/badge";

export default async function AuditLogsPage() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  return (
    <HydrateClient>
      <div className="flex h-screen flex-col">
        <DashboardHeader />
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="container mx-auto max-w-7xl p-4 sm:p-6">
            <div className="mb-6 flex items-center gap-2">
              <h1 className="text-2xl font-bold">Audit Logs</h1>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center px-4">
            <div className="border-primary/20 bg-primary/5 rounded-lg border border-dashed p-12 text-center md:p-16">
              <h2 className="mb-2 text-xl font-semibold">Audit Logs</h2>
              <p className="text-muted-foreground mb-4 max-w-md">
                View audit logs and activity history across your projects.
              </p>
              <Badge
                variant="outline"
                className="rounded-full border-amber-500/30 bg-amber-500/10 px-3 py-1 text-amber-700 dark:text-amber-400"
              >
                Coming soon
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
