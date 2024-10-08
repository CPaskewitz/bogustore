import React from 'react';
import Link from 'next/link';

export default function Promotion() {
    return (
        <Link href="/sale" passHref>
            <section className="cursor-pointer w-full mb-8 p-6 bg-soft-coral text-white text-center rounded-lg">
                <h2 className="text-3xl font-bold">Special Offer: Up to 25% Off Selected Items!</h2>
                <p className="mt-2">Don't miss out on our limited-time promotion. Shop now!</p>
            </section>
        </Link>
    );
}