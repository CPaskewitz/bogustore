import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SaleTag from './SaleTag';

type Product = {
    id: number;
    title: string;
    image: string;
    details: string;
    price: number;
    category: string;
    onSale: number;
    inventory: number;
    quantity: number;
    sizes: string[];
    colors: string[];
    size?: string;
    color?: string;
};

export default function ProductCard({ product }: { product: Product }) {
    const salePrice = product.onSale > 0 ? product.price * (1 - product.onSale / 100) : product.price;

    return (
        <Link href={`/product/${product.id}`} className="group relative block rounded-lg border border-sage-green shadow-lg hover:shadow-2xl transition-shadow bg-white">
            <div className="relative w-full h-[300px] overflow-hidden flex justify-center items-center rounded-t-lg">
                <Image
                    src={`/${product.image}`}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                    style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
                />
                {product.onSale > 0 && <SaleTag discount={product.onSale} />}
            </div>
            <div className="p-4">
                <h2 className="text-2xl font-semibold text-brown-800 group-hover:text-soft-coral">
                    {product.title}
                </h2>
                <p className="text-sm text-brown-600">
                    {product.onSale > 0 ? (
                        <>
                            <span className="line-through mr-2">${product.price.toFixed(2)}</span>
                            <span className="text-soft-coral">${salePrice.toFixed(2)}</span>
                        </>
                    ) : (
                        <>${product.price.toFixed(2)}</>
                    )}
                </p>
            </div>
        </Link>
    );
}