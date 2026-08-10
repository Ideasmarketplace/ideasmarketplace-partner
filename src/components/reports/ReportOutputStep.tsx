"use client";

import {
  FileText,
  FileSpreadsheet,
  Table,
  Download,
  Mail,
  CheckCircle2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { GenerateReportValues } from "./types";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";

interface ReportOutputStepProps {
  value: GenerateReportValues;
  onChange: (values: Partial<GenerateReportValues>) => void;
}

const formats = [
  {
    id: "pdf",
    title: "PDF",
    description: "Printable document with charts",
    icon: FileText,
  },
  {
    id: "xlsx",
    title: "Excel",
    description: "Spreadsheet with raw data",
    icon: FileSpreadsheet,
  },
  {
    id: "csv",
    title: "CSV",
    description: "Comma separated values",
    icon: Table,
  },
];

const deliveries = [
  {
    id: "download",
    title: "Download Now",
    description: "Immediately download the report",
    icon: Download,
  },
  {
    id: "email",
    title: "Send via Email",
    description: "Generate and email the report",
    icon: Mail,
  },
];

export default function ReportOutputStep({
  value,
  onChange,
}: ReportOutputStepProps) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-semibold">Output Settings</h2>

        <p className="mt-2 text-gray-500">
          Choose how your report should be generated.
        </p>
      </div>

      {/* Format */}
      <div className="space-y-4">
        <Label>Export Format</Label>

        <RadioGroup
          value={value.format}
          onValueChange={(format) =>
            onChange({
              format: format as GenerateReportValues["format"],
            })
          }
          className="grid gap-4 md:grid-cols-3"
        >
          {formats.map((format) => {
            const Icon = format.icon;

            const active = value.format === format.id;

            return (
              <button
                key={format.id}
                type="button"
                onClick={() =>
                  onChange({
                    format: format.id as GenerateReportValues["format"],
                  })
                }
                className={cn(
                  "relative rounded-2xl border bg-white p-5 text-left transition-all",
                  active
                    ? "border-indigo-600 ring-2 ring-indigo-100"
                    : "border-gray-200 hover:border-indigo-300",
                )}
              >
                {active && (
                  <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-indigo-600" />
                )}

                <Icon className="mb-4 h-8 w-8 text-indigo-600" />

                <h3 className="font-semibold">{format.title}</h3>

                <p className="mt-1 text-sm text-gray-500">
                  {format.description}
                </p>
              </button>
            );
          })}
        </RadioGroup>
      </div>

      {/* Delivery */}
      <div className="space-y-4">
        <Label>Delivery Method</Label>

        <RadioGroup
          value={value.delivery}
          onValueChange={(delivery) =>
            onChange({
              delivery: delivery as GenerateReportValues["delivery"],
            })
          }
          className="grid gap-4 md:grid-cols-2"
        >
          {deliveries.map((delivery) => {
            const Icon = delivery.icon;

            const active = value.delivery === delivery.id;

            return (
              <button
                key={delivery.id}
                type="button"
                onClick={() =>
                  onChange({
                    delivery: delivery.id as GenerateReportValues["delivery"],
                  })
                }
                className={cn(
                  "relative rounded-2xl border bg-white p-5 text-left transition-all",
                  active
                    ? "border-indigo-600 ring-2 ring-indigo-100"
                    : "border-gray-200 hover:border-indigo-300",
                )}
              >
                {active && (
                  <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-indigo-600" />
                )}

                <Icon className="mb-4 h-8 w-8 text-indigo-600" />

                <h3 className="font-semibold">{delivery.title}</h3>

                <p className="mt-1 text-sm text-gray-500">
                  {delivery.description}
                </p>
              </button>
            );
          })}
        </RadioGroup>
      </div>

      <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6 space-y-6">
        <h3 className="text-lg font-semibold">Advanced Settings</h3>

        <div className="space-y-2">
          <Label>Filename</Label>

          <Input
            value={value.filename}
            onChange={(e) =>
              onChange({
                filename: e.target.value,
              })
            }
          />
        </div>

        {value.format === "pdf" && (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Paper Size</Label>

                <Select
                  value={value.paperSize}
                  onValueChange={(paperSize) =>
                    onChange({
                      paperSize: paperSize as "A4" | "Letter",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="A4">A4</SelectItem>

                    <SelectItem value="Letter">Letter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Orientation</Label>

                <Select
                  value={value.orientation}
                  onValueChange={(orientation) =>
                    onChange({
                      orientation: orientation as "portrait" | "landscape",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="portrait">Portrait</SelectItem>

                    <SelectItem value="landscape">Landscape</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Compress Images</Label>

            <Checkbox
              checked={value.compressImages}
              onCheckedChange={(checked) =>
                onChange({
                  compressImages: checked === true,
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Include Company Branding</Label>

            <Checkbox
              checked={value.includeBranding}
              onCheckedChange={(checked) =>
                onChange({
                  includeBranding: checked === true,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
