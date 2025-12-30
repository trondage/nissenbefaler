import React, { useState, useEffect, useRef } from 'react';
import PlayerCard from './PlayerCard';

interface Player {
    id: number;
    name: string;
    score: number;
    image: string;
    isWinner?: boolean;
}

interface ScoreboardProps {
    players: Player[];
    onUpdateScore: (id: number, points: number) => void;
    onDeletePlayer: (id: number) => void;
    onSetWinner: (id: number) => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ players, onUpdateScore, onDeletePlayer, onSetWinner }) => {
    const [positions, setPositions] = useState<{ [key: number]: number }>({});
    const prevPlayersRef = useRef<Player[]>([]);
    const cardHeight = 145; // Omtrentlig høyde av hver card + gap

    useEffect(() => {
        const sortedPlayers = [...players].sort((a, b) => {
            // Først sorter etter om spilleren er markert som vinner
            if (a.isWinner && !b.isWinner) return -1;
            if (!a.isWinner && b.isWinner) return 1;
            // Deretter sorter etter score
            return b.score - a.score;
        });
        
        // Beregn nye posisjoner
        const newPositions: { [key: number]: number } = {};
        sortedPlayers.forEach((player, index) => {
            newPositions[player.id] = index;
        });

        // Hvis dette ikke er første render, animer endringene
        if (prevPlayersRef.current.length > 0) {
            setPositions(newPositions);
        } else {
            // Første render, ingen animasjon
            setPositions(newPositions);
        }

        prevPlayersRef.current = sortedPlayers;
    }, [players]);

    const allPlayers = [...players];
    const containerHeight = players.length * cardHeight;
    const highestScore = players.length > 0 ? Math.max(...players.map(p => p.score)) : 0;

    return (
        <div className="scoreboard">
            {players.length === 0 ? (
                <p className="empty-message">Ingen deltakere enda. Legg til noen spillere! 🎅</p>
            ) : (
                <div className="player-cards-animated" style={{ height: `${containerHeight}px` }}>
                    {allPlayers.map((player) => {
                        const position = positions[player.id] ?? 0;
                        const sortedPlayers = [...players].sort((a, b) => {
                            if (a.isWinner && !b.isWinner) return -1;
                            if (!a.isWinner && b.isWinner) return 1;
                            return b.score - a.score;
                        });
                        const rank = sortedPlayers.findIndex(p => p.id === player.id) + 1;
                        
                        return (
                            <div
                                key={player.id}
                                className="player-card-animated"
                                style={{
                                    transform: `translateY(${position * cardHeight}px)`,
                                }}
                            >
                                <PlayerCard 
                                    player={player}
                                    rank={rank}
                                    highestScore={highestScore}
                                    onUpdateScore={onUpdateScore}
                                    onDeletePlayer={onDeletePlayer}
                                    onSetWinner={onSetWinner}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Scoreboard;