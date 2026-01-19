"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

interface UploadFormProps {
  jobId: string;
}

type PresignedResponse = { url: string; fileName: string; expiration: string };

export function UploadForm({ jobId }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) return;

    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch(
        `/api/upload/presigned-url?job_id=${encodeURIComponent(jobId)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file_name: file.name }),
        }
      );

      const data = (await res.json()) as { error?: string } | PresignedResponse;

      if (!res.ok) {
        setError(
          (data as { error?: string }).error ?? "Failed to get upload URL"
        );
        return;
      }

      const { url } = data as PresignedResponse;
      if (!url) {
        setError("Invalid response from server");
        return;
      }

      // PUT directly to S3. The bucket must have CORS configured to allow your app's origin.
      const putRes = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type || "application/octet-stream",
        },
      });

      if (!putRes.ok) {
        setError("Upload to storage failed. Please try again.");
        return;
      }

      setUploaded(true);
      setFile(null);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (uploaded) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Upload complete 🎉</CardTitle>
          <CardDescription>
            Your file has been uploaded. You may close this page.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Upload your file</CardTitle>
        <CardDescription>
          Choose a file and submit.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">File</Label>
            <Input
              id="file"
              type="file"
              accept="*/*"
              disabled={isLoading}
              onChange={(e) => {
                setFile(e.target.files?.[0] ?? null);
                setError(null);
              }}
              className="cursor-pointer"
            />
          </div>
          <Button
            type="submit"
            disabled={!file || isLoading}
            size="lg"
            className="w-full"
          >
            {isLoading ? "Uploading…" : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
