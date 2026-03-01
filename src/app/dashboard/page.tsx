import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { api, HydrateClient } from "~/trpc/server";
import { DashboardHeader } from "@/_components/dashboard/header";
import { ProjectsList } from "@/_components/dashboard/projects-list";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  await api.project.getProjects.prefetch();

  return (
    <HydrateClient>
      <div className="flex h-screen flex-col">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-7xl p-4 sm:p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold">Projects</h1>
              <Link href={"/dashboard/new"} prefetch>
                <Button className="w-full cursor-pointer gap-2 sm:w-auto">
                  <Plus className="h-4 w-4" />
                  New Project
                </Button>
              </Link>
            </div>
            <ProjectsList />
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
