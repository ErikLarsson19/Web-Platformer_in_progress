import { PLATFORM_GAP, INITIAL_PLATFORM_COUNT, CHARACTER_START_Y, INITIAL_PLATFORMS, PLATFORM_WIDTH, PLATFORM_HEIGHT } from './constants';

export const generateInitialPlatforms = () => {
  const initialPlatforms = [...INITIAL_PLATFORMS];
  for (let i = INITIAL_PLATFORMS.length; i < INITIAL_PLATFORM_COUNT; i++) {
    initialPlatforms.push({ x: Math.random() * 500, y: CHARACTER_START_Y + 150 - i * PLATFORM_GAP, type: 'solid' });
  }
  return initialPlatforms;
};

export const filterVisiblePlatforms = (platforms, cameraY) => {
  return platforms.filter(p => p.y > cameraY - 800 && p.y < cameraY + 800);
};

export const isCharacterOnPlatform = (character, platform) => {
  return (
    character.x + 25 > platform.x && // right side of character is past the left side of the platform
    character.x < platform.x + PLATFORM_WIDTH && // left side of character is before the right side of the platform
    character.y + 25 > platform.y && // bottom of character is past the top of the platform
    character.y < platform.y + PLATFORM_HEIGHT // top of character is before the bottom of the platform
  );
};
