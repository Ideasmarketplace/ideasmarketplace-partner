"use client";

import { useEffect, useState } from "react";
import { Building2, Save } from "lucide-react";

import Api from "@/utils/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CompanyInformationCardProps {
  profile: any;
  refresh: () => Promise<void>;
}

export default function CompanyInformationCard({
  profile,
  refresh,
}: CompanyInformationCardProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    industry: "",
    representativeName: "",
    role: "",
  });

  useEffect(() => {
    if (!profile) return;

    setForm({
      companyName: profile.companyName ?? "",
      industry: profile.industry ?? "",
      representativeName: profile.representativeName ?? "",
      role: profile.role ?? "",
    });
  }, [profile]);

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

  function updateField(key: keyof typeof form, value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-3">
            <Building2 className="h-6 w-6 text-indigo-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">Company Information</h2>

            <p className="text-sm text-muted-foreground">
              Information displayed across your partner profile.
            </p>
          </div>
        </div>

        <Button onClick={handleSubmit} disabled={loading}>
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Company Name</Label>

          <Input
            value={form.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Industry</Label>

          <Input
            value={form.industry}
            onChange={(e) => updateField("industry", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Representative</Label>

          <Input
            value={form.representativeName}
            onChange={(e) => updateField("representativeName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Role</Label>

          <Input
            value={form.role}
            onChange={(e) => updateField("role", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
