export const GRAVITY = 0.5;
export const JUMP_STRENGTH = -30;
export const MOVE_SPEED = 5;
export const INITIAL_PLATFORM_GAP = 100;
export const GAME_HEIGHT = 850;
export const GAME_WIDTH = 800;
export const CHARACTER_START_X = 275;
export const CHARACTER_START_Y = 600; // Adjusted to be higher than the initial platforms
export const PLATFORM_WIDTH = 100; // Width of the platform image
export const PLATFORM_HEIGHT = 20; // Height of the platform image
export const INITIAL_PLATFORMS = [
  { x: 250, y: 750, type: 'solid' },
  { x: 150, y: 650, type: 'solid' },
  { x: 350, y: 550, type: 'solid' },
  { x: 200, y: 450, type: 'solid' },
  { x: 300, y: 350, type: 'solid' }
];
export const FALL_LIMIT = CHARACTER_START_Y + 500; // New constant for game over condition
