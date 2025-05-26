import React, {useState} from "react";
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
    const [board, setBoard] = useState(createEmptyBoard());
    const [currentPlayer, setCurrentPlayer] = useState("player1");





    const handleClick = (row, col) => {
        console.log(`Clicou na célula ${row},${col}`);
    };


    function colocaPeca(elemento, player){
        elemento.classList.add(player);
        trocaJogador(player)
    }

    function trocaJogador(currentPlayer) {
        if (currentPlayer === "player1") {
            setCurrentPlayer("player2");
        }else {
            setCurrentPlayer("player1");
        }
    }



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
                                onClick={(e) => {
                                    handleClick(cell.row, cell.col);
                                    colocaPeca(e.target, currentPlayer);
                                    trocaJogador(currentPlayer);
                                }}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}


    export default GameBoard;
