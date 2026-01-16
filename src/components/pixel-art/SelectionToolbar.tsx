import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Square, Lasso, Hand, Move } from "lucide-react";
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
    id: "marquee",
    icon: <Square className="h-5 w-5" />,
    label: "Marquee",
    shortcut: "M",
  },
  {
    id: "lasso",
    icon: <Lasso className="h-5 w-5" />,
    label: "Lasso",
    shortcut: "L",
  },
  {
    id: "move",
    icon: <Move className="h-5 w-5" />,
    label: "Move",
    shortcut: "V",
  },
  {
    id: "hand",
    icon: <Hand className="h-5 w-5" />,
    label: "Hand",
    shortcut: "H",
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
                className="h-10 w-10"
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
