import React, { useEffect, useState } from 'react';
import Character from './Character';
import Platform from './Platform';
import './Game.css';
import { GRAVITY, JUMP_STRENGTH, MOVE_SPEED, INITIAL_PLATFORM_GAP, CHARACTER_START_X, CHARACTER_START_Y, FALL_LIMIT, GAME_HEIGHT, GAME_WIDTH } from '../utils/constants';
import { generateInitialPlatforms, filterVisiblePlatforms, isCharacterOnPlatform } from '../utils/gameLogic';

function Game() {
  const [character, setCharacter] = useState({ x: CHARACTER_START_X, y: CHARACTER_START_Y, vy: 0, vx: 0 });
  const [cameraY, setCameraY] = useState(0);
  const [platforms, setPlatforms] = useState(generateInitialPlatforms);
  const [score, setScore] = useState(0);
  const [platformGap, setPlatformGap] = useState(INITIAL_PLATFORM_GAP);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Update CSS variables with the game dimensions
    document.documentElement.style.setProperty('--game-width', `${GAME_WIDTH}px`);
    document.documentElement.style.setProperty('--game-height', `${GAME_HEIGHT}px`);
  }, []);

  const resetGame = () => {
    setCharacter({ x: CHARACTER_START_X, y: CHARACTER_START_Y, vy: 0, vx: 0 });
    setCameraY(0);
    setPlatforms(generateInitialPlatforms());
    setScore(0);
    setPlatformGap(INITIAL_PLATFORM_GAP);
    setGameOver(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setCharacter((prev) => ({ ...prev, vx: -MOVE_SPEED }));
      }
      if (e.key === 'ArrowRight') {
        setCharacter((prev) => ({ ...prev, vx: MOVE_SPEED }));
      }
      if (e.key === 'r' || e.key === 'R') {
        resetGame();
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
    if (gameOver) return;

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

      // Update the score based on the highest point reached
      setScore((prev) => Math.max(prev, CHARACTER_START_Y - character.y));

      // Make the game harder by increasing the platform gap
      if (score > 1000) {
        setPlatformGap(INITIAL_PLATFORM_GAP + Math.floor(score / 1000) * 10);
      }

      // Add new platforms
      setPlatforms((prev) => {
        const highestPlatform = Math.min(...prev.map(p => p.y));
        if (highestPlatform > cameraY - platformGap) {
          const newPlatform = { x: Math.random() * 550, y: highestPlatform - platformGap, type: Math.random() > 0.8 ? 'breakable' : 'solid' };
          return [...prev, newPlatform];
        }
        return filterVisiblePlatforms(prev, cameraY);
      });

      // Restart game if character falls below a certain point
      if (character.y > FALL_LIMIT) {
        setGameOver(true);
      }

    }, 16);

    return () => clearInterval(gameLoop);
  }, [cameraY, platforms, character.y, score, platformGap, gameOver]);

  return (
    <div className="game-container">
      <div className="score">Score: {score}</div>
      <div className="game-world" style={{ transform: `translateY(${-cameraY}px)` }}>
        <Character x={character.x} y={character.y} />
        {platforms.map((platform, index) => (
          <Platform key={index} x={platform.x} y={platform.y} type={platform.type} />
        ))}
      </div>
      {gameOver && <div className="game-over">Game Over! Press R to Restart</div>}
    </div>
  );
}

export default Game;
