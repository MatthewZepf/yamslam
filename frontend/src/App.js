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
    const [chipResult, setChipResult] = useState(null); // State for chip result

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
        console.log('here');
        console.log(API_BASE_URL);
        axios.get(`${API_BASE_URL}/api/board/chip-options`, { params: { 'dice[]': dice } })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching chip options:', error);
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

    const handleRollDone = async (newDice) => {
        setDice(newDice);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/board/chip-options`, { params: { 'dice[]': newDice } });
            console.log(newDice);
            setChipResult(response.data); // Update chip result state
        } catch (error) {
            console.error('Error fetching chip options:', error);
        }
    };

    const updateChipResult = (result) => {
        setChipResult(result);
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
            <DiceComponent dice={dice} isRolling={isRolling} onRollDone={handleRollDone}/>
            <h2>Game History</h2>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>{game.dice.join(', ')}</li>
                ))}
            </ul>
            <button onClick={handleChipClick}>handle chip click</button>
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
                {chipResult && <div>You have a: {chipResult.name}</div>} {/* Display chip result */}
            </div>
            <div className="App-footer">
                <div>Developed by Matthew Zepf</div>
                <div className="footer-links">Questions? Create an issue at <a href="https://github.com/MatthewZepf/yamslam">this github</a> or email at <a href="mailto:mzepf@umich.edu">this email</a></div>
            </div>
        </div>
    );
}

export default App;
