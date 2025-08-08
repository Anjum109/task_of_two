'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Product } from '@/redux/features/product/productTypes';

const productSchema = z.object({
    title: z.string().min(3, 'Title too short').max(120),
    price: z.number().positive('Must be positive'),
    description: z.string().optional(),
    category: z.string().optional(),
    image: z.string().url().optional(),
    stock: z.number().int().nonnegative().optional(),
});

type FormSchema = z.infer<typeof productSchema>;

export default function ProductForm({
    initial,
    onSubmit,
}: {
    initial?: Partial<Product>;
    onSubmit: (values: FormSchema) => Promise<void> | void;
}) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: initial?.title ?? '',
            price: initial?.price ?? 0,
            description: initial?.description ?? '',
            category: (initial?.category as string) ?? '',
            image: initial?.image ?? '',
            stock: initial?.stock ?? 0,
        },
    });

    // Static category options (can be replaced with API later)
    const [categories, setCategories] = useState<string[]>([
        'All',
        'Electronics',
        'Jewelery',
        'Men',
    ]);

    const [successMessage, setSuccessMessage] = useState('');

    const handleFormSubmit = async (values: FormSchema) => {
        await onSubmit(values);
        setSuccessMessage('✅ Product added successfully!');
        reset(); // clears the form
        setTimeout(() => setSuccessMessage(''), 3000); // remove after 3s
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-xl space-y-4">
            {successMessage && (
                <p className="text-green-600 font-medium">{successMessage}</p>
            )}

            <div>
                <label className="block">Title</label>
                <input {...register('title')} className="w-full p-2 border rounded" />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div>
                <label className="block">Price</label>
                <input type="number" step="0.01" {...register('price', { valueAsNumber: true })} className="w-full p-2 border rounded" />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>

            <div>
                <label className="block">Category</label>
                <select {...register('category')} className="w-full p-2 border rounded">
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block">Description</label>
                <textarea {...register('description')} className="w-full p-2 border rounded" />
            </div>

            <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
            </div>
        </form>
    );
}
