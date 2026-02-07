/**
 * AI Pong - Game Core
 * Basic canvas setup and render loop foundation
 * 
 * Created by: Skippy the Magnificent
 */

// Canvas setup
const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Game constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

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
 * Draw placeholder text (temporary - will be replaced by actual game)
 */
function drawPlaceholder() {
  ctx.fillStyle = '#ffffff';
  ctx.font = '32px Courier New';
  ctx.textAlign = 'center';
  ctx.fillText('AI PONG', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);
  
  ctx.font = '16px Courier New';
  ctx.fillStyle = '#666666';
  ctx.fillText('Created by Skippy the Magnificent', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
  ctx.fillText('Phase 1: Foundation Complete', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50);
}

/**
 * Main render function
 */
function render() {
  clearCanvas();
  drawNet();
  drawPlaceholder();
}

/**
 * Initialize the game
 */
function init() {
  console.log('🏓 AI Pong initialized');
  render();
}

// Start the game when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
