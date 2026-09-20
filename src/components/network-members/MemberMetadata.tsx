"use client";

import MetadataRow from "@/components/common/MetadataRow";
import { NetworkMember } from "./types";
import StatusBadge from "../table/StatusBadge";

interface MemberMetadataProps {
  member: NetworkMember;
}

export default function MemberMetadata({ member }: MemberMetadataProps) {
  return (
    <div className="rounded-2xl border bg-white">
      <MetadataRow label="Member ID" value={member.id} />

      <MetadataRow label="Role" value={member.role} />

      <MetadataRow label="Status" value={<StatusBadge status={member.status} />} />

      <MetadataRow label="Joined" value={member.createdAt} />


      <MetadataRow label="Assets Managed" value={member.totalAssets} />

      <MetadataRow
        label="Revenue Generated"
        value={`$${member.totalRevenue.toLocaleString()}`}
      />

      <MetadataRow label="Phone" value={member.phone ?? "-"} />

      <MetadataRow label="Location" value={member.location ?? "-"} />
    </div>
  );
}
