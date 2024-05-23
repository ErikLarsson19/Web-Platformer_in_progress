import React from 'react';
import './Obstacle.css';

function Obstacle({ x, y }) {
  return (
    <div className="obstacle" style={{ left: x, top: y }}>
      <img src="/assets/obstacle.png" alt="obstacle" />
    </div>
  );
}

export default Obstacle;
