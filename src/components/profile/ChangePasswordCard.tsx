"use client";

import { useState } from "react";
import { LockKeyhole, Save } from "lucide-react";

import Api from "@/utils/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ChangePasswordCard() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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
    if (
      form.newPassword !== form.confirmPassword
    ) {
      return alert("Passwords do not match.");
    }

    try {
      setLoading(true);

      await Api.post(
        "/partner/updatePassword",
        {
          currentPassword:
            form.currentPassword,
          newPassword:
            form.newPassword,
        }
      );

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      alert("Password updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Unable to update password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-3">
            <LockKeyhole className="h-6 w-6 text-indigo-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Change Password
            </h2>

            <p className="text-sm text-muted-foreground">
              Update your account password to keep your partner account secure.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">
            Current Password
          </Label>

          <Input
            id="currentPassword"
            type="password"
            value={form.currentPassword}
            onChange={(e) =>
              updateField(
                "currentPassword",
                e.target.value
              )
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">
            New Password
          </Label>

          <Input
            id="newPassword"
            type="password"
            value={form.newPassword}
            onChange={(e) =>
              updateField(
                "newPassword",
                e.target.value
              )
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">
            Confirm New Password
          </Label>

          <Input
            id="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={(e) =>
              updateField(
                "confirmPassword",
                e.target.value
              )
            }
          />
        </div>

        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={loading}
        >
          <Save className="mr-2 h-4 w-4" />
          Update Password
        </Button>
      </div>
    </div>
  );
}