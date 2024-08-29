type Product = {
    title: string;
    details: string;
    price: number;
    inventory: number;
    onSale: boolean;
};

export default function ProductDetails({ product }: { product: Product }) {
    return (
        <div className="space-y-4">
            <h1 className="text-4xl font-bold text-brown-800">{product.title}</h1>
            <p className="text-xl text-brown-600">${product.price.toFixed(2)}</p>
            <p className="text-lg text-brown-600">{product.details}</p>
            <p className="text-lg text-brown-600">In stock: {product.inventory}</p>
            {product.onSale && <p className="text-lg text-green-600">On Sale!</p>}
        </div>
    );
}