"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { api } from "~/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { Button } from "~/components/ui/button";

interface ApiKeysListProps {
  projectId: string;
}

/**
 * Creates a base64 encoded JSON payload with apiKey and projectId
 */
function createApiKeyPayload(apiKey: string, projectId: string): string {
  const payload = {
    apiKey: apiKey,
    projectId: projectId,
  };
  const jsonString = JSON.stringify(payload);
  // Use btoa for browser-compatible base64 encoding
  return btoa(jsonString);
}

export function ApiKeysList({ projectId }: ApiKeysListProps) {
  const {
    data: apiKeys,
    isLoading,
    error,
  } = api.apiKeys.getApiKeysByProjectId.useQuery(projectId);

  if (isLoading) {
    return (
      <div className="space-y-4 p-6">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-destructive">
              Error loading API keys: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!apiKeys || apiKeys.length === 0) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">
              No API keys found. Create your first API key to get started.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-6">
      {apiKeys.map((key) => {
        // Check if the key is decrypted (decrypted keys start with "sk_live_")
        // Encrypted keys have the format "iv:encryptedData:authTag"
        const isDecrypted = key.privateKey?.startsWith("sk_live_") ?? false;

        // Only create payload if we have a decrypted key
        const encodedPayload =
          isDecrypted && key.privateKey
            ? createApiKeyPayload(key.privateKey, projectId)
            : null;

        return (
          <ApiKeyCard
            key={key.id}
            name={key.name}
            createdAt={key.createdAt}
            encodedPayload={encodedPayload}
          />
        );
      })}
    </div>
  );
}

function ApiKeyCard({
  name,
  createdAt,
  encodedPayload,
}: {
  name: string;
  createdAt: Date;
  encodedPayload: string | null;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!encodedPayload) return;

    try {
      await navigator.clipboard.writeText(encodedPayload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          Created {new Date(createdAt).toLocaleDateString()}
        </CardDescription>
        {encodedPayload && (
          <CardAction>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <p className="text-muted-foreground text-sm font-medium">API Key</p>
            {encodedPayload ? (
              <p className="mt-1 font-mono text-sm break-all">
                {encodedPayload}
              </p>
            ) : (
              <p className="text-muted-foreground text-sm italic">
                Key unavailable or not decrypted
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
