# AI Pong - Game Development Plan

**Created:** 2026-02-07  
**Planning Model:** Claude Opus 4.5  
**Developer:** Skippy the Magnificent  
**Project Owner:** Stephen

---

## 🎯 Project Vision

Build a classic Pong game that's playable in a web browser, demonstrating AI-driven development from planning through deployment. The game should be:

- **Simple & Clean:** Classic pong mechanics, no unnecessary complexity
- **Performant:** Smooth 60 FPS gameplay
- **Accessible:** Works in any modern browser, no plugins needed
- **Extensible:** Architecture allows for future features (AI opponent, multiplayer, etc.)

---

## 🏗️ Architecture Overview

### Technology Stack

**Frontend:**
- HTML5 Canvas for rendering
- Vanilla JavaScript (ES6+) for game logic
- CSS for minimal UI styling
- No frameworks or build tools required

**Backend:**
- Node.js + Express for static file serving
- Port configured via environment variable
- Minimal dependencies (express only)

**Project Structure:**
```
ai-pong/
├── public/
│   ├── index.html          # Main game page
│   ├── js/
│   │   ├── game.js         # Game loop & state management
│   │   ├── paddle.js       # Paddle class & logic
│   │   ├── ball.js         # Ball physics & collision
│   │   ├── score.js        # Score tracking & display
│   │   └── input.js        # Keyboard/mouse input handling
│   ├── css/
│   │   └── style.css       # Minimal styling
│   └── assets/             # (Future: sounds, images)
├── server.js               # Express server
├── package.json
├── .env.example            # Template for configuration
├── .gitignore
├── .specify/
│   ├── game-plan.md        # This document
│   ├── memory/
│   │   ├── constitution.md # Security rules
│   │   └── decisions.md    # Architecture decisions log
│   └── scripts/
│       ├── deploy.sh       # Deployment script
│       └── README.md
└── README.md
```

---

## 🎮 Game Mechanics

### Core Features (MVP)

1. **Two Paddles**
   - Left paddle: Player 1 (W/S keys)
   - Right paddle: Player 2 (Arrow Up/Down keys)
   - Smooth movement with velocity-based physics
   - Collision detection with screen boundaries

2. **Ball Physics**
   - Constant horizontal velocity (starts random direction)
   - Vertical velocity affected by paddle collision angle
   - Speed increases slightly on each paddle hit (up to max)
   - Perfect elastic collisions with top/bottom walls
   - Ball resets to center after scoring

3. **Scoring System**
   - Point awarded when ball exits left/right boundary
   - First to 11 wins (configurable)
   - Score displayed at top center
   - Game over screen with restart option

4. **Game Loop**
   - 60 FPS target using requestAnimationFrame
   - Delta time for consistent physics across framerates
   - Pause/resume with spacebar
   - Restart with R key

### Visual Design

- **Canvas:** 800x600px (4:3 aspect ratio, classic)
- **Color Scheme:**
  - Background: #000000 (black)
  - Paddles: #FFFFFF (white)
  - Ball: #FFFFFF (white)
  - Net (optional): Dashed line down center
  - Score: #FFFFFF (white, retro font)
- **Retro Aesthetic:** Clean, minimal, classic Pong look

---

## 🚀 Development Milestones

### Phase 1: Foundation (Branch: `feature/game-foundation`)
**Goal:** Get basic server running and canvas rendering

**Tasks:**
- [ ] Initialize Node.js project with Express
- [ ] Create .gitignore (node_modules, .env, etc.)
- [ ] Create .env.example with PORT template
- [ ] Build minimal Express server serving static files
- [ ] Create index.html with canvas element
- [ ] Set up canvas context and clear screen
- [ ] Basic CSS for centered canvas
- [ ] Test server runs and serves page

**Deliverable:** Empty canvas displays in browser at configured port

---

### Phase 2: Game Loop (Branch: `feature/game-loop`)
**Goal:** Implement core game loop and rendering pipeline

**Tasks:**
- [ ] Create game.js with GameState class
- [ ] Implement requestAnimationFrame loop
- [ ] Add delta time calculation
- [ ] Add FPS counter (debug mode)
- [ ] Implement pause/resume (spacebar)
- [ ] Add basic render pipeline
- [ ] Test loop runs at stable 60 FPS

**Deliverable:** Game loop running, can pause/resume, FPS stable

---

### Phase 3: Paddles (Branch: `feature/paddles`)
**Goal:** Implement paddle rendering, movement, and collision

**Tasks:**
- [ ] Create Paddle class with position, velocity, dimensions
- [ ] Add render method (draw rectangle)
- [ ] Implement keyboard input handling (W/S, Up/Down)
- [ ] Add velocity-based movement with acceleration/deceleration
- [ ] Implement boundary collision (keep paddles on screen)
- [ ] Test smooth movement and responsiveness
- [ ] Add paddle speed configuration

**Deliverable:** Two paddles move smoothly with keyboard input

---

### Phase 4: Ball Physics (Branch: `feature/ball-physics`)
**Goal:** Implement ball movement, collisions, and bouncing

**Tasks:**
- [ ] Create Ball class with position, velocity, radius
- [ ] Add render method (draw circle)
- [ ] Implement constant horizontal movement
- [ ] Add wall collision detection (top/bottom)
- [ ] Implement ball-paddle collision detection
- [ ] Add velocity modification based on paddle hit location
- [ ] Implement speed increase on paddle hit (capped)
- [ ] Add ball reset logic
- [ ] Test collision accuracy and physics feel

**Deliverable:** Ball bounces off walls and paddles with proper physics

---

### Phase 5: Scoring System (Branch: `feature/scoring`)
**Goal:** Implement score tracking, win conditions, and game states

**Tasks:**
- [ ] Create Score class for tracking points
- [ ] Add score rendering (centered text)
- [ ] Implement point award on ball exit
- [ ] Add ball reset after scoring
- [ ] Implement win condition (first to 11)
- [ ] Create game state machine (PLAYING, PAUSED, GAME_OVER)
- [ ] Add game over screen with winner display
- [ ] Implement restart functionality (R key)
- [ ] Test full game flow from start to win to restart

**Deliverable:** Complete playable game with scoring and win conditions

---

### Phase 6: Polish & UX (Branch: `feature/polish`)
**Goal:** Add finishing touches for better player experience

**Tasks:**
- [ ] Add center dashed net line
- [ ] Improve font rendering for scores
- [ ] Add visual feedback on paddle collision (optional)
- [ ] Add start screen with instructions
- [ ] Implement countdown before ball launch (3-2-1)
- [ ] Add keyboard controls reference on screen
- [ ] Performance optimization pass
- [ ] Cross-browser testing
- [ ] Mobile responsive check (optional)

**Deliverable:** Polished, professional-looking Pong game

---

### Phase 7: Deployment (Branch: `feature/deployment`)
**Goal:** Create deployment scripts and documentation

**Tasks:**
- [ ] Write deployment script (.specify/scripts/deploy.sh)
- [ ] Document server setup process
- [ ] Create systemd service file (optional, for auto-restart)
- [ ] Add monitoring/health check endpoint
- [ ] Document environment configuration
- [ ] Update README with play instructions
- [ ] Final security review (no secrets in repo)

**Deliverable:** Deployment scripts and documentation complete

---

## 🎨 Future Enhancements (Post-MVP)

These are ideas for after the core game is complete:

1. **Single Player Mode**
   - AI opponent with difficulty levels
   - Predictive ball tracking algorithm

2. **Sound Effects**
   - Paddle hit sound
   - Wall bounce sound
   - Score sound
   - Win/lose jingles

3. **Visual Effects**
   - Particle effects on collision
   - Screen shake on hard hits
   - Ball trail effect

4. **Multiplayer**
   - WebSocket-based real-time multiplayer
   - Lobby system
   - Spectator mode

5. **Customization**
   - Color themes
   - Ball/paddle skins
   - Speed/difficulty settings
   - Custom win score

6. **Statistics**
   - Match history
   - Win/loss tracking
   - Longest rally counter

---

## 🔒 Security & Best Practices

### Security Rules (from constitution.md)
- ✅ Never commit .env files (use .env.example templates)
- ✅ No API keys, tokens, or secrets in code
- ✅ No IP addresses or server details in repo
- ✅ Use environment variables for all configuration

### Code Quality Standards
- **ES6+ JavaScript:** Use modern syntax (const/let, arrow functions, classes)
- **Modular Design:** Separate concerns (game loop, physics, rendering)
- **Comments:** Explain complex logic, not obvious code
- **Naming:** Clear, descriptive variable/function names
- **Error Handling:** Graceful degradation on errors
- **Performance:** Profile and optimize render loop

### Git Workflow
- **Feature Branches:** One feature per branch
- **Pull Requests:** All changes via PR for review
- **Commit Messages:** Clear, descriptive (present tense)
- **No Force Push:** Keep history clean but intact

---

## 📊 Success Metrics

**Technical:**
- [ ] Consistent 60 FPS on modern browsers
- [ ] No memory leaks during extended play
- [ ] Works on Chrome, Firefox, Safari, Edge
- [ ] Server starts and runs without errors
- [ ] Zero security vulnerabilities in dependencies

**Gameplay:**
- [ ] Responsive controls (no input lag)
- [ ] Fair physics (predictable ball behavior)
- [ ] Clear visual feedback on all actions
- [ ] Intuitive UI (no confusion on how to play)

**Process:**
- [ ] All code reviewed via PRs
- [ ] No secrets leaked to repo
- [ ] Documentation kept up to date
- [ ] Clean commit history

---

## 🛠️ Development Model Selection

- **Planning:** Claude Opus 4.5 (this document)
- **Coding:** GPT-4o-mini (fast, free, excellent at code generation)
- **PR Reviews:** Claude Sonnet 4.5 (if needed for review assistance)

---

## 📝 Next Steps

1. **Review this plan with Stephen**
   - Get approval on architecture
   - Confirm milestones make sense
   - Adjust if needed

2. **Start Phase 1: Foundation**
   - Switch to GPT-4o-mini for development
   - Create feature branch
   - Implement basic server
   - Open first PR

3. **Iterate through phases**
   - Complete each milestone
   - PR for each feature
   - Get approval before merging
   - Update memory/decisions.md with learnings

---

**This plan is a living document. Updates and adjustments will be made as development progresses.**
