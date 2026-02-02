"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { CreateApiKeyForm } from "~/app/_components/project/create-api-key-form";

interface ApiKeysManagementProps {
  projectId: string;
  children: React.ReactNode;
}

export function ApiKeysManagement({
  projectId,
  children,
}: ApiKeysManagementProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">API Keys</h2>
            <p className="text-muted-foreground">
              View and manage API keys for your project.
            </p>
          </div>
          <Button
            className="shrink-0 cursor-pointer gap-2"
            onClick={() => setShowCreateDialog(true)}
          >
            <Plus className="h-4 w-4" />
            New API Key
          </Button>
        </div>
        {children}
      </div>

      <CreateApiKeyForm
        open={showCreateDialog}
        projectId={projectId}
        onOpenChange={setShowCreateDialog}
      />
    </>
  );
}
