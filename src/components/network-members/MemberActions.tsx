"use client";

import {
  Mail,
  Pencil,
  Trash2,
  UserX,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface MemberActionsProps {
  onMessage?: () => void;
  onEdit?: () => void;
  onSuspend?: () => void;
  onDelete?: () => void;
}

export default function MemberActions({
  onMessage,
  onEdit,
  onSuspend,
  onDelete,
}: MemberActionsProps) {
  return (
    <div className="space-y-3">
      <Button
        className="w-full justify-start"
        onClick={onMessage}
      >
        <Mail className="mr-2 h-4 w-4" />
        Send Message
      </Button>

      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={onEdit}
      >
        <Pencil className="mr-2 h-4 w-4" />
        Edit Member
      </Button>

      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={onSuspend}
      >
        <UserX className="mr-2 h-4 w-4" />
        Suspend Member
      </Button>

      <Button
        variant="destructive"
        className="w-full justify-start"
        onClick={onDelete}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Remove Member
      </Button>
    </div>
  );
}