import React, { useState, useEffect } from "react";
import "./GameBoard.css";
import { winningPositions } from "../../Constants/Index";
import ControlPanel from "../ControlPanel/ControlPanel"; // import do novo componente

const ROWS = 6;
const COLS = 7;
const TEMPO_LIMITE = 10;

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
    const [tempoRestante, setTempoRestante] = useState(TEMPO_LIMITE);

    function checkVitory(pecasDoJogador, jogadorAtual) {
        for (const padrao of winningPositions) {
            const ganhou = padrao.every(pos => pecasDoJogador.includes(pos));
            if (ganhou) {
                alert(`${jogadorAtual} venceu!`);
                props.setGameStarted(false);
                return true;
            }
        }
        return false;
    }

    function processaJogada(row, col, elemento, jogadorAtual) {
        const newBoard = board.map(row => row.map(cell => ({ ...cell })));
        let colunaSelecionada = elemento?.id?.split("-")[1];
        let isSpecialCell = false;

        if (colunaSelecionada !== undefined) {
            for (let r = ROWS - 1; r >= 0; r--) {
                if (newBoard[r][colunaSelecionada].player === null) {
                    const id = `${r}-${colunaSelecionada}`;
                    newBoard[r][colunaSelecionada].player = jogadorAtual;

                    if (newBoard[r][colunaSelecionada].isSpecial) isSpecialCell = true;

                    if (jogadorAtual === "player1") {
                        const novasPecas = [...pecasplayer1, id];
                        setPecasplayer1(novasPecas);

                        setBoard(newBoard);

                        if (!checkVitory(novasPecas, jogadorAtual)) {
                            if (!isSpecialCell) setCurrentPlayer("player2");
                        } else {
                            setCurrentPlayer(null);
                        }
                    } else if (jogadorAtual === "player2") {
                        const novasPecas = [...pecasplayer2, id];
                        setPecasplayer2(novasPecas);

                        setBoard(newBoard);

                        if (!checkVitory(novasPecas, jogadorAtual)) {
                            if (!isSpecialCell) setCurrentPlayer("player1");
                        } else {
                            setCurrentPlayer(null);
                        }
                    }

                    break;
                }
            }
        }
    }

    function jogarCPU() {
        if (!props.gameStarted) return;

        let col;
        do {
            col = Math.floor(Math.random() * COLS);
        } while (board[0][col].player !== null);

        const newBoard = board.map(row => row.map(cell => ({ ...cell })));
        let isSpecialCell = false;
        let id = null;

        for (let r = ROWS - 1; r >= 0; r--) {
            if (newBoard[r][col].player === null) {
                id = `${r}-${col}`;
                isSpecialCell = newBoard[r][col].isSpecial;
                break;
            }
        }

        if (!id) {
            setCurrentPlayer("player1");
            return;
        }

        setCurrentPlayer(null); // bloqueia repetição

        setTimeout(() => {
            newBoard[id.split("-")[0]][id.split("-")[1]].player = "player2";

            const novasPecas = [...pecasplayer2, id];
            setPecasplayer2(novasPecas);
            setBoard(newBoard);

            if (!checkVitory(novasPecas, "player2")) {
                if (isSpecialCell) {
                    setTimeout(() => {
                        setCurrentPlayer("player2");
                    }, 300);
                } else {
                    setCurrentPlayer("player1");
                }
            } else {
                setCurrentPlayer(null);
            }
        }, 500);
    }

    useEffect(() => {
        if (props.players.player2 === "CPU" && currentPlayer === "player2" && props.gameStarted) {
            const timer = setTimeout(() => {
                jogarCPU();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [currentPlayer, board, props.gameStarted]);

    useEffect(() => {
        if (!props.gameStarted || !currentPlayer) return;

        // Se o jogador atual for CPU, não liga o temporizador (já é automático)
        const isCPU = props.players[currentPlayer] === "CPU";
        if (isCPU) return;

        setTempoRestante(TEMPO_LIMITE);

        const intervalo = setInterval(() => {
            setTempoRestante(prev => {
                if (prev === 1) {
                    clearInterval(intervalo);
                    alert("Tempo esgotado! Passa a vez.");
                    if (currentPlayer === "player1") {
                        setCurrentPlayer("player2");
                    } else if (currentPlayer === "player2") {
                        setCurrentPlayer("player1");
                    }
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalo);
    }, [currentPlayer, props.gameStarted, props.players]);

    return (
        <div className="game-container">
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
                                    if (!props.gameStarted) return;

                                    // Se modo 1vsCPU, só player1 pode jogar clicando
                                    if (props.players.player2 === "CPU") {
                                        if (currentPlayer === "player1") {
                                            processaJogada(cell.row, cell.col, e.target, currentPlayer);
                                        }
                                    } else {
                                        // Modo 1vs1: ambos podem jogar
                                        if (currentPlayer === "player1" || currentPlayer === "player2") {
                                            processaJogada(cell.row, cell.col, e.target, currentPlayer);
                                        }
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
