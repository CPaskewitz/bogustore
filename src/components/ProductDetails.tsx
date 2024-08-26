export default function ProductDetails({ product }: { product: { name: string; price: string; description: string } }) {
    return (
        <div className="space-y-4">
            <h1 className="text-4xl font-bold text-brown-800">{product.name}</h1>
            <p className="text-xl text-brown-600">{product.price}</p>
            <p className="text-lg text-brown-600">{product.description}</p>
        </div>
    );
}