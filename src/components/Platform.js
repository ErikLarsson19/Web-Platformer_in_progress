import React from 'react';
import './Platform.css';

function Platform({ x, y, type }) {
  return (
    <div className={`platform ${type}`} style={{ left: x, top: y }}>
      <img src="/assets/Platform.jpg" alt={`${type} platform`} />
    </div>
  );
}

export default Platform;
