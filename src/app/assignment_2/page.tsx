'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    useDeleteProductMutation,
    useGetProductsQuery,
} from '@/redux/store/api/productsApi';
import ProductCard from '../components/assignment2/ProductCard';
import Pagination from '../components/assignment2/Pagination';
import CategorySidebar from '../components/assignment2/CategorySidebar';
import ConfirmModal from '../components/assignment2/ConfirmModel';



export default function Assignment2ListPage() {
    const [page, setPage] = useState(1);
    const limit = 8;
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState<string | null>(null);

    const { data, isLoading, error, refetch } = useGetProductsQuery({
        page,
        limit,
    });

    // Filter products by query and category client side
    const products = data ?? [];

    // Filter logic (search + category)
    const filteredProducts = products.filter((p) => {
        const matchesCategory =
            !category ||
            category === 'all' ||
            (typeof p.category === 'string'
                ? p.category.toLowerCase() === category.toLowerCase()
                : (p.category?.name || '').toLowerCase() === category.toLowerCase());

        const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());

        return matchesCategory && matchesQuery;
    });

    const [deleteProduct] = useDeleteProductMutation();

    // Delete modal state
    const [confirmOpen, setConfirmOpen] = React.useState(false);
    const [toDeleteId, setToDeleteId] = React.useState<string | number | null>(null);

    const openDeleteModal = (id: string | number) => {
        setToDeleteId(id);
        setConfirmOpen(true);
    };

    const onDeleteConfirm = async () => {
        if (!toDeleteId) return;
        try {
            await deleteProduct(Number(toDeleteId)).unwrap();
            alert('Deleted');
            setConfirmOpen(false);
            setToDeleteId(null);
            refetch();
        } catch (e) {
            alert('Delete failed');
        }
    };

    return (
        <div className="p-6 bg-black text-blue-200">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Products</h2>
                <Link
                    href="/assignment_2/create"
                    className="px-3 py-2 bg-blue-600 text-white rounded"
                >
                    + Add product
                </Link>
            </div>

            <div className="flex gap-4">
                <div className="flex-1">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name..."
                        className="w-full p-2 border rounded mb-4"
                    />

                    {isLoading && <div>Loading...</div>}
                    {error && <div>Error loading products</div>}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredProducts.map((p) => (
                            <ProductCard key={p.id} product={p} onDelete={openDeleteModal} />
                        ))}
                    </div>

                    <Pagination
                        page={page}
                        onPageChange={setPage}
                        hasMore={products.length === limit}
                    />
                </div>

                <CategorySidebar
                    categories={['electronics', 'jewelery', 'men clothing']}
                    selectedCategory={category}
                    onSelectCategory={(cat) => {
                        setCategory(cat === 'all' ? null : cat);
                    }}
                />
            </div>

            <ConfirmModal
                isOpen={confirmOpen}
                title="Confirm Delete"
                message="Delete this product? This action cannot be undone."
                onConfirm={onDeleteConfirm}
                onCancel={() => setConfirmOpen(false)}
            />
        </div>
    );
}
