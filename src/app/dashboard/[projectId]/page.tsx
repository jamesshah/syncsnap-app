import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { api } from "~/trpc/server";
import { ProjectDashboard } from "~/app/_components/project/project-dashboard";
import { notFound } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  const project = await api.project.getProjectById(projectId);

  if (!project) {
    return notFound();
  }

  return (
    <Suspense fallback={<Loader2 />}>
      <div className="flex items-start justify-between p-6">
        <h1 className="mb-6 text-2xl font-bold">{project.name}</h1>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <ProjectDashboard project={project} />
      </div>
    </Suspense>
  );
}
