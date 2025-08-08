'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetProductQuery, useUpdateProductMutation } from '@/redux/store/api/productsApi';
import ProductForm from '@/app/components/assignment2/ProductForm';
import { Product } from '@/redux/features/product/productTypes';

interface EditProductPageProps {
    params: {
        id: string;
    };
}

export default function EditProductPage({ params }: EditProductPageProps) {
    const { id } = params;
    const { data: product, isLoading, isError } = useGetProductQuery(Number(id));
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
    const router = useRouter();

    const handleUpdate = async (values: Partial<Product>) => {
        try {
            await updateProduct({ id: Number(id), data: values }).unwrap();
            alert('Product updated successfully');
            router.push('/assignment_2');
        } catch (error) {
            alert('Failed to update product');
        }
    };

    if (isLoading) return <p>Loading product data...</p>;
    if (isError || !product) return <p>Failed to load product.</p>;

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl mb-4">Edit Product</h2>
            <ProductForm initial={product} onSubmit={handleUpdate} />
            {isUpdating && <p>Updating...</p>}
        </div>
    );
}
