export default function CategoryPage({ params }: { params: { id: string } }) {
    const { id } = params;

    return (
        <div className="p-8 bg-beige-100 min-h-screen">
            <h1 className="text-3xl font-bold">Category Page for ID: {id}</h1>
        </div>
    );
}