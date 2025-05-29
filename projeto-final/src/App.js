import React, { useState } from "react";
import GameBoard from "./Components/GameBoard/GameBoard";
import ControlPanel from "./Components/ControlPanel/ControlPanel";
import "./App.css";

function App() {
    const [gameMode, setGameMode] = useState("");
    const [gameStarted, setGameStarted] = useState(false);
    const [players, setPlayers] = useState({ player1: "", player2: "" });
    const [tempoRestante, setTempoRestante] = useState(10); // cria estado para passar ao ControlPanel

    const startGame = (mode) => {
        setGameMode(mode);
    };

    function handleStartGame() {
        if (gameMode === "vsCPU") {
            setPlayers(prev => ({ ...prev, player2: "CPU" }));
        }
        setGameStarted(true);
    }

    return (
        <div className="app-container">
            <h1>4 em Linha</h1>

            {!gameMode && (
                <div className="game-mode-selection">
                    <h2>Escolha o Modo de Jogo</h2>
                    <button onClick={() => setGameMode("1vs1")}>1 vs 1</button>
                    <button onClick={() => setGameMode("vsCPU")}>1 vs CPU</button>
                    <h3>Projeto desenvolvido por:</h3>
                    <ul>
                        <li>Micael Alexandre Dias dos Santos - 2024118797</li>
                        <li>Guilherme Cordeiro Rico - 2024142592</li>
                        <li>Ruben Miguel Badea Rebelo - 2024129092</li>
                    </ul>
                </div>
            )}

            {gameMode && !gameStarted && (
                <div className="game-mode-selection">
                    <h2>Insere os nomes</h2>
                    <input
                        type="text"
                        placeholder="Jogador 1"
                        value={players.player1}
                        onChange={(e) =>
                            setPlayers(prev => ({ ...prev, player1: e.target.value }))
                        }
                    />
                    {gameMode === "1vs1" && (
                        <input
                            type="text"
                            placeholder="Jogador 2"
                            value={players.player2}
                            onChange={(e) =>
                                setPlayers(prev => ({ ...prev, player2: e.target.value }))
                            }
                        />
                    )}
                    <button onClick={handleStartGame}>Começar Jogo</button>
                </div>
            )}

            {gameStarted && (
                <>
                    {/* Passa os estados que o ControlPanel precisa */}
                    <ControlPanel
                        gameMode={gameMode}
                        players={players}
                        tempoRestante={tempoRestante}
                        setGameMode={setGameMode}
                        setGameStarted={setGameStarted}
                    />

                    <div className="board-wrapper">
                        <GameBoard
                            gameMode={gameMode}
                            setGameMode={setGameMode}
                            gameStarted={gameStarted}
                            setGameStarted={setGameStarted}
                            players={players}
                            setTempoRestante={setTempoRestante}  // precisa passar essa prop para atualizar o tempo
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
