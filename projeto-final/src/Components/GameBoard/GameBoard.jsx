import React from "react";
import "./GameBoard.css";

const ROWS = 6;
const COLS = 7;






const createEmptyBoard = () => {
    const board = [];
    for (let row = 0; row < ROWS; row++) {
        const rowData = [];
        for (let col = 0; col < COLS; col++) {
            rowData.push({row,
                col,
                player: null,
                isSpecial: false,
            });
        }
        board.push(rowData);
    }
    return board;
};

function GameBoard(props) {
    const board = createEmptyBoard();

    const handleClick = (row, col) => {
        console.log(`Clicou na célula ${row},${col}`);
    };


    return (
        <div className="game-container">
            <div className="top-bar">
                <button className="mode-button" onClick={() => props.setGameMode(null)}>
                    Alterar modo de Jogo
                </button>
            </div>

            <div className="board">
                {board.map((row) =>
                    row.map((cell) => {
                        const id = `${cell.row}-${cell.col}`; // identificador único

                        return (
                            <div
                                key={id}
                                id={id}
                                className={`cell ${cell.isSpecial ? 'special' : ''}`}
                                onClick={() => handleClick(cell.row, cell.col)}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}


    export default GameBoard;
