"use client";

import { Rows3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { DataDensity } from "./types";

interface DataDensitySwitchProps {
  value: DataDensity;
  onValueChange: (value: DataDensity) => void;
}

const densityLabels: Record<DataDensity, string> = {
  comfortable: "Comfortable",
  standard: "Standard",
  compact: "Compact",
};

export function DataDensitySwitch({ value, onValueChange }: DataDensitySwitchProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Rows3 className="h-4 w-4" />
          {densityLabels[value]}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(nextValue) => onValueChange(nextValue as DataDensity)}
        >
          <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="standard">Standard</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
