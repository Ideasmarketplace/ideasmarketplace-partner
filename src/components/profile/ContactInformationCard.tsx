"use client";

import { useEffect, useState } from "react";
import { Mail, Save } from "lucide-react";

import Api from "@/utils/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactInformationCardProps {
  profile: any;
  refresh: () => Promise<void>;
}

export default function ContactInformationCard({
  profile,
  refresh,
}: ContactInformationCardProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    phoneNumber: "",
    website: "",
    location: "",
  });

  useEffect(() => {
    if (!profile) return;

    setForm({
      phoneNumber: profile.phoneNumber ?? "",
      website: profile.website ?? "",
      location: profile.location ?? "",
    });
  }, [profile]);

  function updateField(
    key: keyof typeof form,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      await Api.put("/partner/profile", form);

      await refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-3">
            <Mail className="h-6 w-6 text-indigo-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Contact Information
            </h2>

            <p className="text-sm text-muted-foreground">
              Keep your business contact information up to date.
            </p>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">
        {/* Email */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="email">
            Email Address
          </Label>

          <Input
            id="email"
            value={profile?.email ?? ""}
            disabled
            readOnly
          />

          <p className="text-xs text-muted-foreground">
            Your login email cannot be changed.
          </p>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone Number
          </Label>

          <Input
            id="phone"
            placeholder="+234 801 234 5678"
            value={form.phoneNumber}
            onChange={(e) =>
              updateField(
                "phoneNumber",
                e.target.value
              )
            }
          />
        </div>

        {/* Website */}
        <div className="space-y-2">
          <Label htmlFor="website">
            Website
          </Label>

          <Input
            id="website"
            placeholder="https://yourcompany.com"
            value={form.website}
            onChange={(e) =>
              updateField(
                "website",
                e.target.value
              )
            }
          />
        </div>

        {/* Location */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="location">
            Location
          </Label>

          <Input
            id="location"
            placeholder="Lagos, Nigeria"
            value={form.location}
            onChange={(e) =>
              updateField(
                "location",
                e.target.value
              )
            }
          />
        </div>
      </div>
    </div>
  );
}