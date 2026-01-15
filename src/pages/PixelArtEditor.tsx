import React, { useState } from "react";
import { PixelCanvas } from "@/components/pixel-art/PixelCanvas";
import { Toolbar } from "@/components/pixel-art/Toolbar";
import { ColorPicker } from "@/components/pixel-art/ColorPicker";
import { Controls } from "@/components/pixel-art/Controls";
import { useHistory } from "@/hooks/use-history";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { createEmptyCanvas } from "@/utils/canvas-utils";
import type { Tool, Color, CanvasGrid } from "@/types/pixel-art";
import { Palette } from "lucide-react";

const CANVAS_SIZE = 32;

export default function PixelArtEditor() {
  const [currentTool, setCurrentTool] = useState<Tool>("pencil");
  const [currentColor, setCurrentColor] = useState<Color>("#000000");
  const [showGrid, setShowGrid] = useState(true);

  const {
    state: canvasGrid,
    setState: setCanvasGrid,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory,
  } = useHistory<CanvasGrid>(createEmptyCanvas(CANVAS_SIZE), 20);

  const handlePixelChange = (newGrid: CanvasGrid) => {
    setCanvasGrid(newGrid);
  };

  const handleColorPick = (color: Color) => {
    setCurrentColor(color);
    setCurrentTool("pencil"); // Switch back to pencil after picking color
  };

  const handleClear = () => {
    setCanvasGrid(createEmptyCanvas(CANVAS_SIZE));
    clearHistory();
  };

  const handleToggleGrid = () => {
    setShowGrid((prev) => !prev);
  };

  useKeyboardShortcuts({
    onToolChange: setCurrentTool,
    onUndo: undo,
    onRedo: redo,
    onToggleGrid: handleToggleGrid,
    canUndo,
    canRedo,
  });

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
              <Palette className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Pixel Art Editor
              </h1>
              <p className="text-sm text-muted-foreground">
                Create beautiful pixel art in your browser
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-[auto_1fr_auto] gap-6 items-start">
          {/* Left Sidebar - Tools */}
          <div className="xl:sticky xl:top-8">
            <Toolbar currentTool={currentTool} onToolChange={setCurrentTool} />
          </div>

          {/* Center - Canvas */}
          <div className="flex flex-col items-center gap-4">
            <PixelCanvas
              canvasGrid={canvasGrid}
              currentTool={currentTool}
              currentColor={currentColor}
              showGrid={showGrid}
              onPixelChange={handlePixelChange}
              onColorPick={handleColorPick}
            />
          </div>

          {/* Right Sidebar - Colors & Controls */}
          <div className="xl:sticky xl:top-8 flex flex-col gap-4">
            <ColorPicker
              currentColor={currentColor}
              onColorChange={setCurrentColor}
            />
            <Controls
              canvasGrid={canvasGrid}
              canvasSize={CANVAS_SIZE}
              showGrid={showGrid}
              canUndo={canUndo}
              canRedo={canRedo}
              onUndo={undo}
              onRedo={redo}
              onClear={handleClear}
              onToggleGrid={handleToggleGrid}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 Pixel Art Editor. Create, export, and share your pixel art.
          </p>
        </div>
      </footer>
    </div>
  );
}
