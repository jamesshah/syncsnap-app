import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { HydrateClient } from "~/trpc/server";
import { ProjectsList } from "@/_components/dashboard/projects-list";
import { Suspense } from "react";
import Loading from "./loading";

export default async function DashboardPage() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  return (
    <HydrateClient>
      <div>
        <Suspense fallback={<Loading />}>
          <ProjectsList />
        </Suspense>
      </div>
    </HydrateClient>
  );
}
