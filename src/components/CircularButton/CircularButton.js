import React from 'react';
import './CircularButton.css';

const CircularButton = ({ onClick }) => {
    return (
        <button className="circular-button" onClick={onClick}>
            +
        </button>
    );
};

export default CircularButton;
