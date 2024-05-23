import { INITIAL_PLATFORM_GAP, CHARACTER_START_Y, INITIAL_PLATFORMS, PLATFORM_WIDTH, PLATFORM_HEIGHT } from './constants';

export const generateInitialPlatforms = () => {
  const initialPlatforms = [...INITIAL_PLATFORMS];
  for (let i = INITIAL_PLATFORMS.length; i < 10; i++) { // Generating additional platforms if needed
    initialPlatforms.push({ x: Math.random() * 500, y: CHARACTER_START_Y + 150 - i * INITIAL_PLATFORM_GAP, type: 'solid' });
  }
  return initialPlatforms;
};

export const filterVisiblePlatforms = (platforms, cameraY) => {
  return platforms.filter(p => p.y > cameraY - 800 && p.y < cameraY + 800);
};

export const isCharacterOnPlatform = (character, platform) => {
  return (
    character.x + 25 > platform.x &&
    character.x < platform.x + PLATFORM_WIDTH &&
    character.y + 25 > platform.y &&
    character.y < platform.y + PLATFORM_HEIGHT
  );
};

