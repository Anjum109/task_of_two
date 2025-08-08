'use client';
import React from 'react';
import Link from 'next/link';
import { Product } from '@/redux/features/product/productTypes';

interface ProductCardProps {
    product: Product;
    onDelete: (id: number | string) => void;
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
    return (
        <div className="border rounded p-3 flex flex-col">
            <h3 className="font-semibold">{product.title}</h3>
            <p className="text-sm flex-grow">{product.description}</p>
            <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
            <div className="mt-2 flex gap-2">
                <Link href={`/assignment_2/${product.id}`} className="text-blue-600 hover:underline">View</Link>
                <Link href={`/assignment_2/${product.id}/edit`} className="text-green-600 hover:underline">Edit</Link>
                <button
                    onClick={() => onDelete(product.id)}
                    className="text-red-600 hover:underline"
                    type="button"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
