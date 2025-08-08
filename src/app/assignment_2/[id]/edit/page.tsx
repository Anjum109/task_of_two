'use client';

import React, { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetProductQuery, useUpdateProductMutation } from '@/redux/store/api/productsApi';
import ProductForm from '@/app/components/assignment2/ProductForm';
import { Product } from '@/redux/features/product/productTypes';

export default function EditProductPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const id = params.id;

    const { data: product, isLoading, isError } = useGetProductQuery(Number(id));
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
    const [successMsg, setSuccessMsg] = useState('');
    const router = useRouter();

    const handleUpdate = async (values: Partial<Product>) => {
        try {
            await updateProduct({ id: Number(id), data: values }).unwrap();
            setSuccessMsg('✅ Product updated successfully!');
            // If you still want to redirect after showing success for 1s:
            // setTimeout(() => router.push('/assignment_2'), 1000);
        } catch (error) {
            setSuccessMsg('❌ Failed to update product.');
        }
    };

    if (isLoading) return <p>Loading product data...</p>;
    if (isError || !product) return <p>Failed to load product.</p>;

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl mb-4">Edit Product</h2>

            {successMsg && (
                <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded">
                    {successMsg}
                </div>
            )}

            <ProductForm initial={product} onSubmit={handleUpdate} />
            {isUpdating && <p>Saving...</p>}
        </div>
    );
}
