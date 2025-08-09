'use client';
import React from 'react';
import Link from 'next/link';
import { Product } from '@/redux/features/product/productTypes';

interface ProductCardProps {
    product: Product;
    onDelete: (id: number | string) => void;
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
    // Shorten description to 100 chars with "..." if longer
    const shortDescription =
        product.description && product.description.length > 100
            ? product.description.slice(0, 100) + '... '
            : product.description;

    return (
        <div className="border rounded p-3 flex flex-col bg-black">
            <h3 className="font-semibold">{product.title}</h3>
            <p className="text-sm my-2 text-justify">
                {shortDescription}
                {product.description && product.description.length > 100 && (
                    <Link
                        href={`/assignment_2/${product.id}`}
                        className="text-blue-600 hover:underline"
                    >
                        See more
                    </Link>
                )}
            </p>
            <p className="font-bold">${product.price.toFixed(2)}</p>
            <div className="mt-2 flex justify-center gap-2">
                <Link href={`/assignment_2/${product.id}`} className="text-blue-600 hover:underline border-2 px-3">
                    View
                </Link>
                <Link href={`/assignment_2/${product.id}/edit`} className="text-green-600 hover:underline border-2 px-3">
                    Edit
                </Link>
                <button
                    onClick={() => onDelete(product.id)}
                    className="text-red-600 hover:underline border-2 px-3"
                    type="button"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
