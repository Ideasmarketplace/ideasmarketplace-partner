"use client";

import {
  FileAudio,
  FileImage,
  Film,
  FileText,
  Calendar,
  HardDrive,
} from "lucide-react";

interface Props {
  file: File;
}

export default function FileInfoCard({
  file,
}: Props) {
  const size = (
    file.size /
    1024 /
    1024
  ).toFixed(2);

  const extension =
    file.name.split(".").pop()?.toUpperCase() ??
    "";

  const getIcon = () => {
    if (file.type.startsWith("audio"))
      return (
        <FileAudio className="h-12 w-12 text-indigo-600" />
      );

    if (file.type.startsWith("video"))
      return (
        <Film className="h-12 w-12 text-red-600" />
      );

    if (file.type.startsWith("image"))
      return (
        <FileImage className="h-12 w-12 text-pink-600" />
      );

    return (
      <FileText className="h-12 w-12 text-gray-500" />
    );
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
      <div className="flex items-start gap-4">
        {getIcon()}

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">
            {file.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {extension} File
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <HardDrive className="h-4 w-4" />
              {size} MB
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              Ready to upload
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}