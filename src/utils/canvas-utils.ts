import type { CanvasGrid, Color } from "@/types/pixel-art";

/**
 * Create an empty canvas grid filled with transparent pixels
 */
export const createEmptyCanvas = (size: number): CanvasGrid => {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => "transparent")
  );
};

/**
 * Flood fill algorithm for the fill tool
 * Returns a new grid with the filled pixels
 */
export const floodFill = (
  grid: CanvasGrid,
  startX: number,
  startY: number,
  newColor: Color
): CanvasGrid => {
  const gridSize = grid.length;
  const targetColor = grid[startY][startX];

  // No change needed if same color
  if (targetColor === newColor) return grid;

  // Create a deep copy of the grid
  const newGrid = grid.map((row) => [...row]);

  // Use stack-based flood fill to avoid recursion depth issues
  const stack: [number, number][] = [[startX, startY]];

  while (stack.length > 0) {
    const [x, y] = stack.pop()!;

    // Boundary check
    if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) continue;

    // Color check
    if (newGrid[y][x] !== targetColor) continue;

    // Fill pixel
    newGrid[y][x] = newColor;

    // Add neighbors to stack (4-directional)
    stack.push([x + 1, y]);
    stack.push([x - 1, y]);
    stack.push([x, y + 1]);
    stack.push([x, y - 1]);
  }

  return newGrid;
};

/**
 * Export canvas grid to PNG file
 * Creates a canvas at actual pixel dimensions and triggers download
 */
export const exportCanvasToPNG = (
  canvasGrid: CanvasGrid,
  gridSize: number
): void => {
  // Create temporary canvas at actual pixel dimensions
  const canvas = document.createElement("canvas");
  canvas.width = gridSize;
  canvas.height = gridSize;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("Failed to get canvas context");
    return;
  }

  // Draw each pixel
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const color = canvasGrid[y][x];
      if (color !== "transparent") {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  // Convert to blob and download
  canvas.toBlob((blob) => {
    if (!blob) {
      console.error("Failed to create blob");
      return;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .slice(0, -5);
    link.download = `pixelart_${timestamp}.png`;
    link.href = url;
    link.click();

    // Cleanup
    URL.revokeObjectURL(url);
  }, "image/png");
};
