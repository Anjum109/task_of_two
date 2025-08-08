'use client';

import ProductForm from '@/app/components/assignment2/ProductForm';
import React from 'react';

export default function CreateProductPage() {
    const handleCreateProduct = async (values: any) => {
        console.log('Creating product:', values);
        // here you can POST to your API
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl mb-4">Create Product</h2>
            <ProductForm onSubmit={handleCreateProduct} />
        </div>
    );
}
