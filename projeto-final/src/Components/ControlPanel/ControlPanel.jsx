import React, {useEffect, useState} from "react";
import "./ControlPanel.css";

function ControlPanel({gameMode, players, setPlayers, tempoRestante, setTempoRestante, currentPlayer, setCurrentPlayer, gameStarted, setGameMode, setGameStarted}) {
    const [showTimeoutModal, setShowTimeoutModal] = useState(false);

    // Definir cores
    const playerColors = {
        [players.player1]: "red",
        [players.player2]: "yellow",
        CPU: "yellow",
    };


    // Limite de tempo
    function handleCloseModal() {
        if (currentPlayer === "player1") {
            setCurrentPlayer("player2");
        } else if (currentPlayer === "player2") {
            setCurrentPlayer("player1");
        }
        setShowTimeoutModal(false);
    }

    useEffect(() => {
        if (!gameStarted || !currentPlayer) return;

        const isCPU = players[currentPlayer] === "CPU";
        if (isCPU) return;

        setTempoRestante(10);

        const intervalo = setInterval(() => {
            setTempoRestante((prev) => {
                if (prev === 1) {
                    clearInterval(intervalo);
                    setShowTimeoutModal(true);
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalo);
    }, [currentPlayer, gameStarted, players, setCurrentPlayer, setTempoRestante]);





    return (
        <div className="control-panel">
            <div className="top-bar">
                <button
                    className="mode-button"
                    onClick={() => {
                        setGameMode(null);
                        setGameStarted(false);
                    }}
                >
                    Alterar modo de Jogo
                </button>
                <div className={`timer ${tempoRestante <= 3 ? "warning" : ""}`}>
                    Tempo: {tempoRestante}s
                </div>
            </div>

            <div className="status-bar">
                <div className="status-item">
                    Modo: {gameMode === "1vs1" ? "1 vs 1" : "1 vs CPU"}
                </div>
                <div className="status-item">
                    Jogadores: {players.player1}
                    {gameMode === "1vs1" ? ` vs ${players.player2}` : ` vs CPU`}
                </div>
            </div>

            <div
                className="current-player-section"
                style={{display: "flex", alignItems: "center", gap: "10px", marginTop: "10px"}}
            >
                <div
                    className="current-player-dot"
                    style={{
                        backgroundColor: playerColors[players[currentPlayer]] || "yellow",
                    }}
                ></div>
                <span>Jogador atual: { currentPlayer != null ? players[currentPlayer] : "CPU"}</span>
            </div>

            {showTimeoutModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Tempo esgotado! Passa a vez.</h2>
                        <button onClick={handleCloseModal}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ControlPanel;
