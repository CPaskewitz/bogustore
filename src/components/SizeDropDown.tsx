import { useState } from 'react';

type SizeDropdownProps = {
    sizes: string[];
};

export default function SizeDropdown({ sizes }: SizeDropdownProps) {
    const [selectedSize, setSelectedSize] = useState(sizes[0]);

    if (sizes[0] === 'none') return null;

    return (
        <div className="mb-4">
            <label className="block text-brown-800 font-semibold">Select Size:</label>
            <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
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