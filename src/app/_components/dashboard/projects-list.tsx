"use client";
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
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";

export function ProjectsList() {
  const projects = api.project.getProjects.useQuery();

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.data?.map((project) => (
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
    </div>
  );
}
