/**
 * AI Pong - Visual Effects
 * Particle system and visual juice
 * 
 * Created by: Skippy the Magnificent
 */

class Particle {
  constructor(x, y, vx, vy, life, color, size) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.life = life;
    this.maxLife = life;
    this.color = color;
    this.size = size;
  }
  
  update(dt) {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= dt;
    this.vy += 0.1; // Gravity
    this.vx *= 0.99; // Friction
  }
  
  render(ctx) {
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.fillStyle = this.color.replace('1)', `${alpha})`);
    ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
  }
  
  isDead() {
    return this.life <= 0;
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
  }
  
  /**
   * Create burst of particles at position
   */
  burst(x, y, count, color) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
      const speed = 2 + Math.random() * 4;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const life = 300 + Math.random() * 400;
      const size = 3 + Math.random() * 4;
      
      this.particles.push(new Particle(x, y, vx, vy, life, color, size));
    }
  }
  
  /**
   * Create trail particles
   */
  trail(x, y, color) {
    const vx = (Math.random() - 0.5) * 2;
    const vy = (Math.random() - 0.5) * 2;
    const life = 100 + Math.random() * 100;
    const size = 2 + Math.random() * 2;
    
    this.particles.push(new Particle(x, y, vx, vy, life, color, size));
  }
  
  update(dt) {
    this.particles = this.particles.filter(p => {
      p.update(dt);
      return !p.isDead();
    });
  }
  
  render(ctx) {
    this.particles.forEach(p => p.render(ctx));
  }
  
  clear() {
    this.particles = [];
  }
}

// Global particle system
const particles = new ParticleSystem();
