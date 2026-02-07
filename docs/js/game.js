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
  SCORE_PAUSE: 'score_pause'
};

// Game variables
let currentState = GameState.PAUSED;
let lastFrameTime = 0;
let deltaTime = 0;
let fps = 0;
let frameCount = 0;
let fpsUpdateTime = 0;
let showDebug = false;
let soundEnabled = true;

// Score pause timing
let scorePauseTimer = 0;
const SCORE_PAUSE_DURATION = 1000;
let scoreFlashIntensity = 0;

// Game objects
let paddle1 = null;
let paddle2 = null;
let ball = null;
let scoreManager = null;

function clearCanvas() {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

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

function drawStateInfo() {
  if (currentState === GameState.PAUSED) {
    // Semi-transparent backdrop
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(CANVAS_WIDTH / 2 - 150, CANVAS_HEIGHT / 2 - 60, 300, 120);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '32px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText('PAUSED', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 15);
    ctx.font = '14px Courier New';
    ctx.fillStyle = '#888888';
    ctx.fillText('Press SPACE to start', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 15);
    ctx.fillText('M: Toggle Sound', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 35);
  }
}

function drawDebug() {
  if (!showDebug) return;
  
  const ballInfo = ball.getDebugInfo();
  const particleCount = typeof particles !== 'undefined' ? particles.particles.length : 0;
  
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
  ctx.fillText(`Particles: ${particleCount}`, 10, 125);
  ctx.fillText(`Sound: ${soundEnabled ? 'ON' : 'OFF'}`, 10, 140);
}

function drawControls() {
  ctx.fillStyle = '#444444';
  ctx.font = '12px Courier New';
  ctx.textAlign = 'center';
  ctx.fillText('P1: W/S | P2: ↑/↓ | SPACE: Pause | M: Sound | D: Debug | R: Reset', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 15);
}

function handlePaddleInput() {
  if (Input.isPlayer1Up()) paddle1.moveUp();
  if (Input.isPlayer1Down()) paddle1.moveDown();
  if (Input.isPlayer2Up()) paddle2.moveUp();
  if (Input.isPlayer2Down()) paddle2.moveDown();
}

function handleScore(scorer) {
  const gameOver = scoreManager.addPoint(scorer);
  
  if (gameOver) {
    currentState = GameState.GAME_OVER;
    if (typeof sound !== 'undefined') sound.win();
    // Big particle burst for winner
    if (typeof particles !== 'undefined') {
      const x = scorer === 'left' ? CANVAS_WIDTH / 4 : (CANVAS_WIDTH / 4) * 3;
      particles.burst(x, 80, 30, 'rgba(255, 215, 0, 1)');
    }
  } else {
    currentState = GameState.SCORE_PAUSE;
    scorePauseTimer = SCORE_PAUSE_DURATION;
    scoreFlashIntensity = 1;
  }
  
  ball.reset();
}

function update(dt) {
  // Update particles always
  if (typeof particles !== 'undefined') {
    particles.update(dt);
  }
  
  if (currentState === GameState.SCORE_PAUSE) {
    scorePauseTimer -= dt;
    scoreFlashIntensity = Math.max(0, scorePauseTimer / SCORE_PAUSE_DURATION);
    
    if (scorePauseTimer <= 0) {
      currentState = GameState.PLAYING;
    }
    
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
  
  scoreFlashIntensity = Math.max(0, scoreFlashIntensity - dt / 500);
}

function render() {
  clearCanvas();
  
  // Particles behind everything
  if (typeof particles !== 'undefined') {
    particles.render(ctx);
  }
  
  scoreManager.renderScoreFlash(ctx, CANVAS_WIDTH, CANVAS_HEIGHT, scoreFlashIntensity);
  
  drawNet();
  scoreManager.render(ctx, CANVAS_WIDTH);
  
  paddle1.render(ctx);
  paddle2.render(ctx);
  ball.render(ctx);
  
  drawStateInfo();
  drawControls();
  drawDebug();
  
  if (currentState === GameState.GAME_OVER) {
    scoreManager.renderGameOver(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

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

function togglePause() {
  if (currentState === GameState.PLAYING) {
    currentState = GameState.PAUSED;
  } else if (currentState === GameState.PAUSED) {
    currentState = GameState.PLAYING;
    // Initialize sound on first play (requires user interaction)
    if (typeof sound !== 'undefined' && !sound.initialized) {
      sound.init();
    }
    if (typeof sound !== 'undefined') sound.start();
  }
}

function toggleSound() {
  if (typeof sound !== 'undefined') {
    soundEnabled = sound.toggle();
  }
}

function resetGame() {
  currentState = GameState.PAUSED;
  paddle1.reset();
  paddle2.reset();
  ball.reset();
  scoreManager.reset();
  scoreFlashIntensity = 0;
  if (typeof particles !== 'undefined') {
    particles.clear();
  }
}

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
    case 'KeyM':
      toggleSound();
      break;
  }
}

function createGameObjects() {
  paddle1 = new Paddle(PADDLE_OFFSET, (CANVAS_HEIGHT - 100) / 2, 'left');
  paddle2 = new Paddle(CANVAS_WIDTH - PADDLE_OFFSET - 15, (CANVAS_HEIGHT - 100) / 2, 'right');
  ball = new Ball();
  scoreManager = new ScoreManager(WINNING_SCORE);
}

function init() {
  console.log('🏓 AI Pong initialized');
  console.log(`   First to ${WINNING_SCORE} wins!`);
  console.log('   Player 1: W/S keys');
  console.log('   Player 2: Arrow Up/Down');
  console.log('   Press SPACE to start');
  console.log('   Press M to toggle sound');
  
  Input.init();
  createGameObjects();
  document.addEventListener('keydown', handleKeyDown);
  
  lastFrameTime = performance.now();
  fpsUpdateTime = lastFrameTime;
  requestAnimationFrame(gameLoop);
}

document.addEventListener('DOMContentLoaded', init);
