"use client";

import { useEffect, useState } from "react";

import {
  Building2,
  Users,
  Mail,
  Phone,
  Globe,
  MapPin,
  User,
  BriefcaseBusiness,
  ShieldCheck,
} from "lucide-react";

import {
  ProfileHeader,
  ProfileCompletionCard,
  CompanyInformationCard,
  CommunityInformationCard,
  ContactInformationCard,
  LogoUploader,
  ChangePasswordCard,
} from "@/components/profile";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Profile {
  companyName?: string;
  industry?: string;
  representativeName?: string;
  role?: string;
  phoneNumber?: string;
  email?: string;
  communityDescription?: string;
  communitySize?: string;
  website?: string;
  location?: string;
  logo?: string;
  profileImage?: string;
}

interface Completion {
  percentage: number;
  completedFields: number;
  totalFields: number;
  missingFields?: string[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  const [completion, setCompletion] = useState<Completion | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);

      // TODO: Connect your profile API here.
      //
      // const response = await Api.get("/partner/profile");
      //
      // setProfile(response.data.data.profile);
      // setCompletion(response.data.data.completion);
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
          <div className="space-y-6">Loading...</div>
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

            {/* Profile Tabs */}

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full max-w-xl grid-cols-3 rounded-xl">
                <TabsTrigger value="overview" className="rounded-lg">
                  Overview
                </TabsTrigger>

                <TabsTrigger value="edit" className="rounded-lg">
                  Edit Profile
                </TabsTrigger>

                <TabsTrigger value="security" className="rounded-lg">
                  Security
                </TabsTrigger>
              </TabsList>

              {/* ================================================= */}
              {/* OVERVIEW */}
              {/* ================================================= */}

              <TabsContent value="overview" className="mt-6 space-y-6">
                <section className="grid gap-6 xl:grid-cols-1">
                  {/* Profile Information */}

                  <Card className="rounded-3xl border border-gray-100 shadow-sm xl:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-xl">
                        Profile Information
                      </CardTitle>

                      <p className="text-sm text-muted-foreground">
                        Your company, community and contact information.
                      </p>
                    </CardHeader>

                    <CardContent>
                      {/* Profile Header */}

                      <div className="mb-8 flex flex-col gap-5 border-b pb-8 sm:flex-row sm:items-center">
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gray-100">
                          {profile?.logo || profile?.profileImage ? (
                            <img
                              src={profile.logo || profile.profileImage}
                              alt={profile.companyName || "Profile"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Building2 className="h-10 w-10 text-gray-400" />
                          )}
                        </div>

                        <div>
                          <h2 className="text-2xl font-bold">
                            {profile?.companyName || "Company Name"}
                          </h2>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {profile?.industry || "Industry not specified"}
                          </p>

                          {profile?.location && (
                            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              {profile.location}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-8 md:grid-cols-2">
                        {/* Company */}

                        <div>
                          <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50">
                              <Building2 className="h-4 w-4 text-indigo-600" />
                            </div>

                            <h3 className="font-semibold">
                              Company Information
                            </h3>
                          </div>

                          <div className="space-y-4">
                            <ProfileInfoRow
                              icon={Building2}
                              label="Company Name"
                              value={profile?.companyName}
                            />

                            <ProfileInfoRow
                              icon={BriefcaseBusiness}
                              label="Industry"
                              value={profile?.industry}
                            />

                            <ProfileInfoRow
                              icon={User}
                              label="Representative"
                              value={profile?.representativeName}
                            />

                            <ProfileInfoRow
                              icon={BriefcaseBusiness}
                              label="Role"
                              value={profile?.role}
                            />
                          </div>
                        </div>

                        {/* Community */}

                        <div>
                          <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
                              <Users className="h-4 w-4 text-emerald-600" />
                            </div>

                            <h3 className="font-semibold">
                              Community Information
                            </h3>
                          </div>

                          <div className="space-y-4">
                            <ProfileInfoRow
                              icon={Users}
                              label="Community Size"
                              value={profile?.communitySize}
                            />

                            <div>
                              <p className="text-xs font-medium text-muted-foreground">
                                Description
                              </p>

                              <p className="mt-1 text-sm">
                                {profile?.communityDescription ||
                                  "No community description provided."}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Contact */}

                        <div className="md:col-span-2">
                          <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
                              <Mail className="h-4 w-4 text-blue-600" />
                            </div>

                            <h3 className="font-semibold">
                              Contact Information
                            </h3>
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <ProfileInfoRow
                              icon={Mail}
                              label="Email"
                              value={profile?.email}
                            />

                            <ProfileInfoRow
                              icon={Phone}
                              label="Phone"
                              value={profile?.phoneNumber}
                            />

                            <ProfileInfoRow
                              icon={Globe}
                              label="Website"
                              value={profile?.website}
                            />

                            <ProfileInfoRow
                              icon={MapPin}
                              label="Location"
                              value={profile?.location}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Profile Completion */}

                  {completion && (
                    <ProfileCompletionCard completion={completion} />
                  )}
                </section>
              </TabsContent>

              {/* ================================================= */}
              {/* EDIT PROFILE */}
              {/* ================================================= */}

              <TabsContent value="edit" className="mt-6 space-y-6">
                <section className="grid gap-6 xl:grid-cols-2">
                  <CompanyInformationCard
                    profile={profile}
                    refresh={loadProfile}
                  />

                  <CommunityInformationCard
                    profile={profile}
                    refresh={loadProfile}
                  />
                </section>

                <ContactInformationCard
                  profile={profile}
                  refresh={loadProfile}
                />

                <LogoUploader profile={profile} refresh={loadProfile} />
              </TabsContent>

              {/* ================================================= */}
              {/* SECURITY */}
              {/* ================================================= */}

              <TabsContent value="security" className="mt-6">
                <section className="grid gap-6 xl:grid-cols-2">
                  <ChangePasswordCard />

                  <Card className="rounded-3xl border border-gray-100 shadow-sm">
                    <CardHeader className="p-5">
                      <CardTitle className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-indigo-600" />
                        Account Security
                      </CardTitle>

                      <p className="text-sm text-muted-foreground">
                        Keep your account protected by using a strong and unique
                        password.
                      </p>
                    </CardHeader>

                    <CardContent>
                      <div className="rounded-2xl bg-gray-50 p-5">
                        <p className="text-sm font-medium">
                          Security recommendation
                        </p>

                        <p className="mt-2 text-sm text-muted-foreground">
                          Use a password containing a combination of uppercase
                          and lowercase letters, numbers and special characters.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}

interface ProfileInfoRowProps {
  icon: React.ElementType;
  label: string;
  value?: string;
}

function ProfileInfoRow({ icon: Icon, label, value }: ProfileInfoRowProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50">
        <Icon className="h-4 w-4 text-gray-500" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>

        <p className="mt-1 break-words text-sm font-medium">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}
