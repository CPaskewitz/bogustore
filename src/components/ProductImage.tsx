import React from 'react';
import Image from 'next/image';

export default function ProductImage({
    imageUrl,
    alt,
    children,
}: {
    imageUrl: string;
    alt: string;
    children?: React.ReactNode;
}) {
    return (
        <div className="relative bg-beige-300 border-2 border-sage-green rounded-lg overflow-hidden inline-block" style={{ width: '400px', height: '400px' }}>
            <Image
                src={imageUrl}
                alt={alt}
                width={400}
                height={400}
                className="w-full h-full object-cover"
            />
            {children}
        </div>
    );
}