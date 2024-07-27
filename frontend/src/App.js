import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DiceComponent from './Dice';
import Chip from './Chip';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function App() {
    const [dice, setDice] = useState([1, 1, 1, 1, 1]);
    const [isRolling, setIsRolling] = useState(false);
    const [games, setGames] = useState([]);
    const [chips, setChips] = useState([
        { id: 1, value: 10, color: '#ff0000' }, // Red chip
        { id: 2, value: 20, color: '#00ff00' }, // Green chip
        { id: 3, value: 50, color: '#0000ff' }, // Blue chip
    ]);

    const saveGameState = async (newDice) => {
        try {
            // Example: Saving game state after rolling dice
            await axios.post(`${API_BASE_URL}/save-game-state`, { dice: newDice });
            fetchGames(); // Refresh game history after saving state
        } catch (error) {
            console.error('Error saving game state:', error);
        }
    };

    const handleChipClick = (id) => {
        setChips((prevChips) => {
            const index = prevChips.findIndex((chip) => chip.id === id);
            const newChips = [...prevChips];
            const [movedChip] = newChips.splice(index, 1);
            newChips.push(movedChip);
            return newChips;
        });
    };
    

    const fetchGames = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/games`);
            setGames(response.data.games);
        } catch (error) {
            console.error('Error fetching games', error);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <div className="App">
            <div className="App-header">
                Yamslam
            </div>
            <div className="App-body">
            <DiceComponent dice={dice} isRolling={isRolling} />
            <h2>Game History</h2>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>{game.dice.join(', ')}</li>
                ))}
            </ul>
            <div className="chip-stack">
                {chips.map((chip, index) => (
                    <Chip
                        key={chip.id}
                        value={chip.value}
                        color={chip.color}
                        onClick={() => handleChipClick(chip.id)}
                        style={{ top: `${index * -15}px`, zIndex: chips.length - index }}
                    />
                ))}
            </div>
            </div>
            <div className="App-footer">
                <div>Developed by Matthew Zepf</div>
                <div>Questions? Create an issue at <a href="https://github.com/mzepf">this github</a> or email at <a href="mailto:mzepf@umich.edu">this email</a></div>
            </div>
        </div>
    );
}

export default App;
