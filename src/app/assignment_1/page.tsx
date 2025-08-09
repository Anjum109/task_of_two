'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoGameController } from "react-icons/io5";



export default function PlayerSetupPage() {
    const router = useRouter();
    const [playerOne, setPlayerOne] = useState('');
    const [playerTwo, setPlayerTwo] = useState('');

    const handleStartGame = () => {
        router.push('/assignment_1/game');
    };

    const isDisabled = playerOne.trim() === '' || playerTwo.trim() === '';

    return (
        <div className="min-h-screen relative bg-[#0f0f1b] overflow-hidden">

            <div className="absolute inset-0 animate-bg-move bg-[radial-gradient(circle_at_1px_1px,_#1f2937_1px,_transparent_0)] [background-size:20px_20px] opacity-20 z-0" />

            {/* Moving Ball */}
            <div className="absolute w-2 h-2 bg-cyan-100 rounded-full shadow-[0_0_20px_5px_rgba(34,211,238,0.6)] animate-ball z-0" />
            <div className="absolute w-2 h-2 bg-cyan-200 rounded-full shadow-[0_0_20px_5px_rgba(34,211,238,0.6)] animate-ball_one z-0" />
            <div className="absolute w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_20px_5px_rgba(34,211,238,0.6)] animate-ball_two z-0" />
            <div className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_20px_5px_rgba(34,211,238,0.6)] animate-ball_three z-0" />
            <div className="absolute w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_20px_5px_rgba(34,211,238,0.6)] animate-ball_four z-0" />
            <div className="absolute w-2 h-2 bg-cyan-600 rounded-full shadow-[0_0_20px_5px_rgba(34,211,238,0.6)] animate-ball_five z-0" />


            {/* Content */}
            <div className="relative z-10 flex items-center justify-center mt-12">
                <div className="text-center text-white">
                    <div className="flex justify-center mb-6">
                        <div className="bg-[#0f0f1b] border border-cyan-400 rounded-full p-4">
                            <IoGameController size={40} />
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
        </div>
    );
}
