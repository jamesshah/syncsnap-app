"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Copy,
  Check,
  Eye,
  EyeOff,
  MoreVertical,
  RefreshCw,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { RollKeyDialog } from "~/app/_components/project/roll-key-dialog";
import { DeleteKeyDialog } from "~/app/_components/project/delete-key-dialog";
import { api } from "~/trpc/react";

const MASKED_KEY_LENGTH = 12;
const DELETE_CONFIRMATION_TEXT = "DELETE";

interface ApiKeyCardProps {
  apiKeyId: string;
  projectId: string;
  name: string;
  createdAt: Date;
  encodedPayload: string | null;
}

export function ApiKeyCard({
  apiKeyId,
  projectId,
  name,
  createdAt,
  encodedPayload,
}: ApiKeyCardProps) {
  const router = useRouter();
  const cardActionRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showRollDialog, setShowRollDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const handleCloseAutoFocus = (e: Event) => {
    e.preventDefault();
    setTimeout(() => {
      const menuButton = cardActionRef.current?.querySelector(
        "[data-menu-trigger]",
      );
      if (menuButton instanceof HTMLElement) menuButton.focus();
    }, 0);
  };

  const openRollDialog = () => setTimeout(() => setShowRollDialog(true), 0);
  const openDeleteDialog = () => setTimeout(() => setShowDeleteDialog(true), 0);

  const utils = api.useUtils();
  const rollMutation = api.apiKeys.rollApiKey.useMutation({
    onSuccess: async () => {
      void utils.apiKeys.getApiKeysByProjectId.invalidate(projectId);
      router.refresh();
      setShowRollDialog(false);
      setIsVisible(false);
      setCopied(false);
      await navigator.clipboard.writeText("");
    },
  });
  const deleteMutation = api.apiKeys.deleteApiKey.useMutation({
    onSuccess: () => {
      void utils.apiKeys.getApiKeysByProjectId.invalidate(projectId);
      router.refresh();
      setShowDeleteDialog(false);
      setDeleteConfirmText("");
    },
  });

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

  const handleRollConfirm = () => {
    rollMutation.mutate({ apiKeyId, projectId });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmText !== DELETE_CONFIRMATION_TEXT) return;
    deleteMutation.mutate({ apiKeyId, projectId });
  };

  const displayKey = encodedPayload
    ? isVisible
      ? encodedPayload
      : `${encodedPayload.slice(0, MASKED_KEY_LENGTH)}${"•".repeat(Math.max(0, encodedPayload.length - MASKED_KEY_LENGTH))}`
    : null;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>
            Created {new Date(createdAt).toLocaleDateString()}
          </CardDescription>
          <CardAction>
            <div ref={cardActionRef} className="flex gap-2">
              {encodedPayload && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsVisible(!isVisible)}
                    className="cursor-pointer"
                    title={isVisible ? "Hide API key" : "Show API key"}
                  >
                    {isVisible ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="cursor-pointer"
                    title="Copy key"
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
                </>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    data-menu-trigger
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                    title="More options"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onSelect={() => void handleCopy()}
                    disabled={!encodedPayload}
                    className="cursor-pointer"
                  >
                    {copied ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <Copy className="mr-2 h-4 w-4" />
                    )}
                    {copied ? "Copied" : "Copy key"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={openRollDialog}
                    disabled={rollMutation.isPending}
                    className="cursor-pointer"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Roll key
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={openDeleteDialog}
                    disabled={deleteMutation.isPending}
                    variant="destructive"
                    className="cursor-pointer"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete key
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                API Key
              </p>
              {displayKey ? (
                <pre className="bg-muted mt-1 overflow-x-auto rounded-lg border px-4 py-3">
                  <code className="font-mono text-sm">{displayKey}</code>
                </pre>
              ) : (
                <p className="text-muted-foreground mt-1 text-sm italic">
                  Key unavailable or not decrypted
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <RollKeyDialog
        open={showRollDialog}
        onOpenChange={setShowRollDialog}
        onConfirm={handleRollConfirm}
        isPending={rollMutation.isPending}
        onCloseAutoFocus={handleCloseAutoFocus}
      />

      <DeleteKeyDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteConfirm}
        isPending={deleteMutation.isPending}
        confirmText={deleteConfirmText}
        onConfirmTextChange={setDeleteConfirmText}
        onCloseAutoFocus={handleCloseAutoFocus}
      />
    </>
  );
}
