import React from "react";
import "./GameBoard.css";

const ROWS = 6;
const COLS = 7;

const Cell = ({ value, isSpecial }) => {
    let cellClass = "cell";
    if (value === "R") cellClass += " red";
    if (value === "Y") cellClass += " yellow";
    if (isSpecial) cellClass += " special";

    return <div className={cellClass}></div>;
};

const GameBoard = ({ board, specialCells, onColumnClick }) => {
    return (
        <div className="board">
            {[...Array(COLS)].map((_, colIndex) => (
                <div
                    key={colIndex}
                    className="column"
                    onClick={() => onColumnClick(colIndex)}
                >
                    {[...Array(ROWS)].map((_, rowIndex) => {
                        const value = board[rowIndex][colIndex];
                        const isSpecial = specialCells.some(
                            (cell) => cell.row === rowIndex && cell.col === colIndex
                        );
                        return <Cell key={rowIndex} value={value} isSpecial={isSpecial} />;
                    })}
                </div>
            ))}
        </div>
    );
};

export default GameBoard;
