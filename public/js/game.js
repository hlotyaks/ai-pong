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
const PADDLE_OFFSET = 30; // Distance from edge

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

// Game objects
let paddle1 = null; // Left paddle (Player 1)
let paddle2 = null; // Right paddle (Player 2)

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
  ctx.fillText(`P1 Y: ${paddle1.y.toFixed(0)} V: ${paddle1.velocity.toFixed(2)}`, 10, 65);
  ctx.fillText(`P2 Y: ${paddle2.y.toFixed(0)} V: ${paddle2.velocity.toFixed(2)}`, 10, 80);
}

/**
 * Draw controls hint
 */
function drawControls() {
  ctx.fillStyle = '#444444';
  ctx.font = '12px Courier New';
  ctx.textAlign = 'center';
  ctx.fillText('P1: W/S | P2: ↑/↓ | SPACE: Pause | D: Debug', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 15);
}

/**
 * Handle paddle input
 */
function handlePaddleInput() {
  // Player 1 (Left paddle - W/S)
  if (Input.isPlayer1Up()) {
    paddle1.moveUp();
  }
  if (Input.isPlayer1Down()) {
    paddle1.moveDown();
  }
  
  // Player 2 (Right paddle - Arrow keys)
  if (Input.isPlayer2Up()) {
    paddle2.moveUp();
  }
  if (Input.isPlayer2Down()) {
    paddle2.moveDown();
  }
}

/**
 * Update game logic
 * @param {number} dt - Delta time in milliseconds
 */
function update(dt) {
  if (currentState !== GameState.PLAYING) return;
  
  // Handle input
  handlePaddleInput();
  
  // Update paddles
  paddle1.update(dt);
  paddle2.update(dt);
  
  // Ball update will go here in Phase 4
}

/**
 * Render the game
 */
function render() {
  clearCanvas();
  drawNet();
  
  // Draw paddles
  paddle1.render(ctx);
  paddle2.render(ctx);
  
  // Ball will be drawn here in Phase 4
  
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
  paddle1.reset();
  paddle2.reset();
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
 * Create game objects
 */
function createGameObjects() {
  // Left paddle (Player 1)
  paddle1 = new Paddle(
    PADDLE_OFFSET,
    (CANVAS_HEIGHT - 100) / 2,
    'left'
  );
  
  // Right paddle (Player 2)
  paddle2 = new Paddle(
    CANVAS_WIDTH - PADDLE_OFFSET - 15,
    (CANVAS_HEIGHT - 100) / 2,
    'right'
  );
}

/**
 * Initialize the game
 */
function init() {
  console.log('🏓 AI Pong initialized');
  console.log('   Player 1: W/S keys');
  console.log('   Player 2: Arrow Up/Down');
  console.log('   Press SPACE to start');
  
  // Initialize input handler
  Input.init();
  
  // Create game objects
  createGameObjects();
  
  // Set up event listeners
  document.addEventListener('keydown', handleKeyDown);
  
  // Start the game loop
  lastFrameTime = performance.now();
  fpsUpdateTime = lastFrameTime;
  requestAnimationFrame(gameLoop);
}

// Start the game when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
