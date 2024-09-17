import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dbFilePath = path.join(process.cwd(), 'db.json');

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const data = await fs.readFile(dbFilePath, 'utf-8');
    const { products } = JSON.parse(data);

    const product = products.find((product: any) => product.id === parseInt(params.id, 10));

    if (product) {
        return NextResponse.json(product);
    } else {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
}