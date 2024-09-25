import React from "react";

type ColorSelectorProps = {
    colors: string[];
    selectedColor: string | null | undefined;
    onColorChange: (color: string) => void;
};

export default function ColorSelector({ colors, selectedColor, onColorChange }: ColorSelectorProps) {
    return (
        <div className="mb-4">
            <label className="block text-brown-800 font-semibold">Select Color:</label>
            <div className="flex gap-2 mt-2">
                {colors.map((color, index) => (
                    <button
                        key={index}
                        className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-black' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                        onClick={() => onColorChange(color)}
                    />
                ))}
            </div>
        </div>
    );
}