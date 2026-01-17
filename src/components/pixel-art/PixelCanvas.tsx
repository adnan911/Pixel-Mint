import React, { useState, useRef, useEffect } from "react";
import { usePixelCanvas } from "@/hooks/use-pixel-canvas";
import type { CanvasGrid, Tool, Color, Point, Selection, FillMode, BrushMode, DitherPattern, PencilSize } from "@/types/pixel-art";
import {
  floodFill,
  globalFill,
  drawLine,
  drawCircle,
  drawRectangle,
  isPointInPolygon,
} from "@/utils/canvas-utils";
import { shiftHue, getRandomColor } from "@/utils/color-utils";

interface EnhancedPixelCanvasProps {
  canvasGrid: CanvasGrid;
  currentTool: Tool;
  currentColor: Color;
  showGrid: boolean;
  fillMode: FillMode;
  selection: Selection;
  zoom: number;
  pan: Point;
  brushMode?: BrushMode;
  ditherPattern?: DitherPattern;
  pencilSize?: PencilSize;
  onPixelChange: (newGrid: CanvasGrid) => void;
  onColorPick: (color: Color) => void;
  onSelectionChange: (selection: Selection) => void;
  onPanChange: (pan: Point) => void;
}

const GRID_SIZE = 32;

// Bayer dither matrices
const BAYER_2X2 = [
  [0, 2],
  [3, 1],
];

const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

const BAYER_8X8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

export const EnhancedPixelCanvas: React.FC<EnhancedPixelCanvasProps> = ({
  canvasGrid,
  currentTool,
  currentColor,
  showGrid,
  fillMode,
  selection,
  zoom,
  pan,
  brushMode = "normal",
  ditherPattern = "bayer4x4",
  pencilSize = 1,
  onPixelChange,
  onColorPick,
  onSelectionChange,
  onPanChange,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [pixelSize, setPixelSize] = useState(16);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [previewGrid, setPreviewGrid] = useState<CanvasGrid | null>(null);
  const [moveOffset, setMoveOffset] = useState<Point | null>(null);
  const [endPoint, setEndPoint] = useState<Point | null>(null);
  const [rainbowHueShift, setRainbowHueShift] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

  // Get actual grid dimensions from canvasGrid
  const gridHeight = canvasGrid.length;
  const gridWidth = gridHeight > 0 ? canvasGrid[0].length : 0;

  // Helper function to get brush color based on mode
  const getBrushColor = (x: number, y: number, baseColor: Color): Color => {
    if (baseColor === "transparent") return baseColor;
    
    switch (brushMode) {
      case "rainbow":
        // Shift hue by 10 degrees per pixel
        return shiftHue(baseColor, rainbowHueShift);
      
      case "random":
        // Get random color from a predefined palette
        const paletteColors = [
          "#FF0000", "#00FF00", "#0000FF", "#FFFF00", 
          "#FF00FF", "#00FFFF", "#FFA500", "#800080"
        ];
        return getRandomColor(paletteColors);
      
      case "dither":
        // Apply dither pattern
        const matrix = ditherPattern === "bayer2x2" ? BAYER_2X2 :
                      ditherPattern === "bayer8x8" ? BAYER_8X8 : BAYER_4X4;
        const matrixSize = matrix.length;
        const threshold = matrix[y % matrixSize][x % matrixSize];
        const maxThreshold = matrixSize * matrixSize;
        
        // Use threshold to determine if pixel should be drawn
        return (threshold / maxThreshold) < 0.5 ? baseColor : "transparent";
      
      case "normal":
      default:
        return baseColor;
    }
  };

  const canvasRef = usePixelCanvas({
    canvasGrid: previewGrid || canvasGrid,
    gridSize: gridWidth, // Use actual grid width
    pixelSize: pixelSize * zoom,
    showGrid,
  });

  // Calculate optimal pixel size based on container
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Use actual grid dimensions for calculation
        const maxWidth = Math.floor((containerWidth - 32) / gridWidth);
        const maxHeight = Math.floor((containerHeight - 32) / gridHeight);
        const newPixelSize = Math.min(maxWidth, maxHeight, 16);
        
        setPixelSize(Math.max(newPixelSize, 8));
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Draw selection overlay
  useEffect(() => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (selection.active && selection.bounds) {
      const { x, y, width, height } = selection.bounds;
      const ps = pixelSize * zoom;

      // Draw selection rectangle
      ctx.strokeStyle = "rgba(0, 123, 255, 0.8)";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(x * ps, y * ps, width * ps, height * ps);
      ctx.setLineDash([]);
    }
  }, [selection, pixelSize, zoom]);

  const getPixelCoords = (clientX: number, clientY: number): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const ps = pixelSize * zoom;
    const x = Math.floor((clientX - rect.left) / ps);
    const y = Math.floor((clientY - rect.top) / ps);

    // Use actual canvas grid dimensions for boundary check
    if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
      return { x, y };
    }
    return null;
  };

  const handleStart = (clientX: number, clientY: number) => {
    const coords = getPixelCoords(clientX, clientY);
    if (!coords) return;

    setStartPoint(coords);
    setIsDrawing(true);

    // Handle different tools
    switch (currentTool) {
      case "fill":
        if (fillMode === "contiguous") {
          const newGrid = floodFill(canvasGrid, coords.x, coords.y, currentColor);
          onPixelChange(newGrid);
        } else {
          const targetColor = canvasGrid[coords.y][coords.x];
          const newGrid = globalFill(canvasGrid, targetColor, currentColor);
          onPixelChange(newGrid);
        }
        setIsDrawing(false);
        break;

      case "eyedropper":
        const pickedColor = canvasGrid[coords.y][coords.x];
        if (pickedColor !== "transparent") {
          onColorPick(pickedColor);
        }
        setIsDrawing(false);
        break;

      case "pencil":
      case "eraser":
        handleDraw(coords);
        break;
    }
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDrawing || !startPoint) return;

    const coords = getPixelCoords(clientX, clientY);
    if (!coords) return;

    setEndPoint(coords);

    switch (currentTool) {
      case "pencil":
      case "eraser":
        handleDraw(coords);
        break;

      case "line":
        setPreviewGrid(drawLine(canvasGrid, startPoint.x, startPoint.y, coords.x, coords.y, currentColor));
        break;

      case "circle":
        const radius = Math.round(
          Math.sqrt(Math.pow(coords.x - startPoint.x, 2) + Math.pow(coords.y - startPoint.y, 2))
        );
        setPreviewGrid(drawCircle(canvasGrid, startPoint.x, startPoint.y, radius, currentColor, false));
        break;

      case "square":
        setPreviewGrid(drawRectangle(canvasGrid, startPoint.x, startPoint.y, coords.x, coords.y, currentColor, false));
        break;
    }
  };

  const handleEnd = () => {
    if (!isDrawing || !startPoint) {
      setIsDrawing(false);
      setMoveOffset(null);
      return;
    }

    // Finalize shape tools
    if (previewGrid) {
      onPixelChange(previewGrid);
      setPreviewGrid(null);
    }

    setIsDrawing(false);
    setStartPoint(null);
    setEndPoint(null);
    setMoveOffset(null);
  };

  const handleDraw = (coords: Point) => {
    const newGrid = canvasGrid.map((row) => [...row]);

    switch (currentTool) {
      case "pencil":
        // Draw with pencil size (1x1, 2x2, 3x3, 4x4, or 5x5)
        const halfSize = Math.floor(pencilSize / 2);
        
        for (let dy = -halfSize; dy <= halfSize; dy++) {
          for (let dx = -halfSize; dx <= halfSize; dx++) {
            const targetX = coords.x + dx;
            const targetY = coords.y + dy;
            
            // Check bounds
            if (targetX >= 0 && targetX < gridWidth && targetY >= 0 && targetY < gridHeight) {
              const brushColor = getBrushColor(targetX, targetY, currentColor);
              newGrid[targetY][targetX] = brushColor;
            }
          }
        }
        
        // Increment rainbow hue shift for next pixel
        if (brushMode === "rainbow") {
          setRainbowHueShift((prev) => (prev + 10) % 360);
        }
        
        onPixelChange(newGrid);
        break;
      case "eraser":
        // Erase with pencil size
        const eraserHalfSize = Math.floor(pencilSize / 2);
        
        for (let dy = -eraserHalfSize; dy <= eraserHalfSize; dy++) {
          for (let dx = -eraserHalfSize; dx <= eraserHalfSize; dx++) {
            const targetX = coords.x + dx;
            const targetY = coords.y + dy;
            
            // Check bounds
            if (targetX >= 0 && targetX < gridWidth && targetY >= 0 && targetY < gridHeight) {
              newGrid[targetY][targetX] = "transparent";
            }
          }
        }
        
        onPixelChange(newGrid);
        break;
    }
  };

  // Track last client position for marquee
  let lastClientX = 0;
  let lastClientY = 0;

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    lastClientX = e.clientX;
    lastClientY = e.clientY;
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    lastClientX = e.clientX;
    lastClientY = e.clientY;
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      lastClientX = touch.clientX;
      lastClientY = touch.clientY;
      handleStart(touch.clientX, touch.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      lastClientX = touch.clientX;
      lastClientY = touch.clientY;
      handleMove(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    handleEnd();
  };

  const actualPixelSize = pixelSize * zoom;
  const canvasSize = Math.max(gridWidth, gridHeight) * actualPixelSize;

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          className="border-2 border-border cursor-crosshair rounded-sm shadow-lg bg-card touch-none"
          style={{
            imageRendering: "pixelated",
            backgroundImage:
              "linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%, hsl(var(--muted))), linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%, transparent 75%, hsl(var(--muted)) 75%, hsl(var(--muted)))",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 10px 10px",
          }}
        />
        <canvas
          ref={overlayCanvasRef}
          width={canvasSize}
          height={canvasSize}
          className="absolute top-0 left-0 pointer-events-none"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
    </div>
  );
};

