// app/assignment2/[id]/edit/page.tsx

'use client';

import { useGetProductQuery, useUpdateProductMutation, useGetCategoriesQuery } from '@/redux/store/api/productsApi';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function EditProductPage() {
    const params = useParams<{ id: string }>();
    const id = Number(params.id);
    const router = useRouter();

    const { data: product, isLoading: loadingProduct } = useGetProductQuery(id);
    const { data: categories, isLoading: loadingCategories } = useGetCategoriesQuery();
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        categoryId: '', // store category id as string for select input
        image: '', // single image url
    });

    // Pre-fill form when product is loaded
    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title || '',
                price: product.price?.toString() || '',
                description: product.description || '',
                categoryId: product.category && typeof product.category === 'object' ? String(product.category.id) : '',
                image: product.image || '',
            });
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            title: formData.title,
            price: Number(formData.price),
            description: formData.description,
            categoryId: Number(formData.categoryId),
            images: formData.image ? [formData.image] : ['https://placeimg.com/640/480/any'],
        };

        console.log('Payload for update:', payload);

        try {
            await updateProduct({ id, data: payload }).unwrap();
            alert('Product updated successfully!');
            router.push(`/assignment_2/${id}`);
        } catch (err: unknown) {
            if (typeof err === 'object' && err !== null) {
                // If the error has a 'data' property
                if ('data' in err) {
                    console.error('Update failed with API response:', (err as { data: unknown }).data);
                    alert('Failed to update product: ' + JSON.stringify((err as { data: unknown }).data));
                } else if ('error' in err) {
                    console.error('Update failed with error:', (err as { error: string }).error);
                    alert('Failed to update product: ' + (err as { error: string }).error);
                } else {
                    console.error('Update failed:', err);
                    alert('Failed to update product');
                }
            } else {
                console.error('Unknown error:', err);
                alert('Failed to update product');
            }
        }


    };


    if (loadingProduct || loadingCategories) return <p>Loading...</p>;

    return (
        <div className="bg-black w-full text-white py-12 lg:py-[100px]">
            <div className="w-full flex flex-col items-center justify-center">
                <h1 className="text-4xl">Edit Product</h1>
                <form onSubmit={handleSubmit} className="bg-black text-white mt-5 w-full px-12">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="title" className="mb-1">
                                Title:
                            </label>
                            <input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Title"
                                required
                                className="border-2 p-3 text-white"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="price" className="mb-1">
                                Price:
                            </label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Price"
                                required
                                className="border-2 p-3 text-white"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="description" className="mb-1">
                                Description:
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Description"
                                required
                                className="border-2 p-3 h-32 text-white"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="categoryId" className="mb-1">
                                Category:
                            </label>
                            <select
                                id="categoryId"
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                required
                                className="border-2 p-3 text-white"
                            >
                                <option value="">Select a category</option>
                                {categories?.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="image" className="mb-1">
                                Image URL:
                            </label>
                            <input
                                id="image"
                                name="image"
                                type="url"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                                className="border-2 p-3 text-white"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="border-2 px-5 py-3 bg-green-200 text-green-900 font-bold mt-5 disabled:opacity-50"
                        >
                            {isUpdating ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
