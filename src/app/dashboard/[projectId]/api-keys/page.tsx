import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { HydrateClient } from "~/trpc/server";
import { DashboardHeader } from "~/app/_components/dashboard/header";
import { api } from "~/trpc/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ApiKeysManagement } from "~/app/_components/project/api-keys-management";
import { ApiKeysList } from "~/app/_components/project/api-keys-list";

export default async function ApiKeysPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const session = await auth();
  const { projectId } = await params;

  if (!session.userId) {
    return redirect("/sign-in");
  }

  let project;
  let apiKeys;
  try {
    [project, apiKeys] = await Promise.all([
      api.project.getProject({ publicId: projectId }),
      api.apiKeys.getApiKeysByProjectId(projectId),
    ]);
  } catch {
    return notFound();
  }

  return (
    <HydrateClient>
      <div className="flex h-screen flex-col">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-7xl p-4 sm:p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/dashboard" prefetch>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to Dashboard</span>
                </Button>
              </Link>
              <div className="min-w-0">
                <h1 className="truncate text-2xl font-bold">{project.name}</h1>
                <p className="text-muted-foreground text-sm">API keys</p>
              </div>
            </div>
            <ApiKeysManagement projectId={projectId}>
              <ApiKeysList apiKeys={apiKeys} projectId={projectId} />
            </ApiKeysManagement>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
