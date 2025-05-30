import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { HydrateClient } from "~/trpc/server";
import { DashboardHeader } from "@/_components/dashboard/header";
import { ProjectsList } from "@/_components/dashboard/projects-list";
import { Button } from "~/components/ui/button";
import { Loader, Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function DashboardPage() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  return (
    <HydrateClient>
      <div className="flex h-screen flex-col">
        <DashboardHeader />
        <div className="flex items-start justify-between overflow-auto p-6">
          <h1 className="mb-6 text-2xl font-bold">Projects</h1>
          <Link href={"/dashboard/new"} prefetch>
            <Button className="cursor-pointer gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </Link>
        </div>
        <div className="px-6">
          {/* <Suspense fallback={<Loader />}> */}
          <ProjectsList />
          {/* </Suspense> */}
        </div>
      </div>
    </HydrateClient>
  );
}
