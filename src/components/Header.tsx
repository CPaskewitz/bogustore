'use client';
import Link from 'next/link';
import CartIcon from '../components/CartIcon';

export default function Header() {
  return (
    <header className="p-6 bg-beige-200 shadow-md">
      <nav className="max-w-6xl mx-auto flex justify-center items-center">
        <Link href="/" className="text-3xl font-bold text-brown-800 mr-auto">
          BoguStore
        </Link>
        <ul className="flex gap-8 text-brown-700">
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
            <Link href="/cart" className="hover:text-brown-800 transition ml-2">
              Cart
            </Link>
            <CartIcon />
          </li>
        </ul>
      </nav>
    </header>
  );
}