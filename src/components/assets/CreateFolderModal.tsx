"use client";

import { useState } from "react";
import { FolderPlus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CreateFolderValues {
  name: string;
  description: string;
  color?: string;
}

interface CreateFolderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate?: (folder: CreateFolderValues) => void;
}

export default function CreateFolderModal({
  open,
  onOpenChange,
  onCreate,
}: CreateFolderModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const reset = () => {
    setName("");
    setDescription("");
  };

  const handleCreate = () => {
    if (!name.trim()) return;

    onCreate?.({
      name: name.trim(),
      description: description.trim(),
    });

    reset();
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) reset();
        onOpenChange(value);
      }}
    >
      <DialogContent className="max-w-lg rounded-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderPlus className="h-5 w-5 text-indigo-600" />
            Create Folder
          </DialogTitle>

          <DialogDescription>
            Organize your assets into folders for easier management.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="folder-name">
              Folder Name
            </Label>

            <Input
              id="folder-name"
              placeholder="e.g. Marketing Assets"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="folder-description">
              Description
            </Label>

            <Textarea
              id="folder-description"
              placeholder="Optional description..."
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            disabled={!name.trim()}
            onClick={handleCreate}
          >
            Create Folder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}