'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const initialBoard = Array(9).fill('');

export default function GamePage() {
    const router = useRouter();

    const [board, setBoard] = useState(initialBoard);
    const [isXTurn, setIsXTurn] = useState(true);
    const [round, setRound] = useState(1);
    const [scores, setScores] = useState({ playerOne: 0, playerTwo: 0 });
    const [winner, setWinner] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const totalRounds = 5;
    const playerOne = 'Player One';
    const playerTwo = 'Player Two';

    const handleClick = (index: number) => {
        if (board[index] || winner) return;
        const newBoard = [...board];
        newBoard[index] = isXTurn ? 'X' : 'O';
        setBoard(newBoard);
        setIsXTurn(!isXTurn);
        checkWinner(newBoard);
    };

    const checkWinner = (board: string[]) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const line of lines) {
            const [a, b, c] = line;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                const winningPlayer = board[a] === 'X' ? 'playerOne' : 'playerTwo';
                setWinner(board[a] === 'X' ? playerOne : playerTwo);
                setScores((prev) => ({ ...prev, [winningPlayer]: prev[winningPlayer] + 1 }));
                return;
            }
        }

        if (board.every(cell => cell)) {
            setWinner('Draw');
        }
    };

    const resetBoard = () => {

        if (round >= totalRounds) {
            setShowPopup(true);
        } else {
            setBoard(initialBoard);
            setWinner('');
            setIsXTurn(true);
            setRound(prev => prev + 1);
        }
    };

    const finalWinner = () => {
        if (scores.playerOne > scores.playerTwo) return `${playerOne} wins the whole game! 🎉 Wanna play again?`;
        if (scores.playerTwo > scores.playerOne) return `${playerTwo} wins the whole game! 🎉 Wanna play again?`;
        return `It's a Draw overall! 🤝 Wanna play again?`;
    };



    const goToAssignment = () => {
        router.push('/assignment_1');
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 relative">
            <h2 className="text-cyan-400 text-xl mb-1">
                {playerOne} ({scores.playerOne}) vs {playerTwo} ({scores.playerTwo})
            </h2>
            <p className="text-pink-400 mb-4">🎯 Round {round} / {totalRounds}</p>
            <p className="mb-4 text-lg">
                Turn: <span className="text-green-300">{isXTurn ? playerOne : playerTwo}</span>
            </p>

            <div className="grid grid-cols-3 gap-4 mb-4">
                {board.map((cell, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleClick(idx)}
                        className="w-24 h-24 text-3xl rounded-xl border-2 border-cyan-400 hover:bg-cyan-700/10 transition duration-200"
                    >
                        {cell}
                    </button>
                ))}
            </div>

            {winner && (
                <p className="text-yellow-300 text-lg mb-2">
                    {winner === 'Draw' ? 'It\'s a Draw!' : `${winner} wins this round!`}
                </p>
            )}


            {winner && (
                <button
                    onClick={resetBoard}
                    className="mt-4 px-6 py-2 border-2 border-cyan-400 rounded-full hover:bg-cyan-600/20 transition"
                >
                    🔁 Reset Round
                </button>
            )}

            {/* Final Popup */}
            {showPopup && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
                    <div className="bg-white text-black p-8 rounded-2xl text-center max-w-sm">
                        <h2 className="text-2xl font-bold mb-4">🏆 Final Result</h2>
                        <p className="text-xl mb-6">{finalWinner()}</p>
                        <div className="flex justify-center gap-4">
                            <button

                                onClick={goToAssignment}
                                className="bg-cyan-500 text-white px-6 py-2 rounded-full hover:bg-cyan-600"
                            >
                                🔁 Play Again
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
