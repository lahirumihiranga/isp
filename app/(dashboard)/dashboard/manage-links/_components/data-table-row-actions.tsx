"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import type { Row } from "@tanstack/react-table";
import { CircleAlertIcon, Link2, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { deleteSecureLink } from "@/app/actions/secure-link-actions";
import { useRouter } from "next/navigation";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onDelete?: () => void; // Optional callback to refresh the table after deletion
}

export function DataTableRowActions<TData extends { id: string }>({
  row,
  onDelete,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const [copyDialogOpen, setCopyDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const form = useForm(); // Initialize form instance

  // Create the full URL for sharing
  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/s/${row.original.id}`;
  const [isCopied, setIsCopied] = useState(false);

  const copyLink = () => {
    // Open the dialog instead of directly copying
    setCopyDialogOpen(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      toast("Link copied to clipboard!");
    } catch (err) {
      toast("Failed to copy");
    } finally {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 500);
    }
  };

  const handleDelete = async () => {
    if (confirmText !== row.original.id) return;

    setIsDeleting(true);
    try {
      const success = await deleteSecureLink(row.original.id);
      if (success) {
        toast("Link deleted successfully");
        setDeleteDialogOpen(false);
        // Call the onDelete callback to refresh the table
        if (onDelete) onDelete();
        router.refresh();
        form.reset();
      } else {
        toast("Failed to delete link", {
          description: "Please try again later",
        });
      }
    } catch (error) {
      toast("An error occurred", {
        description: "Could not delete the link",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted cursor-pointer"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem className="cursor-pointer" onClick={copyLink}>
            Copy Link
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-destructive focus:text-destructive"
            onClick={() => setDeleteDialogOpen(true)}
          >
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Copy Link Dialog */}
      <Dialog open={copyDialogOpen} onOpenChange={setCopyDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Copy this link to share your secure content
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 mt-4">
            <div className="grid flex-1 gap-2">
              <div className="relative">
                <Input value={shareUrl} readOnly className="pr-12" />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1 h-7 w-7 px-0"
                  onClick={handleCopy}
                >
                  <span className="sr-only">Copy</span>
                </Button>
              </div>
            </div>
            <Button
              onClick={handleCopy}
              className="shrink-0 cursor-pointer"
              disabled={isCopied}
            >
              {isCopied ? "Copied" : "Copy"}
            </Button>
          </div>
          <div className="flex items-center pt-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
              <Link2 className="h-3 w-3" />
            </div>
            <div className="ml-2 text-[12px] text-muted-foreground">
              Anyone with this link will be able to view this content until it
              expires.
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <div className="flex flex-col items-center gap-2">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-full border bg-destructive/10 border-destructive/20"
              aria-hidden="true"
            >
              <CircleAlertIcon className="text-destructive" size={16} />
            </div>
            <DialogHeader>
              <DialogTitle className="sm:text-center">
                Delete secure link
              </DialogTitle>
              <DialogDescription className="sm:text-center">
                This action cannot be undone. To confirm, please enter the link
                ID{" "}
                <span className="font-medium text-foreground">
                  {row.original.id}
                </span>
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="space-y-5 mt-4">
            <div className="*:not-first:mt-2">
              <Label htmlFor="confirm-delete">Link ID</Label>
              <Input
                id="confirm-delete"
                type="text"
                placeholder={`Type ${row.original.id} to confirm`}
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 cursor-pointer"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="button"
                variant="destructive"
                className="flex-1 cursor-pointer"
                disabled={confirmText !== row.original.id || isDeleting}
                onClick={handleDelete}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
