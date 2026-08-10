"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { NetworkMember } from "./types";

interface MemberProfileProps {
  member: NetworkMember;
}

export default function MemberProfile({
  member,
}: MemberProfileProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <Image
        src={member.avatar}
        alt={`${member.firstName} ${member.lastName}`}
        width={96}
        height={96}
        className="rounded-full object-cover"
      />

      <h2 className="mt-4 text-xl font-semibold">
        {member.firstName} {member.lastName}
      </h2>

      <p className="text-sm text-muted-foreground">
        {member.email}
      </p>

      <div className="mt-3 flex items-center gap-2">
        <Badge variant="secondary">{member.role}</Badge>

        <Badge
          variant={
            member.status === "Active"
              ? "default"
              : member.status === "Pending"
              ? "secondary"
              : "destructive"
          }
        >
          {member.status}
        </Badge>
      </div>
    </div>
  );
}