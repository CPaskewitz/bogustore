import ProductImage from '../components/ProductImage';
import ProductDetails from '../components/ProductDetails';
import Button from '../components/Button';
import RelatedProducts from '../components/RelatedProducts';

export default function ProductPage() {
    const product = {
        id: 1,
        name: 'Product 1',
        price: '$50.00',
        description: 'This is a great product that will improve your life.',
        imageUrl: '/product-1.jpg',
    };

    const handleAddToCart = () => {
        console.log(`${product.name} added to cart`);
    };

    return (
        <main className="p-8 bg-beige-100 min-h-screen">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProductImage imageUrl={product.imageUrl} alt={product.name} />
                <div>
                    <ProductDetails product={product} />
                    <Button label="Add to Cart" onClick={handleAddToCart} />
                </div>
            </div>
            <RelatedProducts />
        </main>
    );
}