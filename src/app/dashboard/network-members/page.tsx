"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DeleteConfirmationDialog from "@/components/common/DeleteConfirmationDialog";

import {
  NetworkMember,
  NetworkMetricCards,
  NetworkTable,
  MemberDetailsDrawer,
  InviteMemberModal,
} from "@/components/network-members";

export default function NetworkMembersPage() {
  const [selectedMember, setSelectedMember] = useState<NetworkMember | null>(
    null,
  );

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [inviteOpen, setInviteOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Main Content */}
        <main className="min-w-0 flex-1">
          <div className="space-y-6">
            {/* Header */}
            <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tight">
                  Network Members
                </h1>

                <p className="mt-2 text-muted-foreground">
                  Manage your team, collaborators and invited members.
                </p>
              </div>
            </section>

            <NetworkMetricCards />

            <NetworkTable
              onInvite={() => setInviteOpen(true)}
              onView={(member) => {
                setSelectedMember(member);
                setDrawerOpen(true);
              }}
              onEdit={(member) => {
                setSelectedMember(member);
                setDrawerOpen(true);
              }}
              onDelete={(member) => {
                setSelectedMember(member);
                setDeleteOpen(true);
              }}
            />

            <MemberDetailsDrawer
              open={drawerOpen}
              onOpenChange={setDrawerOpen}
              member={selectedMember}
              onEdit={(member) => {
                setSelectedMember(member);
                setInviteOpen(true);
              }}
              onDelete={(member) => {
                setSelectedMember(member);
                setDeleteOpen(true);
              }}
            />

            <InviteMemberModal open={inviteOpen} onOpenChange={setInviteOpen} />

            <DeleteConfirmationDialog
              open={deleteOpen}
              onOpenChange={setDeleteOpen}
              title="Remove Member"
              description="Are you sure you want to remove this member from your network?"
              itemName={
                selectedMember
                  ? `${selectedMember.firstName} ${selectedMember.lastName}`
                  : undefined
              }
              onConfirm={async () => {
                if (!selectedMember) return;

                // await removeMember(selectedMember.id)

                setDeleteOpen(false);
                setDrawerOpen(false);
                setSelectedMember(null);
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
