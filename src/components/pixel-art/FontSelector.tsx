import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const PIXEL_FONTS = [
    { id: "jersey-10", name: "Jersey 10", family: '"Jersey 10", sans-serif' },
    { id: "pixelify-sans", name: "Pixelify Sans", family: '"Pixelify Sans", sans-serif' },
    { id: "jacquarda-bastarda-9", name: "Jacquarda Bastarda", family: '"Jacquarda Bastarda 9", serif' },
    { id: "bytesized", name: "Bytesized", family: '"Bytesized", sans-serif' },
    { id: "tiny5", name: "Tiny5", family: '"Tiny5", sans-serif' },
    { id: "vt323", name: "VT323", family: '"VT323", monospace' },
    { id: "press-start-2p", name: "Press Start 2P", family: '"Press Start 2P", cursive' },
];

interface FontSelectorProps {
    currentFont: string;
    onFontChange: (font: string) => void;
}

export const FontSelector: React.FC<FontSelectorProps> = ({
    currentFont,
    onFontChange,
}) => {
    return (
        <Select value={currentFont} onValueChange={onFontChange}>
            <SelectTrigger className="w-[180px] h-10 border-2 border-border font-retro bg-card">
                <SelectValue placeholder="Select Font" />
            </SelectTrigger>
            <SelectContent className="border-2 border-border pixel-card">
                {PIXEL_FONTS.map((font) => (
                    <SelectItem
                        key={font.id}
                        value={font.id}
                        className="cursor-pointer hover:bg-primary/20 focus:bg-primary/20"
                        style={{ fontFamily: font.family }}
                    >
                        {font.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
