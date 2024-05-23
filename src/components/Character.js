import React from 'react';
import './Character.css';

function Character({ x, y }) {
  return (
    <div className="character" style={{ left: x, top: y }}>
      <img src="/assets/Bot_idle.gif" alt="character" className="character-image" />
    </div>
  );
}

export default Character;
