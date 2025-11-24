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
    <div className="flex-1 overflow-auto">
      <div className="max-w-2xl space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" prefetch>
            <Button variant="outline" size="icon" className="cursor-pointer">
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
  );
}
