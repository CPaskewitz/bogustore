import ProductCard from './ProductCard';

export default function RelatedProducts() {
    const relatedProducts = [
        { id: 2, name: 'Product 2', price: '$75.00', imageUrl: '/product-2.jpg' },
        { id: 3, name: 'Product 3', price: '$100.00', imageUrl: '/product-3.jpg' },
    ];

    return (
        <section className="mt-12">
            <h2 className="text-3xl font-bold text-brown-800 mb-6">Related Products</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}