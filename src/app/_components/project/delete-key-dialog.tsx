"use client";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const DELETE_CONFIRMATION_TEXT = "DELETE";

interface DeleteKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending: boolean;
  confirmText: string;
  onConfirmTextChange: (value: string) => void;
  onCloseAutoFocus?: (event: Event) => void;
}

export function DeleteKeyDialog({
  open,
  onOpenChange,
  onConfirm,
  isPending,
  confirmText,
  onConfirmTextChange,
  onCloseAutoFocus,
}: DeleteKeyDialogProps) {
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      onConfirmTextChange("");
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent onCloseAutoFocus={onCloseAutoFocus}>
        <DialogHeader>
          <DialogTitle>Delete API key</DialogTitle>
          <DialogDescription>
            Deleting this key is permanent. Any applications using it will stop
            working. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="delete-confirm">
              Type <span className="font-mono font-semibold">DELETE</span> to
              confirm
            </Label>
            <Input
              id="delete-confirm"
              placeholder="Type DELETE"
              value={confirmText}
              onChange={(e) => onConfirmTextChange(e.target.value)}
              className="font-mono"
              autoComplete="off"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={confirmText !== DELETE_CONFIRMATION_TEXT || isPending}
          >
            {isPending ? "Deleting..." : "Delete key"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
