import React from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Download, Trash2, Undo2, Redo2, Grid3x3 } from "lucide-react";
import type { CanvasGrid } from "@/types/pixel-art";
import { exportCanvasToPNG } from "@/utils/canvas-utils";

interface ControlsProps {
  canvasGrid: CanvasGrid;
  canvasSize: number;
  showGrid: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onToggleGrid: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  canvasGrid,
  canvasSize,
  showGrid,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onClear,
  onToggleGrid,
}) => {
  const handleExport = () => {
    exportCanvasToPNG(canvasGrid, canvasSize);
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-4 p-4 bg-card border border-border rounded-lg shadow-md">
        <h3 className="text-sm font-semibold text-foreground">Controls</h3>

        {/* Undo/Redo */}
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onUndo}
                disabled={!canUndo}
                aria-label="Undo"
              >
                <Undo2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Undo (Ctrl+Z)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onRedo}
                disabled={!canRedo}
                aria-label="Redo"
              >
                <Redo2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Redo (Ctrl+Y)</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Grid Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={showGrid ? "default" : "outline"}
              className="w-full justify-start"
              onClick={onToggleGrid}
            >
              <Grid3x3 className="h-4 w-4 mr-2" />
              {showGrid ? "Hide Grid" : "Show Grid"}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle Grid (G)</p>
          </TooltipContent>
        </Tooltip>

        {/* Export */}
        <Button
          variant="secondary"
          className="w-full justify-start"
          onClick={handleExport}
        >
          <Download className="h-4 w-4 mr-2" />
          Export PNG
        </Button>

        {/* Clear Canvas */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full justify-start">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Canvas
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear Canvas?</AlertDialogTitle>
              <AlertDialogDescription>
                This will erase all your artwork. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onClear}>Clear</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Info */}
        <div className="text-xs text-muted-foreground mt-2 space-y-1">
          <p>Canvas: {canvasSize}×{canvasSize}</p>
          <p className="text-[10px] leading-relaxed">
            Shortcuts: P (pencil), E (eraser), F (fill), I (eyedropper), G (grid)
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
};
