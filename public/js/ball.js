/**
 * AI Pong - Ball Class
 * Handles ball movement, collision detection, and physics
 * 
 * Created by: Skippy the Magnificent
 */

class Ball {
  constructor() {
    this.radius = 10;
    this.reset();
  }
  
  /**
   * Reset ball to center with random direction
   */
  reset() {
    // Center position
    this.x = CANVAS_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2;
    
    // Base speed
    this.baseSpeed = 6;
    this.speed = this.baseSpeed;
    this.maxSpeed = 15;
    this.speedIncrement = 0.5;
    
    // Random initial direction
    const angle = this.getRandomStartAngle();
    this.velocityX = Math.cos(angle) * this.speed;
    this.velocityY = Math.sin(angle) * this.speed;
    
    // Track last paddle hit for scoring
    this.lastHitBy = null;
  }
  
  /**
   * Get a random starting angle (avoiding too vertical)
   * @returns {number} Angle in radians
   */
  getRandomStartAngle() {
    // Random angle between -45 and 45 degrees, or 135 and 225 degrees
    const side = Math.random() < 0.5 ? 0 : Math.PI;
    const spread = (Math.random() - 0.5) * (Math.PI / 2); // -45 to +45 degrees
    return side + spread;
  }
  
  /**
   * Update ball position and handle collisions
   * @param {number} dt - Delta time in milliseconds
   * @param {Paddle} paddle1 - Left paddle
   * @param {Paddle} paddle2 - Right paddle
   * @returns {string|null} - 'left' or 'right' if scored, null otherwise
   */
  update(dt, paddle1, paddle2) {
    // Move ball
    this.x += this.velocityX;
    this.y += this.velocityY;
    
    // Wall collision (top/bottom)
    if (this.y - this.radius <= 0) {
      this.y = this.radius;
      this.velocityY = -this.velocityY;
    }
    if (this.y + this.radius >= CANVAS_HEIGHT) {
      this.y = CANVAS_HEIGHT - this.radius;
      this.velocityY = -this.velocityY;
    }
    
    // Paddle collision
    this.checkPaddleCollision(paddle1);
    this.checkPaddleCollision(paddle2);
    
    // Score detection (ball exits left or right)
    if (this.x + this.radius < 0) {
      return 'right'; // Player 2 scores
    }
    if (this.x - this.radius > CANVAS_WIDTH) {
      return 'left'; // Player 1 scores
    }
    
    return null;
  }
  
  /**
   * Check and handle collision with a paddle
   * @param {Paddle} paddle
   */
  checkPaddleCollision(paddle) {
    const bounds = paddle.getBounds();
    
    // Check if ball overlaps paddle
    if (
      this.x - this.radius < bounds.right &&
      this.x + this.radius > bounds.left &&
      this.y - this.radius < bounds.bottom &&
      this.y + this.radius > bounds.top
    ) {
      // Determine which side we hit
      if (paddle.side === 'left') {
        // Hit left paddle - bounce right
        this.x = bounds.right + this.radius;
        this.velocityX = Math.abs(this.velocityX);
      } else {
        // Hit right paddle - bounce left
        this.x = bounds.left - this.radius;
        this.velocityX = -Math.abs(this.velocityX);
      }
      
      // Calculate bounce angle based on where ball hit paddle
      const paddleCenter = paddle.getCenterY();
      const hitOffset = (this.y - paddleCenter) / (paddle.height / 2);
      
      // Adjust Y velocity based on hit position (-1 to 1)
      // Hitting edge = more angle, hitting center = straighter
      const maxBounceAngle = Math.PI / 3; // 60 degrees max
      const bounceAngle = hitOffset * maxBounceAngle;
      
      // Increase speed on each hit (up to max)
      this.speed = Math.min(this.speed + this.speedIncrement, this.maxSpeed);
      
      // Set new velocity based on angle and speed
      const direction = this.velocityX > 0 ? 1 : -1;
      this.velocityX = direction * Math.cos(bounceAngle) * this.speed;
      this.velocityY = Math.sin(bounceAngle) * this.speed;
      
      // Add a bit of the paddle's velocity for spin effect
      this.velocityY += paddle.velocity * 0.3;
      
      // Track who hit it last
      this.lastHitBy = paddle.side;
    }
  }
  
  /**
   * Render the ball
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  
  /**
   * Get ball info for debug display
   * @returns {Object}
   */
  getDebugInfo() {
    return {
      x: this.x.toFixed(0),
      y: this.y.toFixed(0),
      vx: this.velocityX.toFixed(2),
      vy: this.velocityY.toFixed(2),
      speed: this.speed.toFixed(2)
    };
  }
}
