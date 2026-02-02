"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertAction } from "@/components/ui/alert";
import { X } from "lucide-react";

/** User-friendly messages for project API errors */
const PROJECT_ERROR_MESSAGES: Record<string, string> = {
  BAD_REQUEST: "Invalid request. Please check your input.",
  NOT_FOUND: "Project was not found.",
  CONFLICT: "A project with this name already exists.",
  INTERNAL_SERVER_ERROR: "Something went wrong. Please try again later.",
};

function getErrorMessage(error: unknown): string | null {
  if (!error || typeof error !== "object") return null;

  const err = error as { message?: string; data?: { code?: string } | null };
  const code = err.data?.code ?? null;
  const message = (err.message ?? "").trim();

  // Use mapped message for INTERNAL_SERVER_ERROR (generic server message)
  if (code === "INTERNAL_SERVER_ERROR") {
    return (
      PROJECT_ERROR_MESSAGES.INTERNAL_SERVER_ERROR ??
      "Something went wrong. Please try again later."
    );
  }

  // Use server message for other codes (already user-friendly)
  if (message) return message;

  const fallback =
    code && code in PROJECT_ERROR_MESSAGES
      ? PROJECT_ERROR_MESSAGES[code]
      : null;
  return fallback ?? "An unexpected error occurred.";
}

export interface ProjectErrorAlertProps {
  /** TRPC mutation error (has message and data?.code) */
  error: unknown;
  /** Called when the error should be dismissed (e.g. reset mutation) */
  onDismiss: () => void;
  /** Auto-dismiss after this many ms. Set to 0 to disable. Default: 3000 */
  autoDismissMs?: number;
}

export function ProjectErrorAlert({
  error,
  onDismiss,
  autoDismissMs = 3000,
}: ProjectErrorAlertProps) {
  const displayMessage = getErrorMessage(error);

  useEffect(() => {
    if (!error || autoDismissMs <= 0) return;

    const timer = setTimeout(() => {
      onDismiss();
    }, autoDismissMs);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run when error appears
  }, [error]);

  if (!displayMessage) return null;

  return (
    <Alert variant="destructive" className="relative pr-10">
      <AlertDescription>{displayMessage}</AlertDescription>
      <AlertAction className="top-1/2 -translate-y-1/2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={(e) => {
            e.preventDefault();
            onDismiss();
          }}
          aria-label="Dismiss error"
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertAction>
    </Alert>
  );
}
