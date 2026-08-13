"use client";

import {
  Search,
  Filter,
  ArrowUpDown,
  Download,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PayoutToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onExport?: () => void;
}

export default function PayoutToolbar({
  search,
  onSearchChange,
  onExport,
}: PayoutToolbarProps) {
  return (
    <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search payouts..."
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>

        <Button variant="outline">
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort
        </Button>

        <Button
          onClick={onExport}
          className="bg-indigo-600"
        >
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
}
