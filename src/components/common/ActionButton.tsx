"use client";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  variant?: "default" | "outline" | "destructive";
  onClick?: () => void;
}

export default function ActionButton({
  icon: Icon,
  label,
  variant = "outline",
  onClick,
}: ActionButtonProps) {
  return (
    <Button
      variant={variant}
      className="justify-start"
      onClick={onClick}
    >
      <Icon className="mr-3 h-4 w-4" />
      {label}
    </Button>
  );
}