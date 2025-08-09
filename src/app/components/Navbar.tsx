'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const linkClasses = (path: string) =>
        `px-4 py-2 rounded-md transition ${pathname === path
            ? 'bg-blue-600 text-white'
            : 'bg-gray-700 text-blue-100 border-2 hover:bg-blue-500 hover:text-white'
        }`;

    return (
        <nav className="bg-[#04070c] shadow p-4 flex justify-between items-center border-b-2 border-blue-500 py-5 px-5 lg:px-20">
            <h1 className="text-xl font-bold text-blue-200">🧠 iFarmer Assignment</h1>
            <div className="flex flex-col lg:flex-row  gap-5">
                <div>
                    <Link href="/assignment_1" className={linkClasses('/assignment_1')}>
                        Assignment-1
                    </Link>
                </div>
                <div>
                    <Link href="/assignment_2" className={linkClasses('/assignment_2')}>
                        Assignment-2
                    </Link>
                </div>
            </div>
        </nav>
    );
}
