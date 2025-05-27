import React, {useState} from "react";
import "./GameBoard.css";
import {winningPositions} from "../../Constants/Index"

const ROWS = 6;
const COLS = 7;








function GameBoard(props) {
    const [gameStarted, setGameStarted] = useState(false);

    const createEmptyBoard = () => {
        const board = [];

        // Gerar um conjunto de 5 posições únicas no formato "row-col"
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
        setGameStarted(true);
        return board;
    };









    const [board, setBoard] = useState(createEmptyBoard());
    const [currentPlayer, setCurrentPlayer] = useState("player1");
    const [pecasplayer1, setPecasplayer1] = useState([]);
    const [pecasplayer2, setPecasplayer2] = useState([]);

    let isSpecialCell = false;




    function processaJogada(row, col, elemento, currentPlayer){


        let colunaSelecionada = elemento.id.slice(2,3);
        console.log(colunaSelecionada);


        //copia o tabuleiro inicial
        const newBoard = board.map(row => row.map(cell => ({ ...cell })));
        //procura a posição mais abaixo vazia da coluna
        for (let row = 5; row >= 0; row--) {
            if (newBoard[row][colunaSelecionada].player === null) {
                const id = `${row}-${colunaSelecionada}`;
                newBoard[row][colunaSelecionada].player = currentPlayer;




                if (board[row][colunaSelecionada].isSpecial !== false) {
                    isSpecialCell = true;
                }



                // adiciona à lista de peças do jogador
                if (currentPlayer === "player1") {
                    const novasPecas = [...pecasplayer1, id];
                    setPecasplayer1(novasPecas);
                    checkVitory(novasPecas, currentPlayer);

                } else {
                    const novasPecas = [...pecasplayer2, id];
                    setPecasplayer2(novasPecas);
                    checkVitory(novasPecas, currentPlayer);
                }


                setBoard(newBoard);
                break;
            }
        }












        if (currentPlayer === "player1") {
            if (!isSpecialCell){
                setCurrentPlayer("player2");
            }
        }else {
            if (!isSpecialCell){
                setCurrentPlayer("player1");
            }
        }
    }






    function checkVitory(pecasDoJogador, currentPlayer) {
        for (const padrao of winningPositions) {
            const ganhou = padrao.every(pos => pecasDoJogador.includes(pos));
            if (ganhou) {
                alert(`${currentPlayer} venceu!`);
                setGameStarted(false);
                break;
            }
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
                                className={`cell ${cell.player ? cell.player : ''} ${cell.isSpecial ? 'special' : ''}`}
                                onClick={(e) => {
                                    processaJogada(cell.row, cell.col, e.target, currentPlayer);
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
