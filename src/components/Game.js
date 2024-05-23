import React, { useEffect, useState } from 'react';
import Character from './Character';
import Platform from './Platform';
import './Game.css';
import { GRAVITY, JUMP_STRENGTH, MOVE_SPEED, PLATFORM_GAP, GAME_HEIGHT, CHARACTER_START_X, CHARACTER_START_Y } from '../utils/constants';
import { generateInitialPlatforms, filterVisiblePlatforms, isCharacterOnPlatform } from '../utils/gameLogic';

function Game() {
  const [character, setCharacter] = useState({ x: CHARACTER_START_X, y: CHARACTER_START_Y, vy: 0, vx: 0 });
  const [cameraY, setCameraY] = useState(0);
  const [platforms, setPlatforms] = useState(generateInitialPlatforms);

  const resetGame = () => {
    setCharacter({ x: CHARACTER_START_X, y: CHARACTER_START_Y, vy: 0, vx: 0 });
    setCameraY(0);
    setPlatforms(generateInitialPlatforms);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setCharacter((prev) => ({ ...prev, vx: -MOVE_SPEED }));
      }
      if (e.key === 'ArrowRight') {
        setCharacter((prev) => ({ ...prev, vx: MOVE_SPEED }));
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        setCharacter((prev) => ({ ...prev, vx: 0 }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setCharacter((prev) => {
        let newY = prev.y + prev.vy;
        let newX = prev.x + prev.vx;
        let newVy = prev.vy + GRAVITY;

        const landedPlatform = platforms.find(p => isCharacterOnPlatform({ x: newX, y: newY }, p));

        if (landedPlatform && newVy > 0) {
          newVy = JUMP_STRENGTH;
          if (landedPlatform.type === 'breakable') {
            setPlatforms(prevPlatforms => prevPlatforms.filter(p => p !== landedPlatform));
          }
        }

        // Prevent character from moving out of bounds
        if (newX < 0) newX = 0;
        if (newX > 575) newX = 575;

        return { ...prev, y: newY, x: newX, vy: newVy };
      });

      // Update the camera position to follow the character
      setCameraY(character.y - 300);

      // Add new platforms
      setPlatforms((prev) => {
        const highestPlatform = Math.min(...prev.map(p => p.y));
        if (highestPlatform > cameraY - PLATFORM_GAP) {
          const newPlatform = { x: Math.random() * 550, y: highestPlatform - PLATFORM_GAP, type: Math.random() > 0.8 ? 'breakable' : 'solid' };
          return [...prev, newPlatform];
        }
        return filterVisiblePlatforms(prev, cameraY);
      });

      // Restart game if character falls below a certain point
      if (character.y > CHARACTER_START_Y + GAME_HEIGHT) {
        resetGame();
      }

    }, 16);

    return () => clearInterval(gameLoop);
  }, [cameraY, platforms, character.y]);

  return (
    <div className="game-container">
      <div className="game-world" style={{ transform: `translateY(${-cameraY}px)` }}>
        <Character x={character.x} y={character.y} />
        {platforms.map((platform, index) => (
          <Platform key={index} x={platform.x} y={platform.y} type={platform.type} />
        ))}
      </div>
    </div>
  );
}

export default Game;
