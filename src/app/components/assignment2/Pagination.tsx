'use client';
import React from 'react';

interface PaginationProps {
    page: number;
    onPageChange: (page: number) => void;
    hasMore?: boolean;
}

export default function Pagination({ page, onPageChange, hasMore = true }: PaginationProps) {
    return (
        <div className="mt-6 flex justify-center gap-3">
            <button
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Prev
            </button>
            <div className="px-3 py-1 border rounded">Page {page}</div>
            <button
                disabled={!hasMore}
                onClick={() => onPageChange(page + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}
