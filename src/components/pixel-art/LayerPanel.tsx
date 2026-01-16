import React from "react";
import { Plus, Layers as LayersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LayerItem } from "./LayerItem";
import type { Layer, BlendMode } from "@/types/pixel-art";

interface LayerPanelProps {
  layers: Layer[];
  activeLayerId: string;
  onLayerSelect: (layerId: string) => void;
  onLayerCreate: () => void;
  onLayerDuplicate: (layerId: string) => void;
  onLayerDelete: (layerId: string) => void;
  onLayerUpdate: (layerId: string, updates: Partial<Layer>) => void;
  onLayerReorder: (fromIndex: number, toIndex: number) => void;
}

export const LayerPanel: React.FC<LayerPanelProps> = ({
  layers,
  activeLayerId,
  onLayerSelect,
  onLayerCreate,
  onLayerDuplicate,
  onLayerDelete,
  onLayerUpdate,
  onLayerReorder,
}) => {
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    onLayerReorder(draggedIndex, index);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <LayersIcon className="h-5 w-5" />
          <h3 className="font-semibold">Layers</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onLayerCreate}
          className="h-8 mr-[50px] bg-[#99c8f3] bg-none"
        >
          <Plus className="h-4 w-4 mr-1" />
          New
        </Button>
      </div>
      {/* Layer List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {layers.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground py-8">
            No layers. Click "New" to create one.
          </div>
        ) : (
          layers.map((layer, index) => (
            <div
              key={layer.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={draggedIndex === index ? "opacity-50" : ""}
            >
              <LayerItem
                layer={layer}
                isActive={layer.id === activeLayerId}
                onSelect={() => onLayerSelect(layer.id)}
                onToggleVisibility={() =>
                  onLayerUpdate(layer.id, { visible: !layer.visible })
                }
                onToggleLock={() =>
                  onLayerUpdate(layer.id, { locked: !layer.locked })
                }
                onToggleAlphaLock={() =>
                  onLayerUpdate(layer.id, { alphaLock: !layer.alphaLock })
                }
                onOpacityChange={(opacity) =>
                  onLayerUpdate(layer.id, { opacity })
                }
                onBlendModeChange={(blendMode: BlendMode) =>
                  onLayerUpdate(layer.id, { blendMode })
                }
                onDuplicate={() => onLayerDuplicate(layer.id)}
                onDelete={() => onLayerDelete(layer.id)}
                onRename={(name) => onLayerUpdate(layer.id, { name })}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
