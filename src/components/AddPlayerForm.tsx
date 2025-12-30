import React, { useState } from 'react';

interface AddPlayerFormProps {
    onAddPlayer: (playerData: { name: string; image: string }) => void;
    usedAvatars: string[];
}

const avatarOptions = [
    '🎅', '🤶', '⛄', '🦌', '🎄', '🎁',
    '❄️', '⭐', '🔔', '🕯️', '🧝', '🧝‍♀️',
    '👨', '👩', '👦', '👧', '🧑', '👶',
    '🐶', '🐱', '🐻', '🦊', '🐼', '🐷'
];

const AddPlayerForm: React.FC<AddPlayerFormProps> = ({ onAddPlayer, usedAvatars }) => {
    const [playerName, setPlayerName] = useState('');
    const [playerImage, setPlayerImage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (playerName.trim() && playerImage.trim()) {
            onAddPlayer({ name: playerName, image: playerImage });
            setPlayerName('');
            setPlayerImage('');
        }
    };

    const selectAvatar = (avatar: string) => {
        if (!usedAvatars.includes(avatar)) {
            setPlayerImage(avatar);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-player-form-modal">
            <input
                type="text"
                placeholder="Navn på deltaker"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                required
                className="input-field"
                autoFocus
            />
            <div className="avatar-selection">
                <p className="avatar-label">Velg en figur:</p>
                <div className="avatar-grid">
                    {avatarOptions.map((avatar, index) => {
                        const isUsed = usedAvatars.includes(avatar);
                        return (
                            <button
                                key={index}
                                type="button"
                                className={`avatar-option ${playerImage === avatar ? 'selected' : ''} ${isUsed ? 'disabled' : ''}`}
                                onClick={() => selectAvatar(avatar)}
                                disabled={isUsed}
                            >
                                {avatar}
                            </button>
                        );
                    })}
                </div>
            </div>
            <button 
                type="submit" 
                className="submit-button"
                disabled={!playerName.trim() || !playerImage.trim()}
            >
                🎁 Legg til spiller
            </button>
        </form>
    );
};

export default AddPlayerForm;