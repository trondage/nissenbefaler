import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface Player {
    id: number;
    name: string;
    score: number;
    image: string;
    isWinner?: boolean;
}

interface PlayerCardProps {
    player: Player;
    rank: number;
    highestScore: number;
    onUpdateScore: (id: number, points: number) => void;
    onDeletePlayer: (id: number) => void;
    onSetWinner: (id: number) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, rank, highestScore, onUpdateScore, onDeletePlayer, onSetWinner }) => {
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const contextMenuRef = useRef<HTMLDivElement>(null);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        
        // Bruk clientX/clientY for posisjonering i forhold til viewport
        const menuWidth = 180;
        const menuHeight = 100;
        let x = e.clientX;
        let y = e.clientY;
        
        // Juster hvis menyen går utenfor høyre kant
        if (x + menuWidth > window.innerWidth) {
            x = window.innerWidth - menuWidth - 10;
        }
        
        // Juster hvis menyen går utenfor bunnen
        if (y + menuHeight > window.innerHeight) {
            y = window.innerHeight - menuHeight - 10;
        }
        
        setContextMenuPosition({ x, y });
        setShowContextMenu(true);
    };

    const isTopScorer = player.score === highestScore && highestScore > 0;

    const handleCloseContextMenu = () => {
        setShowContextMenu(false);
    };

    const handleDelete = () => {
        onDeletePlayer(player.id);
        setShowContextMenu(false);
    };

    const handleSetWinner = () => {
        onSetWinner(player.id);
        setShowContextMenu(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (contextMenuRef.current && event.target instanceof Node && !contextMenuRef.current.contains(event.target)) {
                setShowContextMenu(false);
            }
        };

        if (showContextMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showContextMenu]);

    const getRankEmoji = (rank: number) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return '🎄';
    };

    return (
        <>
            <div 
                className={`player-card ${rank === 1 ? 'winner' : ''} ${player.isWinner ? 'marked-winner' : ''}`}
                onContextMenu={handleContextMenu}
            >
                {player.isWinner && <div className="winner-badge">👑 VINNER</div>}
                <div className="rank-badge">{getRankEmoji(rank)}</div>
                <div className="player-info">
                    <div className="player-avatar-emoji">{player.image}</div>
                    <div className="player-details">
                        <h3 className="player-name">{player.name}</h3>
                        <p className="player-score">{player.score} poeng</p>
                    </div>
                </div>
                <div className="score-buttons">
                    <button onClick={() => onUpdateScore(player.id, 1)} className="score-btn small">+1</button>
                    <button onClick={() => onUpdateScore(player.id, 2)} className="score-btn small">+2</button>
                    <button onClick={() => onUpdateScore(player.id, 3)} className="score-btn medium">+3</button>
                    <button onClick={() => onUpdateScore(player.id, 4)} className="score-btn medium">+4</button>
                    <button onClick={() => onUpdateScore(player.id, 5)} className="score-btn large">+5</button>
                    <button onClick={() => onUpdateScore(player.id, -1)} className="score-btn minus">-1</button>
                </div>
            </div>

            {showContextMenu && ReactDOM.createPortal(
                <div 
                    ref={contextMenuRef}
                    className="context-menu"
                    style={{
                        position: 'fixed',
                        top: `${contextMenuPosition.y}px`,
                        left: `${contextMenuPosition.x}px`,
                        zIndex: 10000
                    }}
                >
                    {(isTopScorer || player.isWinner) && (
                        <div className="context-menu-item" onClick={handleSetWinner}>
                            {player.isWinner ? '🚫 Fjern vinner' : '👑 Vinner'}
                        </div>
                    )}
                    <div className="context-menu-item delete" onClick={handleDelete}>
                        🗑️ Slett deltaker
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default PlayerCard;