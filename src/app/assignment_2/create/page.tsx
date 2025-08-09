'use client';

import { useState } from 'react';
import { useCreateProductMutation, useGetCategoriesQuery } from '@/redux/store/api/productsApi';


export default function CreateProductPage() {
    const { data: categories, isLoading } = useGetCategoriesQuery();
    const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        categoryId: '',
        image: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        const categoryIdNum = Number(formData.categoryId);
        const priceNum = Number(formData.price);

        if (!formData.title.trim()) {
            alert('Title is required');
            return;
        }
        if (isNaN(priceNum) || priceNum <= 0) {
            alert('Please enter a valid price');
            return;
        }
        if (!formData.description.trim()) {
            alert('Description is required');
            return;
        }
        if (isNaN(categoryIdNum) || categoryIdNum <= 0) {
            alert('Please select a valid category');
            return;
        }

        const payload = {
            title: formData.title.trim(),
            price: priceNum,
            description: formData.description.trim(),
            categoryId: categoryIdNum,
            images: formData.image ? [formData.image.trim()] : ['https://placeimg.com/640/480/any'],
        };

        console.log('Payload:', payload);
        try {
            await createProduct(payload).unwrap();
            alert('Product created successfully!');

        } catch (error: unknown) {
            if (
                typeof error === 'object' &&
                error !== null &&
                'data' in error &&
                typeof (error as { data?: { message?: string } }).data === 'object' &&
                (error as { data?: { message?: string } }).data?.message
            ) {
                alert('Failed to create product: ' + (error as { data: { message: string } }).data.message);
            } else {
                alert('Failed to create product: Unknown error');
            }
            console.error('Create failed:', error);
        }

    };

    if (isLoading) return <p>Loading categories...</p>;

    return (
        <div className="p-8 max-w-xl mx-auto">
            <h1 className="text-3xl mb-6">Create New Product</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="border p-2"
                />
                <input
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="border p-2"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="border p-2"
                />
                <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    required
                    className="border p-2"
                >
                    <option value="">Select category</option>
                    {categories?.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <input
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    className="border p-2"
                />
                <button
                    type="submit"
                    disabled={isCreating}
                    className="bg-blue-600 text-white py-2 rounded disabled:opacity-50"
                >
                    {isCreating ? 'Creating...' : 'Create Product'}
                </button>
            </form>
        </div>
    );
}
