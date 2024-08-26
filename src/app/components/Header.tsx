export default function Header() {
    return (
        <header className="p-6 bg-beige-200 shadow-md">
            <nav className="max-w-6xl mx-auto flex justify-between">
                <h1 className="text-3xl font-bold text-brown-800">Homey Store</h1>
                <ul className="flex gap-4 text-brown-700">
                    <li><a href="/">Home</a></li>
                    <li><a href="/shop">Shop</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}