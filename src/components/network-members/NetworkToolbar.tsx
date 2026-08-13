"use client";

import { Search, UserPlus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NetworkToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;

  onInvite: () => void;
}

export default function NetworkToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  onInvite,
}: NetworkToolbarProps) {
  return (
    <div className="flex flex-col gap-4 bg-white p-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-3 md:flex-row">
        {/* Search */}
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search members..."
            className="pl-10"
          />
        </div>

        {/* Status */}
        <Select
          value={status}
          onValueChange={onStatusChange}
        >
          <SelectTrigger className="w-full md:w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All Statuses
            </SelectItem>

            <SelectItem value="Active">
              Active
            </SelectItem>

            <SelectItem value="Pending">
              Pending
            </SelectItem>

            <SelectItem value="Suspended">
              Suspended
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* <Button onClick={onInvite}>
        <UserPlus className="mr-2 h-4 w-4" />
        Invite Member
      </Button> */}
    </div>
  );
}

