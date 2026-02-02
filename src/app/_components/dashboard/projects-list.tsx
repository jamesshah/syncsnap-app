import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { api } from "~/trpc/server";

export async function ProjectsList() {
  const projects = await api.project.getProjects();
  const hasProjects = projects.length > 0;

  return (
    <div className="space-y-6">
      {!hasProjects && (
        <div className="text-muted-foreground rounded-lg border border-dashed p-12 text-center">
          <p className="text-lg font-medium">No projects yet</p>
          <p className="mt-1 text-sm">
            Create your first project to get started.
          </p>
        </div>
      )}
      {hasProjects && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.publicId}
              href={`/dashboard/${project.publicId}`}
              passHref
            >
              <Card className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle>{project.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={project.isDeleted ? "destructive" : "default"}
                    >
                      {project.isDeleted ? "Deleted" : "Active"}
                    </Badge>
                    <span className="text-muted-foreground text-xs">
                      Created {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
