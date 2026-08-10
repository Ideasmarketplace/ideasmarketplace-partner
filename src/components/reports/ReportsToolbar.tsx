"use client";

import { useState } from "react";

import {
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReportsToolbarProps {
  onCreateReport: () => void;

  onExport?: () => void;

  onSearch?: (value: string) => void; 

  onStatusChange?: (status: string) => void;

  onCategoryChange?: (category: string) => void;

  onSortChange?: (sort: string) => void;
}

export default function ReportsToolbar({
  onCreateReport,
  onExport,
  onSearch,
  onStatusChange,
  onCategoryChange,
  onSortChange,
}: ReportsToolbarProps) {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-5 border-b border-gray-100 bg-white p-6">
      {/* Search + Buttons */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <Input
            value={search}
            placeholder="Search reports..."
            className="pl-10"
            onChange={(e) => {
              setSearch(e.target.value);
              onSearch?.(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {/* <Button
            variant="outline"
            onClick={onExport}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>

          <Button onClick={onCreateReport}>
            <Plus className="mr-2 h-4 w-4" />
            New Report
          </Button> */}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />

          <span className="text-sm font-medium text-gray-500">
            Filters
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          <Select
            defaultValue="all"
            onValueChange={onStatusChange}
          >
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All Statuses
              </SelectItem>

              <SelectItem value="Published">
                Published
              </SelectItem>

              <SelectItem value="Draft">
                Draft
              </SelectItem>

              <SelectItem value="Scheduled">
                Scheduled
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            defaultValue="all"
            onValueChange={onCategoryChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All Categories
              </SelectItem>

              <SelectItem value="Finance">
                Finance
              </SelectItem>

              <SelectItem value="Marketing">
                Marketing
              </SelectItem>

              <SelectItem value="Operations">
                Operations
              </SelectItem>

              <SelectItem value="Sales">
                Sales
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            defaultValue="latest"
            onValueChange={onSortChange}
          >
            <SelectTrigger className="w-[180px]">
              <ArrowUpDown className="mr-2 h-4 w-4" />

              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="latest">
                Latest First
              </SelectItem>

              <SelectItem value="oldest">
                Oldest First
              </SelectItem>

              <SelectItem value="title">
                Title (A-Z)
              </SelectItem>

              <SelectItem value="downloads">
                Most Downloaded
              </SelectItem>

              <SelectItem value="views">
                Most Viewed
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}