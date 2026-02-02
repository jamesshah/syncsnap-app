import { Card, CardContent } from "~/components/ui/card";
import { ApiKeyCard } from "~/app/_components/project/api-key-card";
import type { ApiKey } from "~/server/db/schema";

interface ApiKeysListProps {
  projectId: string;
  apiKeys: ApiKey[];
}

/**
 * Creates a base64 encoded JSON payload with apiKey and projectId (server-safe)
 */
function createApiKeyPayload(apiKey: string, projectId: string): string {
  const payload = { apiKey, projectId };
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64");
}

export function ApiKeysList({ projectId, apiKeys }: ApiKeysListProps) {
  if (apiKeys.length === 0) {
    return (
      <div>
        <Card>
          <CardContent className="py-2">
            <p className="text-muted-foreground text-center">
              No API keys found. Create your first API key to get started.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {apiKeys.map((key) => {
        const isDecrypted = key.privateKey?.startsWith("sk_live_") ?? false;
        const encodedPayload =
          isDecrypted && key.privateKey
            ? createApiKeyPayload(key.privateKey, projectId)
            : null;

        return (
          <ApiKeyCard
            key={key.id}
            apiKeyId={key.id}
            projectId={projectId}
            name={key.name}
            createdAt={key.createdAt}
            encodedPayload={encodedPayload}
          />
        );
      })}
    </div>
  );
}
