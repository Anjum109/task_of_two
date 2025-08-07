'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const linkClasses = (path: string) =>
        `px-4 py-2 rounded-md transition ${pathname === path
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white'
        }`;

    return (
        <nav className="bg-white shadow p-4 flex justify-between items-center mb-6 rounded-md">
            <h1 className="text-xl font-bold text-gray-800">🧠 iFarmer Assignment</h1>
            <div className="space-x-3">
                <Link href="/assignment_1" className={linkClasses('/assignment_1')}>
                    Assignment-1
                </Link>
                <Link href="/assignment-2" className={linkClasses('/assignment_2')}>
                    Assignment-2
                </Link>
            </div>
        </nav>
    );
}
