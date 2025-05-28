import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
/*

import React, { useState } from "react";
import "./GameBoard.css";
import { winningPositions } from "../../Constants/Index";

const ROWS = 6;
const COLS = 7;

function GameBoard(props) {
    const createEmptyBoard = () => {
        const board = [];
        const specialCells = new Set();

        while (specialCells.size < 5) {
            const row = Math.floor(Math.random() * ROWS);
            const col = Math.floor(Math.random() * COLS);
            specialCells.add(`${row}-${col}`);
        }

        for (let row = 0; row < ROWS; row++) {
            const rowData = [];
            for (let col = 0; col < COLS; col++) {
                const id = `${row}-${col}`;
                rowData.push({
                    id,
                    row,
                    col,
                    player: null,
                    isSpecial: specialCells.has(id),
                });
            }
            board.push(rowData);
        }

        return board;
    };

    const [board, setBoard] = useState(createEmptyBoard);
    const [currentPlayer, setCurrentPlayer] = useState("player1");
    const [pecasplayer1, setPecasplayer1] = useState([]);
    const [pecasplayer2, setPecasplayer2] = useState([]);

    function checkVitory(pecasDoJogador, currentPlayer) {
        for (const padrao of winningPositions) {
            const ganhou = padrao.every(pos => pecasDoJogador.includes(pos));
            if (ganhou) {
                alert(`${currentPlayer} venceu!`);
                props.setGameStarted(false);
                break;
            }
        }
    }

    function processaJogada(row, col, elemento, jogadorAtual) {
        const newBoard = board.map(row => row.map(cell => ({ ...cell })));
        let colunaSelecionada = elemento?.id?.split("-")[1];
        let proximoJogador = null;
        let isSpecialCell = false;

        if (jogadorAtual === "player2" && props.players.player2 === "CPU" && elemento === null) {
            const colRandom = Math.floor(Math.random() * COLS);

            for (let i = ROWS - 1; i >= 0; i--) {
                if (newBoard[i][colRandom].player === null) {
                    const id = `${i}-${colRandom}`;
                    newBoard[i][colRandom].player = jogadorAtual;

                    if (newBoard[i][colRandom].isSpecial) isSpecialCell = true;

                    const novasPecas = [...pecasplayer2, id];
                    setPecasplayer2(novasPecas);
                    setBoard(newBoard);
                    checkVitory(novasPecas, jogadorAtual);

                    proximoJogador = isSpecialCell ? "player2" : "player1";
                    setCurrentPlayer(proximoJogador);
                    break;
                }
            }
        } else if (colunaSelecionada !== undefined) {
            for (let r = ROWS - 1; r >= 0; r--) {
                if (newBoard[r][colunaSelecionada].player === null) {
                    const id = `${r}-${colunaSelecionada}`;
                    newBoard[r][colunaSelecionada].player = jogadorAtual;

                    if (newBoard[r][colunaSelecionada].isSpecial) isSpecialCell = true;

                    let novasPecas;
                    if (jogadorAtual === "player1") {
                        novasPecas = [...pecasplayer1, id];
                        setPecasplayer1(novasPecas);
                    } else {
                        novasPecas = [...pecasplayer2, id];
                        setPecasplayer2(novasPecas);
                    }

                    setBoard(newBoard);
                    checkVitory(novasPecas, jogadorAtual);

                    proximoJogador = isSpecialCell ? jogadorAtual : (jogadorAtual === "player1" ? "player2" : "player1");
                    setCurrentPlayer(proximoJogador);
                    break;
                }
            }
        }

        if (props.players.player2 === "CPU" && proximoJogador === "player2") {
            setTimeout(() => {
                processaJogada(null, null, null, "player2");
            }, 500);
        }
    }

    return (
        <div className="game-container">
            <div className="top-bar">
                <button className="mode-button" onClick={() => {
                    props.setGameMode(null);
                    props.setGameStarted(false);
                }}>
                    Alterar modo de Jogo
                </button>
            </div>

            <div className="board">
                {board.map(row =>
                    row.map(cell => {
                        const id = `${cell.row}-${cell.col}`;
                        return (
                            <div
                                key={id}
                                id={id}
                                className={`cell ${cell.player || ""} ${cell.isSpecial ? "special" : ""}`}
                                onClick={e => {
                                    if (props.gameStarted && currentPlayer === "player1") {
                                        processaJogada(cell.row, cell.col, e.target, currentPlayer);
                                    }
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

 */