import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Color } from "@/types/pixel-art";

interface ColorPickerProps {
  currentColor: Color;
  onColorChange: (color: Color) => void;
}

const DEFAULT_PALETTE: Color[] = [
  "#000000", // Black
  "#FFFFFF", // White
  "#FF0000", // Red
  "#00FF00", // Green
  "#0000FF", // Blue
  "#FFFF00", // Yellow
  "#FF00FF", // Magenta
  "#00FFFF", // Cyan
  "#FF8800", // Orange
  "#8800FF", // Purple
  "#00FF88", // Mint
  "#FF0088", // Pink
  "#888888", // Gray
  "#FF8888", // Light Red
  "#88FF88", // Light Green
  "transparent", // Transparent
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  currentColor,
  onColorChange,
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-card border border-border rounded-lg shadow-md">
      <h3 className="text-sm font-semibold text-foreground">Colors</h3>

      {/* Current Color Display */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="current-color" className="text-xs">
          Current Color
        </Label>
        <div className="flex items-center gap-2">
          <div
            className="w-12 h-12 border-2 border-border rounded flex-shrink-0"
            style={{
              backgroundColor:
                currentColor === "transparent" ? "#fff" : currentColor,
              backgroundImage:
                currentColor === "transparent"
                  ? "linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%, hsl(var(--muted))), linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%, hsl(var(--muted)))"
                  : "none",
              backgroundSize: "10px 10px",
              backgroundPosition: "0 0, 5px 5px",
            }}
          />
          <Input
            id="current-color"
            type="text"
            value={currentColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="text-xs font-mono"
            placeholder="#RRGGBB"
          />
        </div>
      </div>

      {/* Color Palette */}
      <div className="flex flex-col gap-2">
        <Label className="text-xs">Palette</Label>
        <div className="grid grid-cols-4 gap-2">
          {DEFAULT_PALETTE.map((color, index) => (
            <button
              key={`${color}-${index}`}
              type="button"
              onClick={() => onColorChange(color)}
              className={`w-10 h-10 border-2 rounded transition-all hover:scale-110 ${
                currentColor === color
                  ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                  : "border-border"
              }`}
              style={{
                backgroundColor: color === "transparent" ? "#fff" : color,
                backgroundImage:
                  color === "transparent"
                    ? "linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%, hsl(var(--muted))), linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%, hsl(var(--muted)))"
                    : "none",
                backgroundSize: "8px 8px",
                backgroundPosition: "0 0, 4px 4px",
              }}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      </div>

      {/* HTML5 Color Picker */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="color-picker" className="text-xs">
          Custom Color
        </Label>
        <input
          id="color-picker"
          type="color"
          value={currentColor === "transparent" ? "#FFFFFF" : currentColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-full h-10 cursor-pointer rounded border-2 border-border"
        />
      </div>
    </div>
  );
};
