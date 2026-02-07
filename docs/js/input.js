/**
 * AI Pong - Input Handler
 * Handles keyboard input for paddle control
 * 
 * Created by: Skippy the Magnificent
 */

const Input = {
  // Currently pressed keys
  keys: {},
  
  // Key bindings
  bindings: {
    // Player 1 (Left paddle)
    player1Up: 'KeyW',
    player1Down: 'KeyS',
    
    // Player 2 (Right paddle)
    player2Up: 'ArrowUp',
    player2Down: 'ArrowDown'
  },
  
  /**
   * Initialize input handlers
   */
  init() {
    document.addEventListener('keydown', (e) => this.onKeyDown(e));
    document.addEventListener('keyup', (e) => this.onKeyUp(e));
  },
  
  /**
   * Handle key down event
   * @param {KeyboardEvent} event
   */
  onKeyDown(event) {
    this.keys[event.code] = true;
    
    // Prevent default for arrow keys (avoid page scrolling)
    if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      event.preventDefault();
    }
  },
  
  /**
   * Handle key up event
   * @param {KeyboardEvent} event
   */
  onKeyUp(event) {
    this.keys[event.code] = false;
  },
  
  /**
   * Check if a key is currently pressed
   * @param {string} code - Key code
   * @returns {boolean}
   */
  isPressed(code) {
    return this.keys[code] === true;
  },
  
  /**
   * Check if player 1 is pressing up
   * @returns {boolean}
   */
  isPlayer1Up() {
    return this.isPressed(this.bindings.player1Up);
  },
  
  /**
   * Check if player 1 is pressing down
   * @returns {boolean}
   */
  isPlayer1Down() {
    return this.isPressed(this.bindings.player1Down);
  },
  
  /**
   * Check if player 2 is pressing up
   * @returns {boolean}
   */
  isPlayer2Up() {
    return this.isPressed(this.bindings.player2Up);
  },
  
  /**
   * Check if player 2 is pressing down
   * @returns {boolean}
   */
  isPlayer2Down() {
    return this.isPressed(this.bindings.player2Down);
  }
};
