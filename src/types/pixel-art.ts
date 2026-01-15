// Type definitions for pixel art application

export type Color = string; // hex format: "#RRGGBB" or "transparent"

export type Pixel = Color;

export type CanvasGrid = Pixel[][]; // [y][x] = color

export type Tool = "pencil" | "eraser" | "fill" | "eyedropper";

export interface Point {
  x: number;
  y: number;
}

export interface AppState {
  canvas: CanvasGrid;
  currentTool: Tool;
  currentColor: Color;
  showGrid: boolean;
  canvasSize: number;
}
