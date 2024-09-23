import React from "react";

export default function SaleTag({ discount }: { discount: number }) {
    return (
        <span className="absolute top-2 right-2 bg-soft-coral text-white text-lg font-bold px-3 py-2 rounded">
            {discount}% OFF
        </span>
    );
}