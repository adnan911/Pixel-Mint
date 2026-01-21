import { useRef, useEffect } from "react";
import type { CanvasGrid } from "@/types/pixel-art";

interface UsePixelCanvasProps {
  canvasGrid: CanvasGrid;
  gridSize: number;
  pixelSize: number;
  showGrid: boolean;
}

/**
 * Custom hook for rendering pixel canvas
 * Handles canvas drawing and grid line rendering
 */
export const usePixelCanvas = ({
  canvasGrid,
  gridSize,
  pixelSize,
  showGrid,
}: UsePixelCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check if canvasGrid is valid
    if (!canvasGrid || !Array.isArray(canvasGrid) || canvasGrid.length === 0) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw pixels
    const gridHeight = canvasGrid.length;
    const gridWidth = gridHeight > 0 ? canvasGrid[0].length : 0;

    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        // Safety check for row existence
        if (!canvasGrid[y] || !canvasGrid[y][x]) continue;

        const color = canvasGrid[y][x];
        if (color !== "transparent") {
          ctx.fillStyle = color;
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }
    }

    // Draw grid lines if enabled
    if (showGrid) {
      ctx.strokeStyle = "hsl(var(--border))";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;

      // Vertical lines
      for (let i = 0; i <= gridWidth; i++) {
        ctx.beginPath();
        ctx.moveTo(i * pixelSize + 0.5, 0);
        ctx.lineTo(i * pixelSize + 0.5, gridHeight * pixelSize);
        ctx.stroke();
      }

      // Horizontal lines
      for (let i = 0; i <= gridHeight; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * pixelSize + 0.5);
        ctx.lineTo(gridWidth * pixelSize, i * pixelSize + 0.5);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    }
  }, [canvasGrid, gridSize, pixelSize, showGrid]);

  return canvasRef;
};
