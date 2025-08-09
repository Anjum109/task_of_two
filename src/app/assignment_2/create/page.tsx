'use client';
import ProductForm, { FormSchema } from '@/app/components/assignment2/ProductForm';
import { useCreateProductMutation } from '@/redux/store/api/productsApi';
import React, { useState } from 'react';


export default function CreateProductPage() {
    const [createProduct] = useCreateProductMutation();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleCreateProduct = async (values: FormSchema) => {
        try {
            const productPayload = {
                title: values.title,
                price: values.price,
                description: values.description || '',
                categoryId: Number(values.category), // make sure it's an ID (number)
                images: values.image ? [values.image] : [], // API wants an array of image URLs
            };

            await createProduct(productPayload).unwrap();
            alert('Product created successfully!');
            return true;
        } catch (error) {
            console.error('Create failed:', error);
            return false;
        }
    };


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Add Product</h1>
            <ProductForm onSubmit={handleCreateProduct} />

            {successMessage && <p className="mt-3 text-green-600">{successMessage}</p>}
            {errorMessage && <p className="mt-3 text-red-600">{errorMessage}</p>}
        </div>
    );
}
