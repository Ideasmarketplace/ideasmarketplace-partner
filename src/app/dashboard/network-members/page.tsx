"use client";

import { useEffect, useState } from "react";

import Api from "@/utils/api";

import DeleteConfirmationDialog from "@/components/common/DeleteConfirmationDialog";

import {
  NetworkMember,
  NetworkMetricCards,
  NetworkTable,
  MemberDetailsDrawer,
  InviteMemberModal,
} from "@/components/network-members";

import type { NetworkMetrics } from "@/components/network-members/NetworkMetricCards";

export default function NetworkMembersPage() {
  const [selectedMember, setSelectedMember] = useState<NetworkMember | null>(
    null,
  );

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [inviteOpen, setInviteOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [metrics, setMetrics] = useState<NetworkMetrics | null>(null);

  const [metricsLoading, setMetricsLoading] = useState(true);

  /**
   * Fetch network metrics
   */
  useEffect(() => {
    const fetchNetworkMetrics = async () => {
      try {
        setMetricsLoading(true);

        const response = await Api.get("partner/network-members/metrics");

        if (response.data?.success) {
          setMetrics(response.data.data || null);
        } else {
          setMetrics(null);
        }
      } catch (error) {
        console.error("Failed to fetch network metrics:", error);

        setMetrics(null);
      } finally {
        setMetricsLoading(false);
      }
    };

    fetchNetworkMetrics();
  }, []);

  return (
    <main className="min-h-screen flex-1">
      <div className="space-y-6">
        {/* Header */}
        <section className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Network Members</h1>

          <p className="mt-2 text-muted-foreground">
            Manage your team, collaborators and invited members.
          </p>
        </section>

        {/* Metrics */}
        <NetworkMetricCards data={metrics} loading={metricsLoading} />

        {/* Members Table */}
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

        {/* Member Details */}
        <MemberDetailsDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          member={selectedMember}
          onEdit={(member) => {
            setSelectedMember(member);
            setDrawerOpen(false);
            setInviteOpen(true);
          }}
          onDelete={(member) => {
            setSelectedMember(member);
            setDrawerOpen(false);
            setDeleteOpen(true);
          }}
        />

        {/* Invite Member */}
        <InviteMemberModal open={inviteOpen} onOpenChange={setInviteOpen} />

        {/* Delete */}
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

            /*
             * No remove-member endpoint has been
             * provided yet.
             */

            setDeleteOpen(false);
            setDrawerOpen(false);
            setSelectedMember(null);
          }}
        />
      </div>
    </main>
  );
}
