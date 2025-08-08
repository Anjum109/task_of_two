'use client';

import { useGetProductQuery } from '@/redux/store/api/productsApi';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
    const params = useParams<{ id: string }>();
    const id = Number(params.id); // convert to number for the API

    const { data: product, isLoading, error } = useGetProductQuery(id);

    if (isLoading) return <p>Loading product details...</p>;
    if (error) return <p>Failed to load product.</p>;
    if (!product) return <p>No product found.</p>;

    return (
        <div>
            <h1>{product.title}</h1>

            <p>Price: ${product.price}</p>
            <p>{product.description}</p>

        </div>
    );
}
