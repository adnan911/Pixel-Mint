import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Pencil, Eraser, PaintBucket, Pipette } from "lucide-react";
import type { Tool } from "@/types/pixel-art";

interface ToolbarProps {
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
}

const tools: Array<{
  id: Tool;
  icon: React.ReactNode;
  label: string;
  shortcut: string;
}> = [
  {
    id: "pencil",
    icon: <Pencil className="h-5 w-5" />,
    label: "Pencil",
    shortcut: "P",
  },
  {
    id: "eraser",
    icon: <Eraser className="h-5 w-5" />,
    label: "Eraser",
    shortcut: "E",
  },
  {
    id: "fill",
    icon: <PaintBucket className="h-5 w-5" />,
    label: "Fill",
    shortcut: "F",
  },
  {
    id: "eyedropper",
    icon: <Pipette className="h-5 w-5" />,
    label: "Eyedropper",
    shortcut: "I",
  },
];

export const Toolbar: React.FC<ToolbarProps> = ({
  currentTool,
  onToolChange,
}) => {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2 p-4 bg-card border border-border rounded-lg shadow-md">
        <h3 className="text-sm font-semibold text-foreground mb-2">Tools</h3>
        {tools.map((tool) => (
          <Tooltip key={tool.id}>
            <TooltipTrigger asChild>
              <Button
                variant={currentTool === tool.id ? "default" : "outline"}
                size="icon"
                onClick={() => onToolChange(tool.id)}
                className="w-12 h-12"
                aria-label={tool.label}
              >
                {tool.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>
                {tool.label} ({tool.shortcut})
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};
