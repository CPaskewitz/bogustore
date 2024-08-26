import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }: { product: { id: number; name: string; price: string; imageUrl: string; } }) {
    return (
        <Link href={`/product/${product.id}`} className="group block rounded-lg border border-sage-green p-6 shadow-lg hover:shadow-2xl transition-shadow bg-white">
            <Image
                src={product.imageUrl}
                alt={product.name}
                width={400}
                height={400}
                className="rounded-lg"
            />
            <h2 className="mt-4 text-2xl font-semibold text-brown-800 group-hover:text-soft-coral">
                {product.name}
            </h2>
            <p className="text-sm text-brown-600">{product.price}</p>
        </Link>
    );
}