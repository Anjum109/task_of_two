'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PlayerSetupPage() {
    const router = useRouter();
    const [playerOne, setPlayerOne] = useState('');
    const [playerTwo, setPlayerTwo] = useState('');

    const handleStartGame = () => {
        // You can save names in Redux later
        router.push('/assignment_1/game');
    };

    const isDisabled = playerOne.trim() === '' || playerTwo.trim() === '';

    return (
        <div className="min-h-screen bg-[#0f0f1b] flex items-center justify-center">
            <div className="text-center text-white">
                <div className="flex justify-center mb-6">
                    <div className="bg-[#0f0f1b] border border-cyan-400 rounded-full p-4">
                        <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M6 12h12M12 6v12" />
                        </svg>
                    </div>
                </div>
                <h1 className="text-2xl font-bold mb-10 text-slate-300">LET THE BATTLE BEGIN!</h1>

                <div className="mb-6 text-left">
                    <label className="text-cyan-400 block mb-1">Player One</label>
                    <input
                        type="text"
                        placeholder="Name required"
                        value={playerOne}
                        onChange={(e) => setPlayerOne(e.target.value)}
                        className="w-72 px-4 py-2 bg-transparent border border-cyan-400 text-white rounded-md focus:outline-none"
                    />
                </div>

                <div className="mb-8 text-left">
                    <label className="text-pink-400 block mb-1">Player Two</label>
                    <input
                        type="text"
                        placeholder="Name required"
                        value={playerTwo}
                        onChange={(e) => setPlayerTwo(e.target.value)}
                        className="w-72 px-4 py-2 bg-transparent border border-pink-400 text-white rounded-md focus:outline-none"
                    />
                </div>

                <button
                    onClick={handleStartGame}
                    disabled={isDisabled}
                    className={`px-10 py-3 rounded-full font-semibold transition ${isDisabled
                        ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                        : 'border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-[#0f0f1b]'
                        }`}
                >
                    START GAME
                </button>
            </div>
        </div>
    );
}
