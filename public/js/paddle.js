/**
 * AI Pong - Paddle Class
 * Handles paddle rendering, movement, and collision
 * 
 * Created by: Skippy the Magnificent
 */

class Paddle {
  /**
   * Create a new paddle
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {string} side - 'left' or 'right'
   */
  constructor(x, y, side) {
    this.x = x;
    this.y = y;
    this.side = side;
    
    // Dimensions
    this.width = 15;
    this.height = 100;
    
    // Movement
    this.velocity = 0;
    this.maxSpeed = 8;
    this.acceleration = 0.8;
    this.friction = 0.85;
    
    // Boundaries
    this.minY = 0;
    this.maxY = CANVAS_HEIGHT - this.height;
  }
  
  /**
   * Move paddle up
   */
  moveUp() {
    this.velocity -= this.acceleration;
    if (this.velocity < -this.maxSpeed) {
      this.velocity = -this.maxSpeed;
    }
  }
  
  /**
   * Move paddle down
   */
  moveDown() {
    this.velocity += this.acceleration;
    if (this.velocity > this.maxSpeed) {
      this.velocity = this.maxSpeed;
    }
  }
  
  /**
   * Update paddle position
   * @param {number} dt - Delta time in milliseconds
   */
  update(dt) {
    // Apply velocity
    this.y += this.velocity;
    
    // Apply friction when not actively moving
    this.velocity *= this.friction;
    
    // Clamp to boundaries
    if (this.y < this.minY) {
      this.y = this.minY;
      this.velocity = 0;
    }
    if (this.y > this.maxY) {
      this.y = this.maxY;
      this.velocity = 0;
    }
  }
  
  /**
   * Render the paddle
   * @param {CanvasRenderingContext2D} ctx - Canvas context
   */
  render(ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  
  /**
   * Reset paddle to starting position
   */
  reset() {
    this.y = (CANVAS_HEIGHT - this.height) / 2;
    this.velocity = 0;
  }
  
  /**
   * Get the center Y position of the paddle
   * @returns {number}
   */
  getCenterY() {
    return this.y + this.height / 2;
  }
  
  /**
   * Get paddle bounds for collision detection
   * @returns {Object}
   */
  getBounds() {
    return {
      left: this.x,
      right: this.x + this.width,
      top: this.y,
      bottom: this.y + this.height
    };
  }
}
