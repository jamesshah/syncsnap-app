import { CreateProjectForm } from "@/_components/dashboard/create-project-form";
import { DashboardHeader } from "@/_components/dashboard/header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewProjectPage() {
  return (
    <div className="flex h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-2xl p-4 sm:p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/dashboard" prefetch>
              <Button variant="outline" size="icon" className="shrink-0 cursor-pointer">
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
