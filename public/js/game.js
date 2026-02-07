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
const PADDLE_OFFSET = 30;
const WINNING_SCORE = 11;

// Game state
const GameState = {
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAME_OVER: 'game_over',
  SCORE_PAUSE: 'score_pause' // Brief pause after scoring
};

// Game variables
let currentState = GameState.PAUSED;
let lastFrameTime = 0;
let deltaTime = 0;
let fps = 0;
let frameCount = 0;
let fpsUpdateTime = 0;
let showDebug = false;

// Score pause timing
let scorePauseTimer = 0;
const SCORE_PAUSE_DURATION = 1000; // 1 second pause after score
let scoreFlashIntensity = 0;

// Game objects
let paddle1 = null;
let paddle2 = null;
let ball = null;
let scoreManager = null;

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
  if (currentState === GameState.PAUSED) {
    ctx.fillStyle = '#ffffff';
    ctx.font = '32px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText('PAUSED', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);
    ctx.font = '16px Courier New';
    ctx.fillStyle = '#666666';
    ctx.fillText('Press SPACE to start', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
  }
}

/**
 * Draw debug info
 */
function drawDebug() {
  if (!showDebug) return;
  
  const ballInfo = ball.getDebugInfo();
  
  ctx.fillStyle = '#00ff00';
  ctx.font = '12px Courier New';
  ctx.textAlign = 'left';
  ctx.fillText(`FPS: ${fps}`, 10, 20);
  ctx.fillText(`State: ${currentState}`, 10, 35);
  ctx.fillText(`Delta: ${deltaTime.toFixed(2)}ms`, 10, 50);
  ctx.fillText(`P1 Y: ${paddle1.y.toFixed(0)} V: ${paddle1.velocity.toFixed(2)}`, 10, 65);
  ctx.fillText(`P2 Y: ${paddle2.y.toFixed(0)} V: ${paddle2.velocity.toFixed(2)}`, 10, 80);
  ctx.fillText(`Ball: (${ballInfo.x}, ${ballInfo.y}) V: (${ballInfo.vx}, ${ballInfo.vy})`, 10, 95);
  ctx.fillText(`Ball Speed: ${ballInfo.speed}`, 10, 110);
  ctx.fillText(`Score: ${scoreManager.getScoreString()}`, 10, 125);
}

/**
 * Draw controls hint
 */
function drawControls() {
  ctx.fillStyle = '#444444';
  ctx.font = '12px Courier New';
  ctx.textAlign = 'center';
  ctx.fillText('P1: W/S | P2: ↑/↓ | SPACE: Pause | D: Debug | R: Restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 15);
}

/**
 * Handle paddle input
 */
function handlePaddleInput() {
  if (Input.isPlayer1Up()) paddle1.moveUp();
  if (Input.isPlayer1Down()) paddle1.moveDown();
  if (Input.isPlayer2Up()) paddle2.moveUp();
  if (Input.isPlayer2Down()) paddle2.moveDown();
}

/**
 * Handle scoring
 * @param {string} scorer - 'left' or 'right'
 */
function handleScore(scorer) {
  const gameOver = scoreManager.addPoint(scorer);
  
  if (gameOver) {
    currentState = GameState.GAME_OVER;
  } else {
    // Brief pause after scoring
    currentState = GameState.SCORE_PAUSE;
    scorePauseTimer = SCORE_PAUSE_DURATION;
    scoreFlashIntensity = 1;
  }
  
  // Reset ball
  ball.reset();
}

/**
 * Update game logic
 * @param {number} dt - Delta time in milliseconds
 */
function update(dt) {
  // Handle score pause
  if (currentState === GameState.SCORE_PAUSE) {
    scorePauseTimer -= dt;
    scoreFlashIntensity = Math.max(0, scorePauseTimer / SCORE_PAUSE_DURATION);
    
    if (scorePauseTimer <= 0) {
      currentState = GameState.PLAYING;
    }
    
    // Still update paddles during score pause
    handlePaddleInput();
    paddle1.update(dt);
    paddle2.update(dt);
    return;
  }
  
  if (currentState !== GameState.PLAYING) return;
  
  handlePaddleInput();
  paddle1.update(dt);
  paddle2.update(dt);
  
  const scored = ball.update(dt, paddle1, paddle2);
  if (scored) {
    handleScore(scored);
  }
  
  // Fade out flash
  scoreFlashIntensity = Math.max(0, scoreFlashIntensity - dt / 500);
}

/**
 * Render the game
 */
function render() {
  clearCanvas();
  
  // Score flash effect
  scoreManager.renderScoreFlash(ctx, CANVAS_WIDTH, CANVAS_HEIGHT, scoreFlashIntensity);
  
  drawNet();
  scoreManager.render(ctx, CANVAS_WIDTH);
  
  paddle1.render(ctx);
  paddle2.render(ctx);
  ball.render(ctx);
  
  drawStateInfo();
  drawControls();
  drawDebug();
  
  // Game over overlay (on top of everything)
  if (currentState === GameState.GAME_OVER) {
    scoreManager.renderGameOver(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

/**
 * Main game loop
 */
function gameLoop(timestamp) {
  deltaTime = timestamp - lastFrameTime;
  lastFrameTime = timestamp;
  
  frameCount++;
  if (timestamp - fpsUpdateTime >= 1000) {
    fps = frameCount;
    frameCount = 0;
    fpsUpdateTime = timestamp;
  }
  
  update(deltaTime);
  render();
  
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
  // Can't pause during game over or score pause
}

/**
 * Reset the game
 */
function resetGame() {
  currentState = GameState.PAUSED;
  paddle1.reset();
  paddle2.reset();
  ball.reset();
  scoreManager.reset();
  scoreFlashIntensity = 0;
}

/**
 * Handle keyboard input
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
  paddle1 = new Paddle(PADDLE_OFFSET, (CANVAS_HEIGHT - 100) / 2, 'left');
  paddle2 = new Paddle(CANVAS_WIDTH - PADDLE_OFFSET - 15, (CANVAS_HEIGHT - 100) / 2, 'right');
  ball = new Ball();
  scoreManager = new ScoreManager(WINNING_SCORE);
}

/**
 * Initialize the game
 */
function init() {
  console.log('🏓 AI Pong initialized');
  console.log(`   First to ${WINNING_SCORE} wins!`);
  console.log('   Player 1: W/S keys');
  console.log('   Player 2: Arrow Up/Down');
  console.log('   Press SPACE to start');
  
  Input.init();
  createGameObjects();
  document.addEventListener('keydown', handleKeyDown);
  
  lastFrameTime = performance.now();
  fpsUpdateTime = lastFrameTime;
  requestAnimationFrame(gameLoop);
}

document.addEventListener('DOMContentLoaded', init);
