/**
 * AI Pong - Sound Effects
 * Web Audio API sound generation (no external files needed)
 * 
 * Created by: Skippy the Magnificent
 */

class SoundManager {
  constructor() {
    this.enabled = true;
    this.audioContext = null;
    this.initialized = false;
  }
  
  /**
   * Initialize audio context (must be called from user interaction)
   */
  init() {
    if (this.initialized) return;
    
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.initialized = true;
      console.log('🔊 Sound initialized');
    } catch (e) {
      console.warn('Audio not available:', e);
      this.enabled = false;
    }
  }
  
  /**
   * Toggle sound on/off
   */
  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
  
  /**
   * Play a beep sound
   */
  playTone(frequency, duration, type = 'square', volume = 0.3) {
    if (!this.enabled || !this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }
  
  /**
   * Paddle hit sound
   */
  paddleHit() {
    this.playTone(440, 0.1, 'square', 0.2);
  }
  
  /**
   * Wall hit sound
   */
  wallHit() {
    this.playTone(300, 0.05, 'square', 0.15);
  }
  
  /**
   * Score sound
   */
  score() {
    this.playTone(220, 0.3, 'sawtooth', 0.3);
  }
  
  /**
   * Win sound (ascending notes)
   */
  win() {
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.2, 'square', 0.25), i * 150);
    });
  }
  
  /**
   * Game start sound
   */
  start() {
    this.playTone(660, 0.1, 'square', 0.2);
  }
}

// Global sound manager
const sound = new SoundManager();
