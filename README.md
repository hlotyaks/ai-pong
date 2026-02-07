# 🏓 AI Pong

A classic Pong game **built entirely by AI** through conversation.

No human wrote any of this code. Every line was created by Skippy the Magnificent (an AI assistant) through conversation with Stephen.

## 🎮 Play Now

**[Play AI Pong](https://hlotyaks.github.io/ai-pong/)** ← Click to play!

## ✨ Features

- **Two-player local multiplayer** - Challenge a friend!
- **Smooth 60 FPS gameplay** with delta-time physics
- **Velocity-based paddle movement** - Natural acceleration and friction
- **Dynamic ball physics** - Bounce angle based on paddle hit position
- **Ball speed increases** with each paddle hit
- **Sound effects** - Synthesized with Web Audio API (no external files)
- **Particle effects** - Collision bursts and ball trails
- **Retro styling** - Scanline overlay and CRT vibes
- **First to 11 wins** - Full scoring system with game over screen

## 🕹️ Controls

| Action | Player 1 (Left) | Player 2 (Right) |
|--------|-----------------|------------------|
| Move Up | W | ↑ Arrow |
| Move Down | S | ↓ Arrow |

### Other Controls
- **SPACE** - Start / Pause game
- **M** - Toggle sound
- **D** - Toggle debug overlay
- **R** - Reset game

## 🚀 Run Locally

```bash
# Clone the repo
git clone https://github.com/hlotyaks/ai-pong.git
cd ai-pong

# Install dependencies
npm install

# Create .env file with port
echo "PORT=8888" > .env

# Start server
npm start

# Open http://localhost:8888
```

## 🛠️ Tech Stack

- **Frontend:** Vanilla JavaScript, HTML5 Canvas
- **Backend:** Express.js (static file serving only)
- **Sound:** Web Audio API (synthesized, no audio files)
- **Styling:** Pure CSS with retro effects

No frameworks. No build tools. Just clean, simple code.

## 📁 Project Structure

```
ai-pong/
├── public/
│   ├── css/
│   │   └── style.css      # Retro styling
│   ├── js/
│   │   ├── ball.js        # Ball physics
│   │   ├── effects.js     # Particle system
│   │   ├── game.js        # Main game loop
│   │   ├── input.js       # Keyboard handling
│   │   ├── paddle.js      # Paddle class
│   │   ├── score.js       # Score management
│   │   └── sound.js       # Web Audio sounds
│   └── index.html         # Main page
├── server.js              # Express server
├── package.json
└── README.md
```

## 🤖 How This Was Built

This entire project was created through a conversation between Stephen and Skippy (an AI assistant running on OpenClaw). The development process:

1. **Planning** - AI proposed architecture and phased approach
2. **Phase 1** - Server and canvas setup
3. **Phase 2** - Game loop with 60 FPS rendering
4. **Phase 3** - Paddle implementation with physics
5. **Phase 4** - Ball physics and collision detection
6. **Phase 5** - Scoring system and win conditions
7. **Phase 6** - Polish (sound, particles, visual effects)
8. **Phase 7** - Documentation and deployment

Each phase was a separate PR that Stephen reviewed before merging.

## 📜 License

MIT

---

*Created by Skippy the Magnificent* 🍺
