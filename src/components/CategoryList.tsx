import Link from 'next/link';

export default function CategoryList() {
    const categories = [
        { id: 'furniture', name: 'Furniture', imageUrl: '/category-furniture.jpg' },
        { id: 'electronics', name: 'Electronics', imageUrl: '/category-electronics.jpg' },
        { id: 'apparel', name: 'Apparel', imageUrl: '/category-apparel.jpg' },
    ];

    return (
        <section className="w-full mb-8 grid gap-8 md:grid-cols-3">
            {categories.map((category) => (
                <Link key={category.id} href={`/category/${category.id}`} className="group block rounded-lg border border-sage-green p-6 shadow-lg hover:shadow-2xl transition-shadow bg-white">
                    <img src={category.imageUrl} alt={category.name} className="rounded-lg w-full h-48 object-cover" />
                    <h3 className="mt-4 text-2xl font-semibold text-brown-800 group-hover:text-soft-coral">
                        {category.name}
                    </h3>
                </Link>
            ))}
        </section>
    );
}