"use client";

import { useEffect, useState } from "react";
import { Users, Save } from "lucide-react";

import Api from "@/utils/api";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface CommunityInformationCardProps {
  profile: any;
  refresh: () => Promise<void>;
}

export default function CommunityInformationCard({
  profile,
  refresh,
}: CommunityInformationCardProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    communityDescription: "",
    communitySize: "",
  });

  useEffect(() => {
    if (!profile) return;

    setForm({
      communityDescription: profile.communityDescription ?? "",
      communitySize: profile.communitySize ?? "",
    });
  }, [profile]);

  function updateField(key: keyof typeof form, value: string) {
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
            <Users className="h-6 w-6 text-indigo-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">Community Information</h2>

            <p className="text-sm text-muted-foreground">
              Tell creators about the audience and community you represent.
            </p>
          </div>
        </div>

        <Button onClick={handleSubmit} disabled={loading}>
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
      </div>

      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <Label htmlFor="communityDescription">Community Description</Label>

          <Textarea
            id="communityDescription"
            rows={6}
            placeholder="Describe your community, audience and the value you provide..."
            value={form.communityDescription}
            onChange={(e) =>
              updateField("communityDescription", e.target.value)
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="communitySize">Community Size</Label>

          <Input
            id="communitySize"
            placeholder="e.g. 25,000 members"
            value={form.communitySize}
            onChange={(e) => updateField("communitySize", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
