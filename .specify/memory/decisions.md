# Architecture Decisions Log

**Project:** AI Pong  
**Maintained by:** Skippy the Magnificent

---

## Decision 001: Vanilla JavaScript vs Framework (2026-02-07)

**Context:** Needed to choose frontend technology stack.

**Decision:** Use vanilla HTML5 Canvas + JavaScript (no frameworks).

**Rationale:**
- Pong is simple enough that React/Vue would add unnecessary complexity
- No build tools means faster iteration and simpler debugging
- Keeps dependencies minimal (easier to maintain)
- Canvas API is perfect for 2D game rendering
- Educational value: shows that modern frameworks aren't always needed

**Alternatives Considered:**
- React: Overkill for this use case, adds build complexity
- Phaser.js: Game framework would work but adds dependency weight
- Three.js: 3D library, unnecessary for 2D pong

**Status:** Approved by planning phase (Opus 4.5)

---

## Decision 002: Express for Static Serving (2026-02-07)

**Context:** Need lightweight server to serve game files.

**Decision:** Use Node.js + Express with minimal configuration.

**Rationale:**
- Express is battle-tested and stable
- Minimal setup (just static file serving)
- Could extend later for WebSocket multiplayer
- Standard choice, easy for others to understand
- Single dependency keeps it simple

**Alternatives Considered:**
- Python SimpleHTTPServer: Works but less extensible
- nginx: Overkill for development, would need separate setup
- No server (file://): CORS issues, not realistic deployment

**Status:** Approved by planning phase (Opus 4.5)

---

## Decision 003: 800x600 Canvas Resolution (2026-02-07)

**Context:** Need to choose game resolution.

**Decision:** 800x600px (4:3 aspect ratio).

**Rationale:**
- Classic Pong was 4:3 aspect ratio
- 800x600 is large enough to see clearly but not overwhelming
- Fits comfortably on most screens without scrolling
- Retro aesthetic matches the game
- Easy to scale if needed later

**Alternatives Considered:**
- 1920x1080: Too large, harder to play (more paddle travel)
- 640x480: Too small for modern screens
- 16:9 aspect: Less authentic to original Pong

**Status:** Approved by planning phase (Opus 4.5)

---

## Decision 004: Port Configuration via .env (2026-02-07)

**Context:** Server needs configurable port, but must not expose infrastructure details in repo.

**Decision:** Use .env file for port configuration (gitignored), provide .env.example template.

**Rationale:**
- Follows constitution.md security rules (no IPs/ports in repo)
- Standard practice for Node.js apps
- Easy to change without code modifications
- .env.example provides clear template for setup

**Alternatives Considered:**
- Hardcode port: Violates constitution, inflexible
- Command line args: Less convenient, not persistent
- Config file committed: Security risk

**Status:** Approved by planning phase (Opus 4.5)

---

## Decision 005: Model Selection Strategy (2026-02-07)

**Context:** Need to optimize cost and quality across planning and development.

**Decision:**
- Planning: Claude Opus 4.5 (deep thinking, architecture)
- Development: GPT-4o-mini (fast, free, great at code)

**Rationale:**
- Opus for planning leverages its superior reasoning for architecture decisions
- GPT-4o-mini is free with Copilot and excellent at code generation
- Matches existing pattern (gpt-4o-mini for cron jobs)
- Saves premium model usage for where it matters most

**Status:** Approved by Stephen (2026-02-07)

---

*This log will be updated as new architectural decisions are made during development.*
