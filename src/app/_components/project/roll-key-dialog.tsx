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

interface RollKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending: boolean;
  onCloseAutoFocus?: (event: Event) => void;
}

export function RollKeyDialog({
  open,
  onOpenChange,
  onConfirm,
  isPending,
  onCloseAutoFocus,
}: RollKeyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onCloseAutoFocus={onCloseAutoFocus}>
        <DialogHeader>
          <DialogTitle>Roll API key</DialogTitle>
          <DialogDescription>
            Rolling this key will invalidate the current key and generate a new
            one. Any applications using the old key will stop working. This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? "Rolling..." : "Roll key"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
