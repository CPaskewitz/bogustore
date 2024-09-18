import SizeDropdown from '../components/SizeDropDown';
import ColorSelector from '../components/ColorSelector';

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
    sizes: [];
    colors: [];
};

export default function ProductDetails({ product }: { product: Product }) {
    const salePrice = product.onSale > 0 ? product.price * ((100 - product.onSale) / 100) : product.price;

    return (
        <div className="space-y-4">
            <h1 className="text-4xl font-bold text-brown-800">{product.title}</h1>
            <p className="text-xl text-brown-600">
                {product.onSale > 0 ? (
                    <>
                        <span className="line-through mr-2">${product.price.toFixed(2)}</span>
                        <span className="text-soft-coral">${salePrice.toFixed(2)}</span>
                    </>
                ) : (
                    <>${product.price.toFixed(2)}</>
                )}
            </p>
            <p className="text-lg text-brown-600">{product.details}</p>
            <p className="text-lg text-brown-600">In stock: {product.inventory}</p>
            {product.onSale > 0 && <p className="text-lg text-green-600">{product.onSale}% OFF!</p>}

            <SizeDropdown sizes={product.sizes} />
            <ColorSelector colors={product.colors} />
        </div>
    );
}