import Image from 'next/image';

export default function ProductCard({ product }: { product: { id: number; name: string; price: string; imageUrl: string; } }) {
    return (
        <div className="group rounded-lg border border-sage-green p-6 shadow-lg hover:shadow-2xl transition-shadow bg-white">
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
            <button className="mt-4 px-4 py-2 bg-muted-blue text-white rounded hover:bg-soft-coral">
                Add to Cart
            </button>
        </div>
    );
}