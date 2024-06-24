// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DiceComponent from './Dice';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function App() {
    const [dice, setDice] = useState([1, 1, 1, 1, 1]); // Default values for initial render
    const [isRolling, setIsRolling] = useState(false);
    const [games, setGames] = useState([]);

    const rollDice = async () => {
        setIsRolling(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/roll-dice`);
            setTimeout(() => {
                setDice(response.data.dice);
                setIsRolling(false);
                fetchGames();
            }, 1000); // Duration of the animation
        } catch (error) {
            console.error('Error rolling dice', error);
            setIsRolling(false);
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
            <button onClick={rollDice} disabled={isRolling}>Roll Dice</button>
            <DiceComponent dice={dice} isRolling={isRolling} />
            <h2>Game History</h2>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>{game.dice}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
