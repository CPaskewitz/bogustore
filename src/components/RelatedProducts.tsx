import { useEffect, useState, useRef } from 'react';
import ProductCard from './ProductCard';

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

export default function RelatedProducts({ category, currentProductId }: { category: string, currentProductId: number }) {
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        fetch(`/api/products?category=${category}`)
            .then(response => response.json())
            .then(data => {
                const filteredProducts = data.filter((product: Product) => product.id !== currentProductId);
                setRelatedProducts(filteredProducts);
            })
            .catch(error => console.error('Error fetching related products:', error));
    }, [category, currentProductId]);

    const handleScroll = (direction: string) => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            const scrollAmount = scrollContainer.clientWidth / 2;
            scrollContainer.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="mt-12">
            <h2 className="text-3xl font-bold text-brown-800 mb-6">Related Products</h2>
            <div className="relative group">
                <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 h-10 w-10 px-2 hidden group-hover:block text-white bg-black bg-opacity-50 z-10"
                    onClick={() => handleScroll('left')}
                >
                    ←
                </button>
                <div ref={scrollRef} className="w-full overflow-x-scroll whitespace-nowrap py-4 relative">
                    {relatedProducts.map((product) => (
                        <div key={product.id} className="inline-block px-2 w-[280px] h-[280px]">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
                <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 h-10 w-10 px-2 hidden group-hover:block text-white bg-black bg-opacity-50 z-10"
                    onClick={() => handleScroll('right')}
                >
                    →
                </button>
            </div>
        </section>
    );
}