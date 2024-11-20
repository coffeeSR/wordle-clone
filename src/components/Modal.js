import React from 'react';
import { useState } from 'react';

export default function Modal({ isCorrect, turn, solution }) {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };
 
    const handleReset = () => {
        window.location.reload();
    }

    if(!isVisible) return null;

  return (
    <div className='modal'>
        
        {isCorrect && (
            <div className='result'>
                <button onClick={handleClose} className="close">✖</button>
                <button onClick={handleReset} className='reset'>⟳</button>
                <h3>Congratulations!!!</h3>
                <p className='solution'>{solution}</p>
                <p className='guess'>Guess: {turn}</p>
            </div>
        )}
        {!isCorrect && (
            <div className='result'>
                <button onClick={handleClose} className="close">✖</button>
                <button onClick={handleReset} className='reset'>⟳</button>
                <h3>Better luck next time</h3>
                <p className='solution'>{solution}</p>
            </div>
        )}
       <div className="backdrop"></div>
    </div>
  )
}
