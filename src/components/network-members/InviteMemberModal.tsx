"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InviteMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function InviteMemberModal({
  open,
  onOpenChange,
}: InviteMemberModalProps) {
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "Viewer",
    message: "",
  });

  const update = (
    key: keyof typeof values,
    value: string
  ) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleInvite = async () => {
    setLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 1200)
    );

    setLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-hidden sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Invite Network Member</DialogTitle>
        </DialogHeader>

        <div className="max-h-[65vh] space-y-6 overflow-y-auto py-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label>First Name</Label>

              <Input
                value={values.firstName}
                onChange={(e) =>
                  update("firstName", e.target.value)
                }
              />
            </div>

            <div>
              <Label>Last Name</Label>

              <Input
                value={values.lastName}
                onChange={(e) =>
                  update("lastName", e.target.value)
                }
              />
            </div>
          </div>

          <div>
            <Label>Email Address</Label>

            <Input
              type="email"
              value={values.email}
              onChange={(e) =>
                update("email", e.target.value)
              }
            />
          </div>

          <div>
            <Label>Role</Label>

            <Select
              value={values.role}
              onValueChange={(value) =>
                update("role", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Owner">
                  Owner
                </SelectItem>

                <SelectItem value="Admin">
                  Admin
                </SelectItem>

                <SelectItem value="Manager">
                  Manager
                </SelectItem>

                <SelectItem value="Editor">
                  Editor
                </SelectItem>

                <SelectItem value="Viewer">
                  Viewer
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Invitation Message (Optional)</Label>

            <Textarea
              rows={4}
              value={values.message}
              onChange={(e) =>
                update("message", e.target.value)
              }
              placeholder="Add a personal message..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t pt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            onClick={handleInvite}
            disabled={loading}
          >
            {loading
              ? "Sending Invitation..."
              : "Send Invitation"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}