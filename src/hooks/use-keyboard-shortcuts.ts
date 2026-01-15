import { useEffect } from "react";
import type { Tool } from "@/types/pixel-art";

interface UseKeyboardShortcutsProps {
  onToolChange: (tool: Tool) => void;
  onUndo: () => void;
  onRedo: () => void;
  onToggleGrid: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

/**
 * Custom hook for handling keyboard shortcuts
 * P = pencil, E = eraser, F = fill, I = eyedropper
 * Ctrl+Z = undo, Ctrl+Y = redo, G = toggle grid
 */
export const useKeyboardShortcuts = ({
  onToolChange,
  onUndo,
  onRedo,
  onToggleGrid,
  canUndo,
  canRedo,
}: UseKeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Tool shortcuts
      if (!e.ctrlKey && !e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "p":
            e.preventDefault();
            onToolChange("pencil");
            break;
          case "e":
            e.preventDefault();
            onToolChange("eraser");
            break;
          case "f":
            e.preventDefault();
            onToolChange("fill");
            break;
          case "i":
            e.preventDefault();
            onToolChange("eyedropper");
            break;
          case "g":
            e.preventDefault();
            onToggleGrid();
            break;
        }
      }

      // Undo/Redo shortcuts
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "z" && !e.shiftKey && canUndo) {
          e.preventDefault();
          onUndo();
        } else if (
          ((e.key === "y" && !e.shiftKey) || (e.key === "z" && e.shiftKey)) &&
          canRedo
        ) {
          e.preventDefault();
          onRedo();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onToolChange, onUndo, onRedo, onToggleGrid, canUndo, canRedo]);
};
