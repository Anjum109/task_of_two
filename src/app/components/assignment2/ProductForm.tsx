'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const productSchema = z.object({
    title: z.string().min(3, 'Title too short').max(120),
    price: z.number({ error: 'Price is required' }).positive('Must be positive'),
    description: z.string().min(1, 'Description is required'),
    categoryId: z.number({ error: 'Category is required' }).int().positive(),
    image: z.string().url('Image must be a valid URL'),
});

export type FormSchema = z.infer<typeof productSchema>;

export default function ProductForm({
    initial,
    onSubmit,
}: {
    initial?: Partial<FormSchema>;
    onSubmit: (values: FormSchema) => Promise<void> | void;
}) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: initial ?? {
            title: '',
            price: 0,
            description: '',
            categoryId: 0,
            image: '',
        },
    });

    const [successMessage, setSuccessMessage] = useState('');

    const handleFormSubmit = async (values: FormSchema) => {
        await onSubmit(values);
        setSuccessMessage('✅ Product added successfully!');
        reset();
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-xl space-y-4">
            {successMessage && <p className="text-green-600 font-medium">{successMessage}</p>}

            <div>
                <label className="block">Title</label>
                <input {...register('title')} className="w-full p-2 border rounded" />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div>
                <label className="block">Price</label>
                <input
                    type="number"
                    step="0.01"
                    {...register('price', { valueAsNumber: true })}
                    className="w-full p-2 border rounded"
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>

            <div>
                <label className="block">Category ID</label>
                <input
                    type="number"
                    {...register('categoryId', { valueAsNumber: true })}
                    className="w-full p-2 border rounded"
                    placeholder="Enter category ID (e.g., 1, 2, 3)"
                />
                {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>}
            </div>

            <div>
                <label className="block">Description</label>
                <textarea {...register('description')} className="w-full p-2 border rounded" />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            <div>
                <label className="block">Image URL</label>
                <input {...register('image')} className="w-full p-2 border rounded" placeholder="https://example.com/image.jpg" />
                {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
            </div>

            <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
            </div>
        </form>
    );
}
