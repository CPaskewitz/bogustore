import Link from 'next/link';

export default function Header() {
  return (
    <header className="p-6 bg-beige-200 shadow-md">
      <nav className="max-w-6xl mx-auto flex justify-between">
        <Link href="/" className="text-3xl font-bold text-brown-800">
          BoguStore
        </Link>
        <ul className="flex gap-4 text-brown-700">
          <li>
            <Link href="/" className="hover:text-brown-800 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/shop" className="hover:text-brown-800 transition">
              Shop
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-brown-800 transition">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-brown-800 transition">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}