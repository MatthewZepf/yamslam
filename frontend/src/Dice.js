import React, { useEffect, useRef, useState } from 'react';
import ReactDice from 'react-dice-complete';
import './Dice.css'; // Assuming you have your custom styles here

const DiceComponent = ({ dice, updateDiceValues }) => {
    const reactDiceRefs = useRef([]);
    const [selectedDice, setSelectedDice] = useState([]);
    // set the roll time array to be 1, 1.5, 2, 2.5, 3 seconds
    const rollTimes = [1, 1.5, 2, 2.5, 3];
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
        const newDice = [...dice];
        newDice[index] = value;
        updateDiceValues(newDice);

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
        setSelectedDice([]);
    };

    const setDiceToValues = (values) => {
        values.forEach((value, index) => {
            reactDiceRefs.current[index].rollAll(value);
        });
    }

    const rollDiceSequentially = async () => {
        for (let i = 0; i < reactDiceRefs.current.length; i++) {
            reactDiceRefs.current[i].rollAll();
            await new Promise((resolve) => setTimeout(resolve, rollTimes[i] * 1000)); // Wait for the roll time
        }
    };

    // call setDiceToValues with all 6's on mount
    // must be an array of arrays like [6], [6], [6], [6], [ 
    useEffect(() => {
        setDiceToValues([[6], [6], [6], [6], [6]]);
    }, []);


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
                            rollTime={rollTimes[index]}
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
                    <button onClick={rollDiceSequentially}>Roll Dice Sequentially</button>
                </div>
            </div>
        </div>
    );
};

export default DiceComponent;
