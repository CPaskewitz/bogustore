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
        <div className="relative p-4 bg-beige-300 border-2 border-sage-green rounded-lg">
            <Image
                src={imageUrl}
                alt={alt}
                width={400}
                height={400}
                className="rounded-lg"
            />
            {children}
        </div>
    );
}