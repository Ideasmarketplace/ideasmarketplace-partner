"use client";

import { useRef, useState } from "react";
import {
  Camera,
  ImagePlus,
  Trash2,
  UploadCloud,
} from "lucide-react";

import Api from "@/utils/api";

import { Button } from "@/components/ui/button";

interface LogoUploaderProps {
  profile: any;
  refresh?: () => Promise<void>;
}

export default function LogoUploader({
  profile,
  refresh,
}: LogoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(
    profile?.logo ?? null
  );

  const [loading, setLoading] = useState(false);

  async function upload(file: File) {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("logo", file);

      const { data } = await Api.patch(
        "/partner/profile/logo",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setPreview(data.logo);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));

    upload(file);
  }

  async function removeLogo() {
    try {
      setLoading(true);

      await Api.delete("/partner/profile/logo");

      setPreview(null);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-3">
            <Camera className="h-6 w-6 text-indigo-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Company Logo
            </h2>

            <p className="text-sm text-muted-foreground">
              Upload a logo to personalize your partner profile.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div className="flex justify-center">
          <div className="relative">
            {preview ? (
              <img
                src={preview}
                alt="Company Logo"
                className="h-36 w-36 rounded-2xl border object-cover"
              />
            ) : (
              <div className="flex h-36 w-36 items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">
                <ImagePlus className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        <div
          onClick={() => inputRef.current?.click()}
          className="cursor-pointer rounded-xl border-2 border-dashed border-gray-300 p-8 transition hover:border-indigo-400 hover:bg-indigo-50/30"
        >
          <div className="flex flex-col items-center gap-3">
            <UploadCloud className="h-8 w-8 text-indigo-600" />

            <div className="text-center">
              <p className="font-medium">
                Click to upload a company logo
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                PNG, JPG or SVG up to 5MB
              </p>
            </div>
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={handleSelect}
        />

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            className="flex-1"
            onClick={() => inputRef.current?.click()}
            disabled={loading}
          >
            <UploadCloud className="mr-2 h-4 w-4" />
            {preview ? "Replace Logo" : "Upload Logo"}
          </Button>

          {preview && (
            <Button
              variant="destructive"
              onClick={removeLogo}
              disabled={loading}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}