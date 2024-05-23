import React from 'react';
import './Coin.css';

function Coin({ x, y }) {
  return (
    <div className="coin" style={{ left: x, top: y }}>
      <img src="/assets/coin.png" alt="coin" />
    </div>
  );
}

export default Coin;
