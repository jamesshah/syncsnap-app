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
        <div className="text-muted-foreground rounded-xl border border-dashed border-border/60 bg-card/60 p-12 text-center">
          <p className="text-lg font-medium">No projects yet</p>
          <p className="mt-1 text-sm">
            Create your first project to get started.
          </p>
        </div>
      )}
      {hasProjects && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.publicId}
              href={`/dashboard/${project.publicId}`}
              passHref
            >
              <Card className="bg-card/80 border-border/70 overflow-hidden rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
                <CardHeader className="border-border/60 border-b pb-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-sm font-semibold">
                        {project.name}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3 pt-3">
                  <div className="flex items-center gap-2 text-xs">
                    <Badge
                      variant={project.isDeleted ? "destructive" : "default"}
                    >
                      {project.isDeleted ? "Deleted" : "Active"}
                    </Badge>
                    <span className="text-muted-foreground">
                      Created{" "}
                      {new Date(project.createdAt).toLocaleDateString()}
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
