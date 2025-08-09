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
        <div className='bg-black text-white h-[1000px] p-12 lg:px-[300px] lg:py-[100px]'>
            <h1 className='text-[25px] font-bold'><span className='text-blue-300'>Title:</span> {product.title}</h1>

            <p className='text-[25px] font-bold'><span className='text-blue-300'>Price: </span> ${product.price}</p>
            <p className='text-[18px] mt-5'>{product.description}</p>

        </div >
    );
}
