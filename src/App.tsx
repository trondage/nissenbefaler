import React, { useState, useEffect } from 'react';
import Scoreboard from './components/Scoreboard';
import AddPlayerForm from './components/AddPlayerForm';
import './styles/main.css';

interface Player {
    id: number;
    name: string;
    score: number;
    image: string;
    isWinner?: boolean;
}

const App: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>(() => {
        const savedPlayers = localStorage.getItem('nissenBefalerPlayers');
        return savedPlayers ? JSON.parse(savedPlayers) : [];
    });
    const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        localStorage.setItem('nissenBefalerPlayers', JSON.stringify(players));
    }, [players]);

    const addPlayer = (playerData: { name: string; image: string }) => {
        const newPlayer: Player = { 
            id: Date.now(),
            name: playerData.name, 
            image: playerData.image, 
            score: 0 
        };
        setPlayers([...players, newPlayer]);
        setShowAddPlayerModal(false);
    };

    const updateScore = (id: number, points: number) => {
        setPlayers(players.map(player => 
            player.id === id 
                ? { ...player, score: player.score + points }
                : player
        ));
    };

    const deletePlayer = (id: number) => {
        setPlayers(players.filter(player => player.id !== id));
    };

    const setWinner = (id: number) => {
        setPlayers(players.map(player => 
            player.id === id
                ? { ...player, isWinner: !player.isWinner }
                : { ...player, isWinner: false }
        ));
    };

    const resetGame = () => {
        setPlayers([]);
        localStorage.removeItem('nissenBefalerPlayers');
        setShowResetModal(false);
    };

    const resetScores = () => {
        const resetPlayers = players.map(player => ({ ...player, score: 0, isWinner: false }));
        setPlayers(resetPlayers);
        setShowResetModal(false);
    };

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            const elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
                setIsFullscreen(true);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (showAddPlayerModal) {
                    setShowAddPlayerModal(false);
                }
                if (showResetModal) {
                    setShowResetModal(false);
                }
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [showAddPlayerModal, showResetModal]);

    return (
        <div className="app">
            <h1 className="main-title">🎅 Nissen Befaler - Poengtavle 🎄</h1>
            
            <Scoreboard 
                players={players} 
                onUpdateScore={updateScore} 
                onDeletePlayer={deletePlayer}
                onSetWinner={setWinner}
            />
            
            {isFullscreen ? (
                <div className="bottom-buttons">
                    <button 
                        className="action-button exit-fullscreen-btn"
                        onClick={toggleFullscreen}
                    >
                        ✖️ Lukk fullskjerm
                    </button>
                </div>
            ) : (
                <div className="bottom-buttons">
                    <button 
                        className="action-button add-player-btn"
                        onClick={() => setShowAddPlayerModal(true)}
                    >
                        ➕ Legg til deltaker
                    </button>
                    {players.length > 0 && (
                        <button 
                            className="action-button reset-btn"
                            onClick={() => setShowResetModal(true)}
                        >
                            🔄 Nullstill
                        </button>
                    )}
                    <button 
                        className="action-button fullscreen-btn"
                        onClick={toggleFullscreen}
                    >
                        🖥️ Fullskjerm
                    </button>
                </div>
            )}

            {showAddPlayerModal && (
                <div className="modal-overlay" onClick={() => setShowAddPlayerModal(false)}>
                    <div className="modal-content modal-add-player" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>⛄ Legg til Deltaker</h2>
                            <button 
                                className="close-modal-button"
                                onClick={() => setShowAddPlayerModal(false)}
                            >
                                ✖️
                            </button>
                        </div>
                        <AddPlayerForm onAddPlayer={addPlayer} usedAvatars={players.map(p => p.image)} />
                    </div>
                </div>
            )}
            
            {showResetModal && (
                <div className="modal-overlay" onClick={() => setShowResetModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>⚠️ Velg nullstilling</h2>
                        <p>Hva vil du nullstille?</p>
                        <div className="reset-options">
                            <div className="reset-option-card" onClick={resetScores}>
                                <div className="option-icon">🔄</div>
                                <h3>Nullstill poeng</h3>
                                <p>Beholder deltakerne, men setter alle poeng til 0</p>
                            </div>
                            <div className="reset-option-card danger" onClick={resetGame}>
                                <div className="option-icon">🗑️</div>
                                <h3>Nullstill alt</h3>
                                <p>Sletter alle deltakere og poeng permanent</p>
                            </div>
                        </div>
                        <button 
                            className="modal-button cancel-full"
                            onClick={() => setShowResetModal(false)}
                        >
                            ❌ Avbryt
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
