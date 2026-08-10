"use client";

import { useEffect, useState } from "react";

import {
  ProfileHeader,
  ProfileCompletionCard,
  CompanyInformationCard,
  CommunityInformationCard,
  ContactInformationCard,
  LogoUploader,
  ChangePasswordCard,
} from "@/components/profile";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [completion, setCompletion] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <main className="min-w-0 flex-1">
          <div className="space-y-6">
            Loading...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex">
        <main className="min-w-0 flex-1">
          <div className="space-y-6">

            {/* Header */}

            <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <ProfileHeader />
            </section>

            {/* Top Section */}
            <section className="grid gap-6 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <CompanyInformationCard
                  profile={profile}
                  refresh={loadProfile}
                />
              </div>

              <ProfileCompletionCard
                completion={completion}
              />
            </section>

            {/* Community */}

            <CommunityInformationCard
              profile={profile}
              refresh={loadProfile}
            />

            {/* Contact */}

            <ContactInformationCard
              profile={profile}
              refresh={loadProfile}
            />

            {/* Bottom */}
            <section className="grid gap-6 xl:grid-cols-2">
              <LogoUploader
                profile={profile}
                refresh={loadProfile}
              />

              <ChangePasswordCard />

            </section>

          </div>
        </main>
      </div>
    </div>
  );
}