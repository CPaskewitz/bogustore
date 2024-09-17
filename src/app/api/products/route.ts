import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dbFilePath = path.join(process.cwd(), 'db.json');

export async function GET(request: Request) {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const onSale = url.searchParams.get('onSale');

    const data = await fs.readFile(dbFilePath, 'utf-8');
    const { products } = JSON.parse(data);

    let filteredProducts = products;

    if (category) {
        filteredProducts = filteredProducts.filter((product: any) => product.category === category);
    }

    if (onSale === 'true') {
        filteredProducts = filteredProducts.filter((product: any) => product.onSale === true);
    }

    return NextResponse.json(filteredProducts);
}