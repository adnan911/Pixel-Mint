import React, { useMemo } from "react";
import { PREMADE_STAMPS, Stamp } from "@/data/stamps";
import { CanvasGrid } from "@/types/pixel-art";

interface StampSelectorProps {
    onSelectStamp: (stamp: Stamp) => void;
    selectedStampId?: string;
}

export const StampSelector: React.FC<StampSelectorProps> = ({
    onSelectStamp,
    selectedStampId,
}) => {
    const categories = useMemo(() => {
        const cats: Record<string, Stamp[]> = {};
        PREMADE_STAMPS.forEach((stamp) => {
            if (!cats[stamp.category]) {
                cats[stamp.category] = [];
            }
            cats[stamp.category].push(stamp);
        });
        return cats;
    }, []);

    return (
        <div className="bg-popover border-l border-border w-64 flex flex-col h-full overflow-hidden shadow-xl animate-in slide-in-from-right duration-200">
            <div className="p-3 border-b border-border bg-muted/30">
                <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                    <span className="text-lg">✨</span> Stamp Collection
                </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar">
                {Object.entries(categories).map(([category, stamps]) => (
                    <div key={category}>
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                            {category}
                        </h4>
                        <div className="grid grid-cols-4 gap-2">
                            {stamps.map((stamp) => (
                                <button
                                    key={stamp.id}
                                    onClick={() => onSelectStamp(stamp)}
                                    className={`
                    group relative aspect-square p-1 rounded-md border-2 transition-all hover:scale-105
                    ${selectedStampId === stamp.id
                                            ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                                            : "border-border bg-card hover:border-sidebar-primary"}
                  `}
                                    title={stamp.name}
                                >
                                    <div className="w-full h-full flex items-center justify-center overflow-hidden">
                                        <StampPreview grid={stamp.data} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const StampPreview: React.FC<{ grid: CanvasGrid }> = ({ grid }) => {
    const height = grid.length;
    const width = height > 0 ? grid[0].length : 0;
    const size = Math.max(width, height);

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${width}, 1fr)`,
                width: "100%",
                maxWidth: "40px",
                height: "auto",
                aspectRatio: `${width} / ${height}`,
                gap: "1px",
            }}
        >
            {grid.map((row, y) =>
                row.map((color, x) => (
                    <div
                        key={`${x}-${y}`}
                        style={{
                            backgroundColor: color === "transparent" ? "transparent" : color,
                            width: "100%",
                            height: "100%",
                        }}
                    />
                ))
            )}
        </div>
    );
};
