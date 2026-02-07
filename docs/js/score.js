/**
 * AI Pong - Score Manager
 * Handles scoring, win conditions, and score display
 * 
 * Created by: Skippy the Magnificent
 */

class ScoreManager {
  constructor(winningScore = 11) {
    this.winningScore = winningScore;
    this.reset();
  }
  
  /**
   * Reset scores to zero
   */
  reset() {
    this.player1 = 0;
    this.player2 = 0;
    this.winner = null;
    this.lastScorer = null;
  }
  
  /**
   * Add a point to a player
   * @param {string} player - 'left' or 'right'
   * @returns {boolean} - True if game is over
   */
  addPoint(player) {
    this.lastScorer = player;
    
    if (player === 'left') {
      this.player1++;
      if (this.player1 >= this.winningScore) {
        this.winner = 'Player 1';
        return true;
      }
    } else {
      this.player2++;
      if (this.player2 >= this.winningScore) {
        this.winner = 'Player 2';
        return true;
      }
    }
    
    return false;
  }
  
  /**
   * Check if game is over
   * @returns {boolean}
   */
  isGameOver() {
    return this.winner !== null;
  }
  
  /**
   * Get current score as string
   * @returns {string}
   */
  getScoreString() {
    return `${this.player1} - ${this.player2}`;
  }
  
  /**
   * Render the score display
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} canvasWidth
   */
  render(ctx, canvasWidth) {
    // Main score numbers
    ctx.fillStyle = '#ffffff';
    ctx.font = '64px Courier New';
    ctx.textAlign = 'center';
    
    // Player 1 score (left side)
    ctx.fillText(this.player1.toString(), canvasWidth / 4, 80);
    
    // Player 2 score (right side)
    ctx.fillText(this.player2.toString(), (canvasWidth / 4) * 3, 80);
    
    // Player labels
    ctx.font = '14px Courier New';
    ctx.fillStyle = '#666666';
    ctx.fillText('PLAYER 1', canvasWidth / 4, 105);
    ctx.fillText('PLAYER 2', (canvasWidth / 4) * 3, 105);
    
    // Winning score indicator
    ctx.font = '12px Courier New';
    ctx.fillStyle = '#444444';
    ctx.fillText(`First to ${this.winningScore}`, canvasWidth / 2, 30);
  }
  
  /**
   * Render game over screen
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} canvasWidth
   * @param {number} canvasHeight
   */
  renderGameOver(ctx, canvasWidth, canvasHeight) {
    // Semi-transparent overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Winner announcement
    ctx.fillStyle = '#ffffff';
    ctx.font = '48px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText(`${this.winner} Wins!`, canvasWidth / 2, canvasHeight / 2 - 40);
    
    // Final score
    ctx.font = '32px Courier New';
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText(this.getScoreString(), canvasWidth / 2, canvasHeight / 2 + 10);
    
    // Restart prompt
    ctx.font = '16px Courier New';
    ctx.fillStyle = '#666666';
    ctx.fillText('Press R to play again', canvasWidth / 2, canvasHeight / 2 + 60);
  }
  
  /**
   * Render point scored flash effect
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} canvasWidth
   * @param {number} canvasHeight
   * @param {number} flashIntensity - 0 to 1
   */
  renderScoreFlash(ctx, canvasWidth, canvasHeight, flashIntensity) {
    if (flashIntensity <= 0) return;
    
    const alpha = flashIntensity * 0.3;
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    
    if (this.lastScorer === 'left') {
      // Flash left side
      ctx.fillRect(0, 0, canvasWidth / 2, canvasHeight);
    } else if (this.lastScorer === 'right') {
      // Flash right side
      ctx.fillRect(canvasWidth / 2, 0, canvasWidth / 2, canvasHeight);
    }
  }
}
