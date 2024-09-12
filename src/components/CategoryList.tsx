import Link from 'next/link';

export default function CategoryList() {
    const categories = [
        { id: 'furniture', name: 'Furniture' },
        { id: 'electronics', name: 'Electronics' },
        { id: 'apparel', name: 'Apparel' },
    ];

    return (
        <section className="w-full mb-8 grid gap-8 md:grid-cols-3">
            {categories.map((category, index) => (
                <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="group block rounded-lg border border-sage-green shadow-lg hover:shadow-2xl transition-shadow bg-white bg-opacity-70 flex justify-center items-center"
                    style={{
                        height: '150px',
                        backgroundImage: 'url(/categoryBg.jpg)',
                        backgroundSize: '300%',
                        backgroundPosition: `${index * 100}% 0`,
                    }}
                >
                    <h3 className="text-2xl font-semibold text-white group-hover:text-soft-coral text-center"
                        style={{
                            textShadow: '1px 1px 0 brown, -1px 1px 0 brown, 1px -1px 0 brown, -1px -1px 0 brown',
                        }}
                    >
                        {category.name}
                    </h3>
                </Link>
            ))}
        </section>
    );
}