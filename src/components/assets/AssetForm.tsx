"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FileInfoCard from "./FileInfoCard";
import TagInput from "./TagInput";
import { AssetFolder, AssetFormValues } from "./types";

interface AssetFormProps {
  file?: File | null;
  value: AssetFormValues;
  onChange: (values: AssetFormValues) => void;
  folders?: AssetFolder[];
}

export default function AssetForm({
  file,
  value,
  onChange,
  folders = [],
}: AssetFormProps) {
  return (
    <div className="space-y-8">
      {file && <FileInfoCard file={file} />}

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Asset Title</Label>

        <Input
          id="title"
          value={value.title}
          placeholder="Enter asset title"
          onChange={(e) =>
            onChange({
              ...value,
              title: e.target.value,
            })
          }
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <Textarea
          id="description"
          rows={5}
          value={value.description}
          placeholder="Describe this asset..."
          onChange={(e) =>
            onChange({
              ...value,
              description: e.target.value,
            })
          }
        />
      </div>

      {/* Category + Folder */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Category</Label>

          <RadioGroup
            value={value.category}
            onValueChange={(category) =>
              onChange({
                ...value,
                category: category as "Audio" | "Visual",
              })
            }
            className="flex gap-8"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="Audio" id="audio" />
              <Label htmlFor="audio">Audio</Label>
            </div>

            <div className="flex items-center gap-2">
              <RadioGroupItem value="Visual" id="visual" />
              <Label htmlFor="visual">Visual</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Folder</Label>

          <Select
            value={value.folder}
            onValueChange={(folder) =>
              onChange({
                ...value,
                folder,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select folder" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="root">Root Folder</SelectItem>

              {folders.map((folder) => (
                <SelectItem key={folder.id} value={folder.id}>
                  {folder.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label>Tags</Label>

        <TagInput
          value={value.tags}
          onChange={(tags) =>
            onChange({
              ...value,
              tags,
            })
          }
        />
      </div>

      {/* Visibility */}
      <div className="space-y-2">
        <Label>Visibility</Label>

        <RadioGroup
          value={value.visibility}
          onValueChange={(visibility) =>
            onChange({
              ...value,
              visibility: visibility as "Public" | "Private",
            })
          }
          className="flex gap-8"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="Private" id="private" />

            <Label htmlFor="private">Private</Label>
          </div>

          <div className="flex items-center gap-2">
            <RadioGroupItem value="Public" id="public" />

            <Label htmlFor="public">Public</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
