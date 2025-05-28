import React, {useState} from "react";
import GameBoard from "./Components/GameBoard/GameBoard";
import "./App.css";



function App() {
    // Estado para o modo de jogo (1 vs 1 ou contra o computador)
    const [gameMode, setGameMode] = useState("vsCPU");
    const [gameStarted, setGameStarted] = useState(false);
    const [players, setPlayers] = useState([]);

    const startGame = (mode) => {
        setGameMode(mode);
    };

    function handleStartGame() {
        if (gameMode === "vsCPU") {
            setPlayers(prev => ({...prev, player2: "CPU"}));
        }
        setGameStarted(true);

    }


    return (
        <div className="app-container">
            <h1>4 em Linha</h1>

            {/* Tela de seleção de modo */}
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

            {/* Tela para inserir nomes */}
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

            {/* Tela do jogo */}
            {gameStarted && (
                <>
                    <div className="status-bar">
                        <div className="status-item">
                            Modo: {gameMode === "1vs1" ? "1 vs 1" : "1 vs CPU"}
                        </div>
                        <div className="status-item">
                            Jogadores: {players.player1}
                            {gameMode === "1vs1" ? ` vs ${players.player2}` : ` vs CPU`}
                        </div>
                    </div>

                    <div className="board-wrapper">

                        <GameBoard gameMode={gameMode} setGameMode={setGameMode} gameStarted={gameStarted} setGameStarted={setGameStarted}  players={players} />
                    </div>
                </>
            )}
        </div>
    );
}

    export default App;
