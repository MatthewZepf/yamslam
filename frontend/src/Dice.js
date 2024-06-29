import React, { useRef, useState } from 'react';
import ReactDice from 'react-dice-complete';
import './Dice.css'; // Assuming you have your custom styles here

const DiceComponent = ({ dice }) => {
    const reactDiceRefs = useRef([]);
    const [selectedDice, setSelectedDice] = useState([]);
    const [diceValues, setDiceValues] = useState(Array(dice.length).fill(1)); // State to hold dice values
    const [diceRollTimes, setDiceRollTimes] = useState(Array(dice.length).fill(2)); // State to hold dice roll times [optional
    const [dotColors, setDotColors] = useState(Array(dice.length).fill('white')); // State to hold dot colors

    const handleDiceClick = (index, event) => {
        event.stopPropagation(); // Prevent roll on click
        setSelectedDice((prevSelected) => {
            if (prevSelected.includes(index)) {
                return prevSelected.filter((i) => i !== index);
            } else {
                return [...prevSelected, index];
            }
        });
    };

    const rollDone = (index, value) => {
        setDiceValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[index] = value;
            return newValues;
        });

        setDotColors((prevColors) => {
            const newColors = [...prevColors];
            newColors[index] = value % 2 === 0 ? 'red' : 'white';
            return newColors;
        });
    };

    const rollSelected = () => {
        selectedDice.forEach((index) => {
            reactDiceRefs.current[index].rollAll();
        });
        setSelectedDice([]);
    };

    const rollAllDice = () => {
        reactDiceRefs.current.forEach((ref) => ref.rollAll());
    };

    return (
        <div className="dice-container">
            {dice.map((die, index) => (
                <div
                    key={index}
                    className={`dice-wrapper ${selectedDice.includes(index) ? 'selected' : ''}`}
                    onClick={(event) => handleDiceClick(index, event)}
                >
                    <div className="dice-click-area">
                        <ReactDice
                            ref={(el) => (reactDiceRefs.current[index] = el)}
                            numDice={1}
                            rollDone={(value) => rollDone(index, value)}
                            size={60}
                            margin={15}
                            rollTime={2}
                            faceColor="#000000"
                            dotColor={dotColors[index]}
                            disableIndividual={true} // Disable individual dice rolling on click
                        />
                    </div>
                </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Ensure vertical alignment */}
                <div style={{ marginBottom: '10px' }}> {/* Add space below the first button */}
                    <button onClick={rollSelected}>Roll Selected Dice</button>
                </div>
                <div>
                    <button onClick={rollAllDice}>Roll All Dice</button>
                </div>
            </div>
        </div>
    );
};

export default DiceComponent;
