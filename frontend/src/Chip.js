import React from 'react';
import './Chip.css';

const Chip = ({ value, color }) => {
    return (
        <div className="chip" style={{ backgroundColor: color }}>
            <span className="chip-value">{value}</span>
        </div>
    );
};

export default Chip;
