import React, { useState } from "react";
import GameBoard from "./Components/GameBoard/GameBoard";

const ROWS = 6;
const COLS = 7;

const createEmptyBoard = () => {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
};

const fixedSpecialCells = [
    { row: 1, col: 3 },
    { row: 2, col: 5 },
    { row: 3, col: 1 },
    { row: 4, col: 0 },
    { row: 0, col: 6 },
];

function App() {
    const [board, setBoard] = useState(createEmptyBoard());
    const [currentPlayer, setCurrentPlayer] = useState("R");

    const handleColumnClick = (col) => {
        for (let row = ROWS - 1; row >= 0; row--) {
            if (board[row][col] === null) {
                const newBoard = board.map((r) => [...r]);
                newBoard[row][col] = currentPlayer;
                setBoard(newBoard);
                setCurrentPlayer(currentPlayer === "R" ? "Y" : "R");
                break;
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4">4 em Linha</h1>
            <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg">
                <GameBoard
                    board={board}
                    specialCells={fixedSpecialCells}
                    onColumnClick={handleColumnClick}
                />
                <p className="text-lg font-medium mt-4">
                    Jogador atual:{" "}
                    <span className={currentPlayer === "R" ? "text-red-500" : "text-yellow-500"}>
            {currentPlayer === "R" ? "Vermelho" : "Amarelo"}
          </span>
                </p>
            </div>
        </div>
    );
}

export default App;
