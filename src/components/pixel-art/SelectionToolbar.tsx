import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Square, Move } from "lucide-react";
import type { Tool } from "@/types/pixel-art";

interface SelectionToolbarProps {
  currentTool: Tool;
  onToolChange: (tool: Tool) => void;
}

const selectionTools: Array<{
  id: Tool;
  icon: React.ReactNode;
  label: string;
  shortcut: string;
}> = [
  {
    id: "select",
    icon: <Square className="h-5 w-5" />,
    label: "Select",
    shortcut: "S",
  },
  {
    id: "move",
    icon: <Move className="h-5 w-5" />,
    label: "Move",
    shortcut: "V",
  },
];

export const SelectionToolbar: React.FC<SelectionToolbarProps> = ({
  currentTool,
  onToolChange,
}) => {
  return (
    <TooltipProvider>
      <div className="flex gap-1.5 justify-center">
        {selectionTools.map((tool) => (
          <Tooltip key={tool.id}>
            <TooltipTrigger asChild>
              <Button
                variant={currentTool === tool.id ? "default" : "outline"}
                size="icon"
                onClick={() => onToolChange(tool.id)}
                className="h-11 w-11 sm:h-10 sm:w-10"
                aria-label={tool.label}
              >
                {tool.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
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
