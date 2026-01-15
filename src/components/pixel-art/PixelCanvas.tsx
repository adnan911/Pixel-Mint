import React, { useState } from "react";
import { usePixelCanvas } from "@/hooks/use-pixel-canvas";
import type { CanvasGrid, Tool, Color } from "@/types/pixel-art";
import { floodFill } from "@/utils/canvas-utils";

interface PixelCanvasProps {
  canvasGrid: CanvasGrid;
  currentTool: Tool;
  currentColor: Color;
  showGrid: boolean;
  onPixelChange: (newGrid: CanvasGrid) => void;
  onColorPick: (color: Color) => void;
}

const GRID_SIZE = 32;
const PIXEL_SIZE = 16; // 16px per pixel = 512px total canvas

export const PixelCanvas: React.FC<PixelCanvasProps> = ({
  canvasGrid,
  currentTool,
  currentColor,
  showGrid,
  onPixelChange,
  onColorPick,
}) => {
  const canvasRef = usePixelCanvas({
    canvasGrid,
    gridSize: GRID_SIZE,
    pixelSize: PIXEL_SIZE,
    showGrid,
  });
  const [isDrawing, setIsDrawing] = useState(false);

  const getPixelCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / PIXEL_SIZE);
    const y = Math.floor((e.clientY - rect.top) / PIXEL_SIZE);

    if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
      return { x, y };
    }
    return null;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getPixelCoords(e);
    if (!coords) return;

    const { x, y } = coords;

    // Handle fill tool separately (single click)
    if (currentTool === "fill") {
      const newGrid = floodFill(canvasGrid, x, y, currentColor);
      onPixelChange(newGrid);
      return;
    }

    // Handle eyedropper tool
    if (currentTool === "eyedropper") {
      const pickedColor = canvasGrid[y][x];
      if (pickedColor !== "transparent") {
        onColorPick(pickedColor);
      }
      return;
    }

    // Start drawing for pencil/eraser
    setIsDrawing(true);
    handleDraw(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    handleDraw(e);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getPixelCoords(e);
    if (!coords) return;

    const { x, y } = coords;
    const newGrid = canvasGrid.map((row) => [...row]);

    switch (currentTool) {
      case "pencil":
        newGrid[y][x] = currentColor;
        onPixelChange(newGrid);
        break;
      case "eraser":
        newGrid[y][x] = "transparent";
        onPixelChange(newGrid);
        break;
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * PIXEL_SIZE}
        height={GRID_SIZE * PIXEL_SIZE}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="border-2 border-border cursor-crosshair rounded-sm shadow-lg bg-card"
        style={{
          imageRendering: "pixelated",
          backgroundImage:
            "linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%, hsl(var(--muted))), linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%, hsl(var(--muted)))",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 10px 10px",
        }}
      />
    </div>
  );
};
