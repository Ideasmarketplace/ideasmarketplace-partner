"use client";

import {
  Search,
  Filter,
  ArrowUpDown,
  Download,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RevenueToolbarProps {
  onExport?: () => void;
}

export default function RevenueToolbar({
  onExport,
}: RevenueToolbarProps) {
  return (
    <div className="flex flex-col gap-4 border-b bg-white p-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

        <Input
          placeholder="Search revenue..."
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>

        <Button variant="outline">
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort
        </Button>

        <Button onClick={onExport} className="w-full sm:w-auto">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
}