import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { HydrateClient } from "~/trpc/server";
import { DashboardHeader } from "@/_components/dashboard/header";
import { api } from "~/trpc/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";

export default async function ProjectFilesPage({
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
  try {
    project = await api.project.getProject({ publicId: projectId });
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
                <Button variant="outline" size="icon" className="shrink-0">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to Dashboard</span>
                </Button>
              </Link>
              <div className="min-w-0">
                <h1 className="truncate text-2xl font-bold">{project.name}</h1>
                <p className="text-muted-foreground text-sm">
                  Project details and settings
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Files</h2>
              <p className="text-muted-foreground">
                Manage and view all files uploaded to this project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
