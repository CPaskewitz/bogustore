import React from "react";

type SizeDropdownProps = {
    sizes: string[];
    selectedSize: string | null | undefined;
    onSizeChange: (size: string) => void;
};

export default function SizeDropdown({ sizes, selectedSize, onSizeChange }: SizeDropdownProps) {
    return (
        <div className="mb-4">
            <label htmlFor="size-select" className="block text-brown-800 font-semibold">
                Select Size:
            </label>
            <select
                id="size-select"
                value={selectedSize || ''}
                onChange={(e) => onSizeChange(e.target.value)}
                className="border px-3 py-2 rounded-lg w-full text-brown-800"
            >
                {sizes.map((size, index) => (
                    <option key={index} value={size}>
                        {size}
                    </option>
                ))}
            </select>
        </div>
    );
}