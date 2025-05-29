import React from "react";
import "./ControlPanel.css";

function ControlPanel({ gameMode, players, tempoRestante, setGameMode, setGameStarted }) {
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
        </div>
    );
}

export default ControlPanel;
