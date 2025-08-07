import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Player {
    name: string
    score: number
}

interface GameState {
    players: Player[]
    currentTurn: number
    board: string[]
    round: number
    history: string[]
    winner: string | null
    leaderboard: Player[]
}

const initialState: GameState = {
    players: [],
    currentTurn: 0,
    board: Array(9).fill(''),
    round: 1,
    history: [],
    winner: null,
    leaderboard: []
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setPlayers(state, action: PayloadAction<Player[]>) {
            state.players = action.payload
        },
        updateBoard(state, action: PayloadAction<{ index: number, symbol: string }>) {
            state.board[action.payload.index] = action.payload.symbol
        },
        nextTurn(state) {
            state.currentTurn = state.currentTurn === 0 ? 1 : 0
        },
        resetBoard(state) {
            state.board = Array(9).fill('')
            state.winner = null
        },
        setWinner(state, action: PayloadAction<string | null>) {
            state.winner = action.payload
        },
        updateScores(state, action: PayloadAction<{ winner: string | null }>) {
            if (action.payload.winner) {
                const index = state.players.findIndex(p => p.name === action.payload.winner)
                state.players[index].score += 2
                const loserIndex = index === 0 ? 1 : 0
                state.players[loserIndex].score += 1
            }
        },
        nextRound(state) {
            state.round += 1
        },
        resetGame(state) {
            state.board = Array(9).fill('')
            state.round = 1
            state.players.forEach(p => p.score = 0)
            state.winner = null
        }
    }
})

export const {
    setPlayers, updateBoard, nextTurn, resetBoard, setWinner, updateScores, nextRound, resetGame
} = gameSlice.actions

export default gameSlice.reducer
