"use client";

import * as React from "react";
import { MoreVertical } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface ActionItem<T = any> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T) => void;

  /**
   * Optional visibility
   */
  hidden?: boolean;

  /**
   * Disable action
   */
  disabled?: boolean;

  /**
   * Red destructive action
   */
  destructive?: boolean;

  /**
   * Divider after item
   */
  separator?: boolean;
}

interface ActionMenuProps<T = any> {
  row: T;
  actions: ActionItem<T>[];
  align?: "start" | "center" | "end";
}

export default function ActionMenu<T>({
  row,
  actions,
  align = "end",
}: ActionMenuProps<T>) {
  const visibleActions = actions.filter((action) => !action.hidden);

  if (!visibleActions.length) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg border border-gray-200 hover:bg-gray-100"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={align}
        className="w-52 rounded-xl"
      >
        {visibleActions.map((action, index) => (
          <React.Fragment key={index}>
            <DropdownMenuItem
              disabled={action.disabled}
              onClick={() => action.onClick(row)}
              className={cn(
                "cursor-pointer gap-3",
                action.destructive &&
                  "text-red-600 focus:text-red-600"
              )}
            >
              {action.icon}

              <span>{action.label}</span>
            </DropdownMenuItem>

            {action.separator && (
              <DropdownMenuSeparator />
            )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}