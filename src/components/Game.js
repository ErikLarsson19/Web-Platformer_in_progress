import React, { useState, useEffect, useRef } from 'react';
import './Game.css';

const Game = () => {
  const [player, setPlayer] = useState({ x: 50, y: 50, width: 20, height: 20, velocityY: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const platforms = [{ x: 0, y: 300, width: 400, height: 20 }];

  const gameRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setPlayer((prev) => ({ ...prev, x: prev.x + 5 }));
      } else if (e.key === 'ArrowLeft') {
        setPlayer((prev) => ({ ...prev, x: prev.x - 5 }));
      } else if (e.key === 'ArrowUp' && !isJumping) {
        setPlayer((prev) => ({ ...prev, velocityY: -10 }));
        setIsJumping(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowUp') {
        setIsJumping(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isJumping]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayer((prev) => {
        let newY = prev.y + prev.velocityY;
        let newVelocityY = prev.velocityY + 1;

        platforms.forEach((platform) => {
          if (
            prev.x < platform.x + platform.width &&
            prev.x + prev.width > platform.x &&
            newY < platform.y + platform.height &&
            newY + prev.height > platform.y &&
            newVelocityY > 0
          ) {
            newY = platform.y - prev.height;
            newVelocityY = 0;
          }
        });

        return { ...prev, y: newY, velocityY: newVelocityY };
      });
    }, 20);

    return () => clearInterval(interval);
  }, [platforms]);

  return (
    <div className="game" ref={gameRef}>
      <div className="player" style={{ left: player.x, top: player.y }}></div>
      {platforms.map((platform, index) => (
        <div
          key={index}
          className="platform"
          style={{ left: platform.x, top: platform.y, width: platform.width, height: platform.height }}
        ></div>
      ))}
    </div>
  );
};

export default Game;
