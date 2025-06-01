import React, { useState, useEffect } from "react";
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
    const [pecasplayer1, setPecasplayer1] = useState([]);
    const [pecasplayer2, setPecasplayer2] = useState([]);
    const [hoverCol, setHoverCol] = useState(null);
    const [vencedor, setVencedor] = useState(null);

    function checkVitory(pecasDoJogador, jogadorAtual) {
        for (const padrao of winningPositions) {
            const ganhou = padrao.every(pos => pecasDoJogador.includes(pos));
            if (ganhou) {
                setVencedor(jogadorAtual);
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
                            if (!isSpecialCell) props.setCurrentPlayer("player2");
                        } else {
                            props.setCurrentPlayer(null);
                        }
                    } else if (jogadorAtual === "player2") {
                        const novasPecas = [...pecasplayer2, id];
                        setPecasplayer2(novasPecas);

                        setBoard(newBoard);

                        if (!checkVitory(novasPecas, jogadorAtual)) {
                            if (!isSpecialCell) props.setCurrentPlayer("player1");
                        } else {
                            props.setCurrentPlayer(null);
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
            props.setCurrentPlayer("player1");
            return;
        }

        props.setCurrentPlayer(null); // bloqueia repetição

        setTimeout(() => {
            newBoard[id.split("-")[0]][id.split("-")[1]].player = "player2";

            const novasPecas = [...pecasplayer2, id];
            setPecasplayer2(novasPecas);
            setBoard(newBoard);

            if (!checkVitory(novasPecas, "player2")) {
                if (isSpecialCell) {
                    setTimeout(() => {
                        props.setCurrentPlayer("player2");
                    }, 300);
                } else {
                    props.setCurrentPlayer("player1");
                }
            } else {
                props.setCurrentPlayer(null);
            }
        }, 500);
    }

    useEffect(() => {
        if (props.players.player2 === "CPU" && props.currentPlayer === "player2" && props.gameStarted) {
            const timer = setTimeout(() => {
                jogarCPU();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [props.currentPlayer, board, props.gameStarted]);



    return (
        <div className="game-container">
            <div
                className="arrow-row"
                onMouseLeave={() => setHoverCol(null)}
            >
                {[...Array(COLS)].map((_, c) => (
                    <div
                        key={`arrow-${c}`}
                        className={`arrow-cell ${hoverCol === c ? props.currentPlayer : ""}`}
                    >
                        {hoverCol === c ? "▼" : ""}
                    </div>

                ))}
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
                                onMouseEnter={() => setHoverCol(cell.col)}  /* aparecer a seta em cima */
                                onClick={e => {
                                    if (!props.gameStarted) return;

                                    // modo 1vsCPU
                                    if (props.players.player2 === "CPU") {
                                        if (props.currentPlayer === "player1") {
                                            processaJogada(cell.row, cell.col, e.target, props.currentPlayer);
                                        }
                                    } else {
                                        // modo 1vs1
                                        if (props.currentPlayer === "player1" || props.currentPlayer === "player2") {
                                            processaJogada(cell.row, cell.col, e.target, props.currentPlayer);
                                        }
                                    }
                                }}
                            />
                        );
                    })
                )}
            </div>
            {vencedor && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{props.players[vencedor]} venceu!</h2>
                        <button
                            onClick={() => {
                                setVencedor(null);
                                props.setGameStarted(false);
                            }}
                        >
                            Fechar
                        </button>
                        <button
                            onClick={() => {
                                setBoard(createEmptyBoard());
                                setPecasplayer1([]);
                                setPecasplayer2([]);
                                setVencedor(null);
                                props.setCurrentPlayer(null);
                                props.setGameStarted(false);
                                props.setGameMode(null);
                                props.setPlayers({ player1: "", player2: "" });
                            }}
                        >
                            Jogar novamente
                        </button>
                    </div>
                </div>
            )}


        </div>
    );
}

export default GameBoard;
