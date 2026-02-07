/**
 * AI Pong - Game Core
 * Game loop with 60 FPS rendering and state management
 * 
 * Created by: Skippy the Magnificent
 */

// Canvas setup
const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Game constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const TARGET_FPS = 60;
const FRAME_TIME = 1000 / TARGET_FPS;

// Game state
const GameState = {
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAME_OVER: 'game_over'
};

// Game variables
let currentState = GameState.PAUSED;
let lastFrameTime = 0;
let deltaTime = 0;
let fps = 0;
let frameCount = 0;
let fpsUpdateTime = 0;
let showDebug = false;

/**
 * Clear the canvas with black background
 */
function clearCanvas() {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

/**
 * Draw the center line (net)
 */
function drawNet() {
  ctx.setLineDash([10, 10]);
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(CANVAS_WIDTH / 2, 0);
  ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
  ctx.stroke();
  ctx.setLineDash([]);
}

/**
 * Draw game state info (pause screen, etc.)
 */
function drawStateInfo() {
  ctx.fillStyle = '#ffffff';
  ctx.font = '32px Courier New';
  ctx.textAlign = 'center';
  
  if (currentState === GameState.PAUSED) {
    ctx.fillText('PAUSED', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);
    ctx.font = '16px Courier New';
    ctx.fillStyle = '#666666';
    ctx.fillText('Press SPACE to start', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
  }
}

/**
 * Draw debug info (FPS counter, etc.)
 */
function drawDebug() {
  if (!showDebug) return;
  
  ctx.fillStyle = '#00ff00';
  ctx.font = '12px Courier New';
  ctx.textAlign = 'left';
  ctx.fillText(`FPS: ${fps}`, 10, 20);
  ctx.fillText(`State: ${currentState}`, 10, 35);
  ctx.fillText(`Delta: ${deltaTime.toFixed(2)}ms`, 10, 50);
}

/**
 * Draw controls hint
 */
function drawControls() {
  ctx.fillStyle = '#444444';
  ctx.font = '12px Courier New';
  ctx.textAlign = 'center';
  ctx.fillText('SPACE: Pause | D: Debug | R: Restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 15);
}

/**
 * Update game logic
 * @param {number} dt - Delta time in milliseconds
 */
function update(dt) {
  if (currentState !== GameState.PLAYING) return;
  
  // Game logic will go here in future phases
  // - Update paddle positions
  // - Update ball position
  // - Check collisions
  // - Update score
}

/**
 * Render the game
 */
function render() {
  clearCanvas();
  drawNet();
  
  // Game objects will be drawn here in future phases
  // - Draw paddles
  // - Draw ball
  // - Draw score
  
  drawStateInfo();
  drawControls();
  drawDebug();
}

/**
 * Main game loop using requestAnimationFrame
 * @param {number} timestamp - Current timestamp from requestAnimationFrame
 */
function gameLoop(timestamp) {
  // Calculate delta time
  deltaTime = timestamp - lastFrameTime;
  lastFrameTime = timestamp;
  
  // Update FPS counter
  frameCount++;
  if (timestamp - fpsUpdateTime >= 1000) {
    fps = frameCount;
    frameCount = 0;
    fpsUpdateTime = timestamp;
  }
  
  // Update and render
  update(deltaTime);
  render();
  
  // Request next frame
  requestAnimationFrame(gameLoop);
}

/**
 * Toggle pause state
 */
function togglePause() {
  if (currentState === GameState.PLAYING) {
    currentState = GameState.PAUSED;
  } else if (currentState === GameState.PAUSED) {
    currentState = GameState.PLAYING;
  }
}

/**
 * Reset the game
 */
function resetGame() {
  currentState = GameState.PAUSED;
  // Reset game objects will go here
}

/**
 * Handle keyboard input
 * @param {KeyboardEvent} event
 */
function handleKeyDown(event) {
  switch (event.code) {
    case 'Space':
      event.preventDefault();
      togglePause();
      break;
    case 'KeyD':
      showDebug = !showDebug;
      break;
    case 'KeyR':
      resetGame();
      break;
  }
}

/**
 * Initialize the game
 */
function init() {
  console.log('🏓 AI Pong initialized');
  console.log('   Press SPACE to start');
  console.log('   Press D for debug info');
  
  // Set up event listeners
  document.addEventListener('keydown', handleKeyDown);
  
  // Start the game loop
  lastFrameTime = performance.now();
  fpsUpdateTime = lastFrameTime;
  requestAnimationFrame(gameLoop);
}

// Start the game when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
