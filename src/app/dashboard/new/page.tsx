import { CreateProjectForm } from "@/_components/dashboard/create-project-form";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewProjectPage() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-2xl p-4 sm:p-6">
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
            <div>
              <h1 className="text-2xl font-bold">Create New Project</h1>
            </div>
          </div>
          <CreateProjectForm />
        </div>
      </div>
    </div>
  );
}
