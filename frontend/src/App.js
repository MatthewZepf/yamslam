import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DiceComponent from './Dice';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function App() {
    const [dice, setDice] = useState([1, 1, 1, 1, 1]);
    const [isRolling, setIsRolling] = useState(false);
    const [games, setGames] = useState([]);

    const saveGameState = async (newDice) => {
        try {
            // Example: Saving game state after rolling dice
            await axios.post(`${API_BASE_URL}/save-game-state`, { dice: newDice });
            fetchGames(); // Refresh game history after saving state
        } catch (error) {
            console.error('Error saving game state:', error);
        }
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
            <h1>Yamslam</h1>
            <DiceComponent dice={dice} isRolling={isRolling} />
            <h2>Game History</h2>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>{game.dice.join(', ')}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
