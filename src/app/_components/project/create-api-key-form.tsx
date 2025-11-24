"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";

interface CreateApiKeyFormProps {
  open: boolean;
  projectId: string;
  onOpenChange: (open: boolean) => void;
}

export function CreateApiKeyForm({
  open,
  projectId,
  onOpenChange,
}: CreateApiKeyFormProps) {
  const [keyName, setKeyName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const utils = api.useUtils();
  const { mutateAsync } = api.apiKeys.createApiKey.useMutation({
    onSuccess: () => {
      // Invalidate and refetch the API keys list
      void utils.apiKeys.getApiKeysByProjectId.invalidate(projectId);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!keyName.trim()) {
      return;
    }

    setIsCreating(true);
    try {
      const newApiKeyId = await mutateAsync({
        name: keyName,
        projectId: projectId,
      });

      // toast.success("New API key created successfully");
      console.log("New API key created successfully", newApiKeyId);
      setIsCreating(false);
      onOpenChange(false);
      setKeyName("");
      // router.push(`/dashboard/${projectId}/api-keys`);
    } catch (err) {
      console.error("Error creating API key:", err);
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new key</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="key-name">Name</Label>
            <p className="text-muted-foreground text-xs">
              Select a name to identify the key in the dashboard.
            </p>
            <Input
              id="key-name"
              placeholder="Enter key name"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              autoFocus
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!keyName.trim() || isCreating}>
              {isCreating ? "Creating..." : "Create Key"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
