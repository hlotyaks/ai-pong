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
    this.x = CANVAS_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2;
    
    this.baseSpeed = 6;
    this.speed = this.baseSpeed;
    this.maxSpeed = 15;
    this.speedIncrement = 0.5;
    
    const angle = this.getRandomStartAngle();
    this.velocityX = Math.cos(angle) * this.speed;
    this.velocityY = Math.sin(angle) * this.speed;
    
    this.lastHitBy = null;
    this.trailCounter = 0;
  }
  
  getRandomStartAngle() {
    const side = Math.random() < 0.5 ? 0 : Math.PI;
    const spread = (Math.random() - 0.5) * (Math.PI / 2);
    return side + spread;
  }
  
  update(dt, paddle1, paddle2) {
    this.x += this.velocityX;
    this.y += this.velocityY;
    
    // Trail effect at high speed
    this.trailCounter += dt;
    if (this.speed > 8 && this.trailCounter > 20) {
      this.trailCounter = 0;
      if (typeof particles !== 'undefined') {
        particles.trail(this.x, this.y, 'rgba(255, 255, 255, 1)');
      }
    }
    
    // Wall collision
    if (this.y - this.radius <= 0) {
      this.y = this.radius;
      this.velocityY = -this.velocityY;
      if (typeof sound !== 'undefined') sound.wallHit();
      if (typeof particles !== 'undefined') {
        particles.burst(this.x, this.radius, 5, 'rgba(100, 100, 255, 1)');
      }
    }
    if (this.y + this.radius >= CANVAS_HEIGHT) {
      this.y = CANVAS_HEIGHT - this.radius;
      this.velocityY = -this.velocityY;
      if (typeof sound !== 'undefined') sound.wallHit();
      if (typeof particles !== 'undefined') {
        particles.burst(this.x, CANVAS_HEIGHT - this.radius, 5, 'rgba(100, 100, 255, 1)');
      }
    }
    
    // Paddle collision
    if (this.checkPaddleCollision(paddle1)) {
      if (typeof sound !== 'undefined') sound.paddleHit();
      if (typeof particles !== 'undefined') {
        particles.burst(this.x, this.y, 8, 'rgba(255, 200, 100, 1)');
      }
    }
    if (this.checkPaddleCollision(paddle2)) {
      if (typeof sound !== 'undefined') sound.paddleHit();
      if (typeof particles !== 'undefined') {
        particles.burst(this.x, this.y, 8, 'rgba(255, 200, 100, 1)');
      }
    }
    
    // Score detection
    if (this.x + this.radius < 0) {
      if (typeof sound !== 'undefined') sound.score();
      return 'right';
    }
    if (this.x - this.radius > CANVAS_WIDTH) {
      if (typeof sound !== 'undefined') sound.score();
      return 'left';
    }
    
    return null;
  }
  
  checkPaddleCollision(paddle) {
    const bounds = paddle.getBounds();
    
    if (
      this.x - this.radius < bounds.right &&
      this.x + this.radius > bounds.left &&
      this.y - this.radius < bounds.bottom &&
      this.y + this.radius > bounds.top
    ) {
      if (paddle.side === 'left') {
        this.x = bounds.right + this.radius;
        this.velocityX = Math.abs(this.velocityX);
      } else {
        this.x = bounds.left - this.radius;
        this.velocityX = -Math.abs(this.velocityX);
      }
      
      const paddleCenter = paddle.getCenterY();
      const hitOffset = (this.y - paddleCenter) / (paddle.height / 2);
      const maxBounceAngle = Math.PI / 3;
      const bounceAngle = hitOffset * maxBounceAngle;
      
      this.speed = Math.min(this.speed + this.speedIncrement, this.maxSpeed);
      
      const direction = this.velocityX > 0 ? 1 : -1;
      this.velocityX = direction * Math.cos(bounceAngle) * this.speed;
      this.velocityY = Math.sin(bounceAngle) * this.speed;
      this.velocityY += paddle.velocity * 0.3;
      
      this.lastHitBy = paddle.side;
      return true;
    }
    return false;
  }
  
  render(ctx) {
    // Glow effect at high speed
    if (this.speed > 10) {
      const glowSize = (this.speed - 10) * 2;
      const gradient = ctx.createRadialGradient(
        this.x, this.y, this.radius,
        this.x, this.y, this.radius + glowSize
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius + glowSize, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  
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
