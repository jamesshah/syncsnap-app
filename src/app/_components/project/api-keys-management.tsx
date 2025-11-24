"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { CreateApiKeyForm } from "~/app/_components/project/create-api-key-form";
import { ApiKeysList } from "~/app/_components/project/api-keys-list";

export function ApiKeysManagement({ projectId }: { projectId: string }) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <>
      <div className="flex-1 overflow-auto">
        <div className="space-y-6">
          <div className="flex items-start justify-between overflow-auto p-6">
            <div>
              <h1 className="text-2xl font-bold">API Keys</h1>
              <p className="text-muted-foreground">
                View and manage API keys for your project.
              </p>
            </div>
            <Button
              className="cursor-pointer gap-2"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus className="h-4 w-4" />
              New API Key
            </Button>
          </div>
          <ApiKeysList projectId={projectId} />
        </div>
      </div>

      <CreateApiKeyForm
        open={showCreateDialog}
        projectId={projectId}
        onOpenChange={setShowCreateDialog}
      />
    </>
  );
}
