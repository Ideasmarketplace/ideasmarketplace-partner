"use client";

import { useEffect, useState } from "react";
import { Landmark, Save } from "lucide-react";

import Api from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface BankForm {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

const initialForm: BankForm = {
  bankName: "",
  accountName: "",
  accountNumber: "",
};

export default function BankDetailsCard({ onSaved }: { onSaved?: () => void }) {
  const [form, setForm] = useState<BankForm>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await Api.get("partner/profile/bank-details");
        const d = res.data?.data;
        if (d) {
          setForm({
            bankName: d.bankName ?? "",
            accountName: d.accountName ?? "",
            accountNumber: d.accountNumber ?? "",
          });
        }
      } catch (error) {
        console.error("Failed to load bank details:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const canSave =
    form.bankName.trim() &&
    form.accountName.trim() &&
    form.accountNumber.trim() &&
    !saving;

  async function handleSubmit() {
    try {
      setSaving(true);
      const res = await Api.put("partner/profile/bank-details", form);
      toast({ title: "Bank details saved" });
      onSaved?.();
    } catch (error: any) {
      toast({
        title: "Could not save bank details",
        description: error?.response?.data?.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }

  const update = (key: keyof BankForm, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col items-start justify-between gap-4 border-b p-6 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-50 p-3">
            <Landmark className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Bank Details</h2>
            <p className="text-sm text-muted-foreground">
              Where your withdrawals are sent. Changes apply to future
              withdrawals only.
            </p>
          </div>
        </div>

        <Button onClick={handleSubmit} disabled={!canSave || loading}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Bank Name</Label>
          <Input
            value={form.bankName}
            disabled={loading}
            onChange={(e) => update("bankName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Account Name</Label>
          <Input
            value={form.accountName}
            disabled={loading}
            onChange={(e) => update("accountName", e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Account Number</Label>
          <Input
            value={form.accountNumber}
            disabled={loading}
            onChange={(e) => update("accountNumber", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
