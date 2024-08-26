export default function CategoryList() {
    const categories = [
        { id: 1, name: 'Furniture', imageUrl: '/category-furniture.jpg' },
        { id: 2, name: 'Electronics', imageUrl: '/category-electronics.jpg' },
        { id: 3, name: 'Apparel', imageUrl: '/category-apparel.jpg' },
    ];

    return (
        <section className="w-full mb-8 grid gap-8 md:grid-cols-3">
            {categories.map((category) => (
                <div key={category.id} className="group rounded-lg border border-sage-green p-6 shadow-lg hover:shadow-2xl transition-shadow bg-white">
                    <img src={category.imageUrl} alt={category.name} className="rounded-lg w-full h-48 object-cover" />
                    <h3 className="mt-4 text-2xl font-semibold text-brown-800 group-hover:text-soft-coral">{category.name}</h3>
                </div>
            ))}
        </section>
    );
}