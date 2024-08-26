import Image from 'next/image';

export default function ProductImage({ imageUrl, alt }: { imageUrl: string; alt: string }) {
    return (
        <div className="rounded-lg shadow-lg overflow-hidden">
            <Image
                src={imageUrl}
                alt={alt}
                width={500}
                height={500}
                className="object-cover"
            />
        </div>
    );
}