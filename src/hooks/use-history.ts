import { useState, useCallback } from "react";

interface UseHistoryReturn<T> {
  state: T;
  setState: (newState: T) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  clearHistory: () => void;
}

/**
 * Custom hook for managing undo/redo history
 * Maintains a history stack with a maximum size
 */
export const useHistory = <T>(
  initialState: T,
  maxHistory = 20
): UseHistoryReturn<T> => {
  const [history, setHistory] = useState<T[]>([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const setState = useCallback(
    (newState: T) => {
      setHistory((prev) => {
        // Remove any future states if we're not at the end
        const newHistory = prev.slice(0, currentIndex + 1);
        // Add new state
        newHistory.push(newState);
        // Limit history size
        if (newHistory.length > maxHistory) {
          newHistory.shift();
          setCurrentIndex(maxHistory - 1);
        } else {
          setCurrentIndex(newHistory.length - 1);
        }
        return newHistory;
      });
    },
    [currentIndex, maxHistory]
  );

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, history.length]);

  const clearHistory = useCallback(() => {
    setHistory([initialState]);
    setCurrentIndex(0);
  }, [initialState]);

  return {
    state: history[currentIndex],
    setState,
    undo,
    redo,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
    clearHistory,
  };
};
