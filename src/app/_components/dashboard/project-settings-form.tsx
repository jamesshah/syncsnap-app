"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Globe, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ProjectErrorAlert } from "@/components/project-error-alert";
import { api } from "~/trpc/react";
import { DeleteProjectDialog } from "~/app/_components/project/delete-project-dialog";

const regions = [
  { value: "us-east-1", label: "US East (N. Virginia)", flag: "🇺🇸" },
  { value: "us-west-2", label: "US West (Oregon)", flag: "🇺🇸" },
  { value: "eu-west-1", label: "Europe (Ireland)", flag: "🇪🇺" },
  { value: "eu-central-1", label: "Europe (Frankfurt)", flag: "🇪🇺" },
  { value: "ap-southeast-1", label: "Asia Pacific (Singapore)", flag: "🇸🇬" },
  { value: "ap-northeast-1", label: "Asia Pacific (Tokyo)", flag: "🇯🇵" },
];

interface ProjectSettingsFormProps {
  projectId: string;
  initialName: string;
}

export function ProjectSettingsForm({
  projectId,
  initialName,
}: ProjectSettingsFormProps) {
  const router = useRouter();
  const [projectName, setProjectName] = useState(initialName);
  const [selectedRegion] = useState("us-east-1");
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const utils = api.useUtils();

  const updateMutation = api.project.updateProject.useMutation({
    onSuccess: () => {
      void utils.project.getProject.invalidate({ publicId: projectId });
      void utils.project.getProjects.invalidate();
    },
  });

  const deleteMutation = api.project.deleteProject.useMutation({
    onSuccess: () => {
      void utils.project.getProjects.invalidate();
      router.push("/dashboard");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectName.trim()) {
      return;
    }

    setIsUpdateLoading(true);
    try {
      await updateMutation.mutateAsync({
        publicId: projectId,
        name: projectName.trim(),
      });
    } finally {
      setIsUpdateLoading(false);
    }
  };

  const handleDelete = async () => {
    await deleteMutation.mutateAsync({ publicId: projectId });
    setDeleteDialogOpen(false);
  };

  const selectedRegionData = regions.find(
    (region) => region.value === selectedRegion,
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Update your project settings and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ProjectErrorAlert
              error={updateMutation.error}
              onDismiss={() => updateMutation.reset()}
            />
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name *</Label>
              <Input
                id="project-name"
                placeholder="Enter project name"
                value={projectName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setProjectName(e.target.value)
                }
                required
              />
              <p className="text-muted-foreground text-xs">
                Choose a descriptive name for your project.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select value={selectedRegion} disabled>
                <SelectTrigger id="region" className="w-full">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>{selectedRegionData?.flag}</span>
                      <span>{selectedRegionData?.label}</span>
                      <Badge variant="secondary" className="ml-auto">
                        {selectedRegionData?.value}
                      </Badge>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      <div className="flex items-center gap-2">
                        <span>{region.flag}</span>
                        <span>{region.label}</span>
                        <Badge variant="outline" className="ml-auto">
                          {region.value}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Region selection is currently disabled. All projects use US
                  East (N. Virginia) for optimal performance.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              disabled={
                !projectName.trim() ||
                projectName.trim() === initialName ||
                isUpdateLoading
              }
            >
              {isUpdateLoading ? "Saving..." : "Save changes"}
            </Button>
          </CardFooter>
        </Card>
      </form>

      <div className="mt-8">
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Permanently delete this project and all associated data. This
              action cannot be undone.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              type="button"
              variant="destructive"
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete project
            </Button>
          </CardFooter>
        </Card>
      </div>

      <DeleteProjectDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
        confirmText={deleteConfirmText}
        onConfirmTextChange={setDeleteConfirmText}
      />
    </>
  );
}
