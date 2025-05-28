import Link from "next/link";
import { ArrowUpRight, MoreHorizontal } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Badge } from "~/components/ui/badge";
import type { Projects } from "~/server/db/schema";
import { api } from "~/trpc/server";

export async function ProjectsList() {
  const filteredProjects: Projects[] = await api.project.getProjects();

  return (
    <div className="space-y-6">
      {/* <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div className="relative w-full sm:w-64">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search projects..."
            className="pl-8"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.currentTarget.value)
            }
          />
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div> */}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
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
                    {/* <CardDescription>{project.}</CardDescription> */}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Project</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate Project</DropdownMenuItem>
                      <DropdownMenuItem>Archive Project</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-2">
                  {/* <Badge
                  variant={
                    project.status === "active" ? "default" : "secondary"
                  }
                >
                  {project.status}
                </Badge> */}
                  <span className="text-muted-foreground text-xs">
                    Created {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {/* <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs">
                    API Calls (24h)
                  </p>
                  <p className="text-xl font-bold">
                    {project.apiCalls24h.toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs">Success Rate</p>
                  <p className="text-xl font-bold">{project.successRate}%</p>
                </div>
              </div> */}
              </CardContent>
              {/* <CardFooter className="pt-2">
                <Link href={`/dashboard/${project.id}`} passHref>
                  <Button variant="outline" className="w-full gap-2">
                    View Dashboard
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter> */}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
