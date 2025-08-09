
'use client';
import React from 'react';

interface CategorySidebarProps {
    categories: string[];
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
}

export default function CategorySidebar({ categories, selectedCategory, onSelectCategory }: CategorySidebarProps) {
    return (
        <aside className="w-64 sticky top-20 h-fit p-3 border rounded">
            <h4 className="font-semibold mb-2">Categories</h4>
            <ul className="flex flex-col gap-2">
                {/* "All" category */}
                <li>
                    <button
                        className={`text-left ${selectedCategory === null ? 'font-bold' : ''}`}
                        onClick={() => onSelectCategory(null)}
                    >
                        All
                    </button>
                </li>

                {/* Render all other categories dynamically */}
                {categories.map((cat) => (
                    <li key={cat}>
                        <button
                            className={`text-left ${selectedCategory === cat ? 'font-bold' : ''}`}
                            onClick={() => onSelectCategory(cat)}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
