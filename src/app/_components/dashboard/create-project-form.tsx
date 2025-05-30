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
import { api } from "~/trpc/react";

const regions = [
  { value: "us-east-1", label: "US East (N. Virginia)", flag: "🇺🇸" },
  { value: "us-west-2", label: "US West (Oregon)", flag: "🇺🇸" },
  { value: "eu-west-1", label: "Europe (Ireland)", flag: "🇪🇺" },
  { value: "eu-central-1", label: "Europe (Frankfurt)", flag: "🇪🇺" },
  { value: "ap-southeast-1", label: "Asia Pacific (Singapore)", flag: "🇸🇬" },
  { value: "ap-northeast-1", label: "Asia Pacific (Tokyo)", flag: "🇯🇵" },
];

export function CreateProjectForm() {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [selectedRegion] = useState("us-east-1");
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync, error } = api.project.createProject.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectName.trim()) {
      return;
    }

    setIsLoading(true);

    await mutateAsync({ name: projectName });

    setIsLoading(false);

    // Redirect to new only created project once project_details view is available
    if (!error) {
      router.push("/dashboard");
    } else {
      console.error(error);
    }
  };

  const selectedRegionData = regions.find(
    (region) => region.value === selectedRegion,
  );

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>
            Provide basic information about your new API project.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
              Choose a descriptive name for your API project.
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
                Region selection is currently disabled. All new projects will be
                created in US East (N. Virginia) for optimal performance.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard")}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={!projectName.trim() || isLoading}>
            {isLoading ? "Creating Project..." : "Create Project"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
