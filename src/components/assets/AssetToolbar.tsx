"use client";

import {
  Search,
  Filter,
  ArrowUpDown,
  FolderPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AssetsToolbarProps {
  onUpload: () => void;
  onCreateFolder: () => void;
}

export default function AssetsToolbar({
  onUpload,
  onCreateFolder,
}: AssetsToolbarProps) {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search assets..."
          className="pl-10 w-full"
        />
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>

        <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
          onClick={onCreateFolder}
        >
          <FolderPlus className="mr-2 h-4 w-4" />
          New Folder
        </Button>
      </div>
    </div>
  );
}