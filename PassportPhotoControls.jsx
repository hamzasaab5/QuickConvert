
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PassportPhotoControls = ({ selectedPresetName, onPresetChange, presets }) => {
  return (
    <div className="mb-4">
      <label htmlFor="preset-select" className="block text-sm font-medium mb-1">Select Size/Format:</label>
      <Select value={selectedPresetName} onValueChange={onPresetChange}>
        <SelectTrigger id="preset-select" className="w-full">
          <SelectValue placeholder="Select a preset" />
        </SelectTrigger>
        <SelectContent>
          {presets.map(preset => (
            <SelectItem key={preset.name} value={preset.name}>{preset.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PassportPhotoControls;
