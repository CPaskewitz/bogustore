import ProductCard from './ProductCard';

export default function ProductList() {
    const products = [
        { id: 1, name: 'Product 1', price: '$50.00', imageUrl: '/product-1.jpg' },
        { id: 2, name: 'Product 2', price: '$75.00', imageUrl: '/product-2.jpg' },
    ];

    return (
        <section className="w-full grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </section>
    );
}