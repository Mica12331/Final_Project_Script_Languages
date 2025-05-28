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
    const [currentPlayer, setCurrentPlayer] = useState("player1");
    const [pecasplayer1, setPecasplayer1] = useState([]);
    const [pecasplayer2, setPecasplayer2] = useState([]);

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

        // Jogada do jogador humano
        if (colunaSelecionada !== undefined && jogadorAtual === "player1") {
            for (let r = ROWS - 1; r >= 0; r--) {
                if (newBoard[r][colunaSelecionada].player === null) {
                    const id = `${r}-${colunaSelecionada}`;
                    newBoard[r][colunaSelecionada].player = jogadorAtual;

                    if (newBoard[r][colunaSelecionada].isSpecial) isSpecialCell = true;

                    const novasPecas = [...pecasplayer1, id];
                    setPecasplayer1(novasPecas);
                    setBoard(newBoard);

                    if (!checkVitory(novasPecas, jogadorAtual)) {
                        if (!isSpecialCell) {
                            setCurrentPlayer("player2");
                        }
                        // Se for célula especial, currentPlayer permanece "player1"
                    } else {
                        // Jogo acabou
                        setCurrentPlayer(null);
                    }

                    break;
                }
            }
        }
    }

    // Função para jogada da CPU, com jogadas extras ao acertar célula especial
    function jogarCPU() {
        if (!props.gameStarted) return;

        let col;
        // Escolhe coluna aleatória que não esteja cheia
        do {
            col = Math.floor(Math.random() * COLS);
        } while (board[0][col].player !== null);

        const newBoard = board.map(row => row.map(cell => ({ ...cell })));
        let isSpecialCell = false;
        let id = null;

        for (let r = ROWS - 1; r >= 0; r--) {
            if (newBoard[r][col].player === null) {
                id = `${r}-${col}`;
                // Aqui NÃO atualizamos o board ainda
                isSpecialCell = newBoard[r][col].isSpecial;
                break;
            }
        }

        if (!id) {
            setCurrentPlayer("player1");
            return;
        }

        // Só atualiza o estado após o timeout
        setTimeout(() => {
            newBoard[id.split("-")[0]][id.split("-")[1]].player = "player2";

            const novasPecas = [...pecasplayer2, id];
            setPecasplayer2(novasPecas);
            setBoard(newBoard);

            if (!checkVitory(novasPecas, "player2")) {
                if (isSpecialCell) {
                    setTimeout(() => {
                        jogarCPU();
                    }, 500);
                } else {
                    setCurrentPlayer("player1");
                }
            } else {
                setCurrentPlayer(null);
            }
        }, 500);
    }


    // useEffect para ativar jogada da CPU quando for sua vez
    useEffect(() => {
        if (props.players.player2 === "CPU" && currentPlayer === "player2" && props.gameStarted) {
            const timer = setTimeout(() => {
                jogarCPU();
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [currentPlayer, board, props.gameStarted]);

    return (
        <div className="game-container">
            <div className="top-bar">
                <button
                    className="mode-button"
                    onClick={() => {
                        props.setGameMode(null);
                        props.setGameStarted(false);
                    }}
                >
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
