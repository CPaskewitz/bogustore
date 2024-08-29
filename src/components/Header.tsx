'use client';
import Link from 'next/link';
import CartIcon from '../components/CartIcon';

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
            <Link href="/sale" className="hover:text-brown-800 transition">
              Sale
            </Link>
          </li>
          <li className="flex items-center">
            <CartIcon />
            <Link href="/cart" className="hover:text-brown-800 transition">
              Cart
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}