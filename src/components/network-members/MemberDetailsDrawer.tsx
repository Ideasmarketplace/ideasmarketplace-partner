"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import MemberProfile from "./MemberProfile";
import MemberMetadata from "./MemberMetadata";
import MemberActivity from "./MemberActivity";
import MemberActions from "./MemberActions";

import { NetworkMember } from "./types";

interface MemberDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  member?: NetworkMember | null;

  onEdit?: (member: NetworkMember) => void;
  onDelete?: (member: NetworkMember) => void;
}

export default function MemberDetailsDrawer({
  open,
  onOpenChange,
  member,
  onEdit,
  onDelete,
}: MemberDetailsDrawerProps) {
  if (!member) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>
            {member.firstName} {member.lastName}
          </SheetTitle>

          <SheetDescription>
            View member details and activity.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-8">
          <MemberProfile member={member} />

          <MemberMetadata member={member} />

          <MemberActivity />

          <MemberActions
            onEdit={() => onEdit?.(member)}
            onDelete={() => onDelete?.(member)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}