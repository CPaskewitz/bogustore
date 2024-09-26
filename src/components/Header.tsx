'use client';
import React from 'react';
import Link from 'next/link';
import CartIcon from '../components/CartIcon';

export default function Header() {
  return (
    <header className="p-6 bg-beige-200 shadow-md">
      <nav className="max-w-6xl mx-auto flex items-center">
        <Link href="/" className="text-3xl font-bold text-brown-800 mr-auto">
          BoguStore
        </Link>
        <ul className="flex items-center gap-8 text-brown-700">
          <li className="flex items-center">
            <Link href="/" className="hover:soft-coral-800 transition">
              Home
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="/sale" className="hover:soft-coral-800 transition">
              Sale
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="/cart" className="hover:soft-coral-800 transition flex items-center">
              Cart
              <span className="ml-2">
                <CartIcon />
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}