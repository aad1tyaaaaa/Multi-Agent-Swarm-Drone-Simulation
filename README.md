<div align="center">

<!-- ANIMATED BANNER -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a0f1e,50:1a56ff,100:00f5ff&height=200&section=header&text=SWARM%2F%2FOS&fontSize=72&fontColor=ffffff&fontAlignY=38&desc=Multi-Agent%20Drone%20Swarm%20Simulation&descAlignY=58&descSize=20&animation=fadeIn" width="100%"/>

<!-- TYPING ANIMATION -->
<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=22&pause=1000&color=00F5FF&center=true&vCenter=true&width=700&lines=Real-Time+Swarm+Intelligence+Dashboard;12-Drone+Autonomous+Coordination;ACO+%7C+PSO+%7C+Reinforcement+Learning;Built+with+Next.js+%2B+TypeScript+%2B+Framer+Motion" alt="Typing SVG" />
</a>

<br/>

<!-- BADGES ROW 1 -->
<img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white"/>

<br/>

<!-- BADGES ROW 2 -->
<img src="https://img.shields.io/badge/Framer_Motion-✓-ff0055?style=for-the-badge&logo=framer&logoColor=white"/>
<img src="https://img.shields.io/badge/Radix_UI-✓-8b5cf6?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Recharts-✓-22c55e?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white"/>

<br/><br/>

<!-- DEMO PREVIEW PLACEHOLDER -->
> **🚁 A cinematic, real-time mission control dashboard for a fleet of 12 autonomous drones — powered by swarm intelligence algorithms, simulated telemetry, and a performance-first frontend architecture.**

<br/>

</div>

---

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/swarm-os.git
cd swarm-os

# Install dependencies (pnpm recommended)
pnpm install

# Start development server
pnpm dev
```

Open **[http://localhost:3000](http://localhost:3000)** — mission control is live.

---

## 🗺️ Table of Contents

- [Overview](#-overview)
- [Live Features](#-live-features)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Simulation Model](#-simulation-model)
- [UI Composition](#-ui-composition)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🧠 Overview

**SwarmOS** is a single-page, real-time mission control interface for visualizing and interacting with a fleet of 12 autonomous drones. Built for performance, the app simulates swarm intelligence behaviors — cooperative mapping, search & rescue coordination, collision avoidance — entirely on the client side, with no backend dependencies.

The UI is composed as a full-screen **ops dashboard** backed by a live simulation engine, styled with a dark military-grade aesthetic, and animated with Framer Motion for a production-quality feel.

```
┌─────────────────────────────────────────────────────────┐
│                    MISSION CONTROL                       │
│  ┌──────────────┐ ┌───────────────────┐ ┌────────────┐  │
│  │  Fleet Panel │ │   Live Map Canvas │ │  Telemetry │  │
│  │  (12 drones) │ │  (ACO / PSO / RL) │ │    Feed    │  │
│  └──────────────┘ └───────────────────┘ └────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## ✨ Live Features

<table>
<tr>
<td width="50%">

### 🚁 Drone Simulation
- **12-drone fleet** with real-time position, heading, speed & battery state
- Boundary-aware movement with **wrapping logic**
- Battery drain → status transitions: `active` → `idle` → `critical`
- Per-drone algorithm tags: **ACO** · **PSO** · **RL**

### 🗺️ Mission Map
- Animated drone markers with directional indicators
- **Collision proximity detection** with visual alerts
- Algorithm color-coded drone states
- Fog-of-war style zone exploration

</td>
<td width="50%">

### 📡 Telemetry & Logging
- Rolling **system event log** (collision, algorithm, status events)
- Real-time efficiency score updates
- Fleet-wide health aggregation
- Timestamped entries with auto-scroll

### ⚙️ Simulation Controls
- **Pause / Resume** simulation runtime toggle
- Dynamic battery and status transitions
- Collision event triggers with log entries
- Responsive layout with **Framer Motion** micro-interactions

</td>
</tr>
</table>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                         │
│                                                              │
│   ┌──────────────────────────────────────────────────────┐  │
│   │              SimulationContext (lib/)                 │  │
│   │  • 12-drone state array                              │  │
│   │  • requestAnimationFrame simulation loop             │  │
│   │  • Telemetry event emitter                           │  │
│   │  • Collision detection engine                        │  │
│   └──────────────────┬───────────────────────────────────┘  │
│                       │  React Context API                   │
│         ┌─────────────┼──────────────┐                       │
│         ▼             ▼              ▼                       │
│   ┌──────────┐ ┌──────────────┐ ┌──────────┐               │
│   │  Fleet   │ │  Mission Map │ │Telemetry │               │
│   │  Status  │ │   Canvas     │ │  Panel   │               │
│   └──────────┘ └──────────────┘ └──────────┘               │
│                                                              │
│   ┌──────────────────────────────────────────────────────┐  │
│   │         Framer Motion · Recharts · Radix UI           │  │
│   └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Data flow is entirely unidirectional** — the simulation context owns all state, dispatches updates on each tick, and React re-renders only the components that consume changed slices.

---

## 📁 Project Structure

```
swarm-os/
│
├── app/
│   ├── layout.tsx              # Root layout, metadata, font config
│   ├── page.tsx                # Page composition & section ordering
│   └── globals.css             # CSS custom properties, keyframe animations
│
├── components/
│   ├── hero-section.tsx        # Product-style landing hero
│   ├── dashboard-section.tsx   # Three-panel mission control layout
│   ├── drone-fleet-status.tsx  # Per-drone health, battery, algorithm tags
│   ├── live-mission-map.tsx    # Animated map canvas with drone markers
│   ├── telemetry-panel.tsx     # Scrolling real-time event log
│   ├── stats-section.tsx       # Bento grid performance statistics
│   ├── tech-stack-section.tsx  # Technology showcase
│   ├── footer-section.tsx      # CTA and project links
│   └── ui/                     # Radix-based primitive components
│
└── lib/
    └── simulation-context.tsx  # Core simulation engine & React context
```

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | SSR, routing, build optimization |
| **Language** | TypeScript 5 | Type safety across simulation state |
| **UI Library** | React 19 | Component model & hooks |
| **Styling** | Tailwind CSS 4 | Utility-first dark theme |
| **Primitives** | Radix UI | Accessible headless components |
| **Animation** | Framer Motion | Page transitions & drone motion |
| **Charting** | Recharts | Algorithm performance charts |
| **Icons** | Lucide React | Consistent icon system |
| **Utilities** | clsx · tailwind-merge · CVA | Class management |
| **Analytics** | Vercel Analytics | Production-only usage tracking |
| **Package Manager** | pnpm | Fast, disk-efficient installs |

</div>

---

## 🔬 Simulation Model

All simulation logic lives in `lib/simulation-context.tsx` and runs entirely client-side. No network calls, no WebSockets — pure deterministic(ish) browser computation.

### Drone State Schema

```typescript
type DroneState = {
  id: string;                          // "D-01" through "D-12"
  position: { x: number; y: number }; // Normalized 0–100 coordinates
  heading: number;                     // Degrees 0–360
  speed: number;                       // Units/tick
  battery: number;                     // 0–100, drains per tick
  status: "active" | "idle" | "critical" | "offline";
  algorithm: "ACO" | "PSO" | "RL";    // Swarm intelligence label
  trail: Array<{ x: number; y: number }>; // Last N positions
};
```

### Simulation Tick (runs every ~100ms)

```
Each tick:
  1. Update all drone positions (heading + speed + boundary wrap)
  2. Drain battery by algorithm-weighted delta
  3. Evaluate status transitions (active → idle → critical)
  4. Run pairwise collision proximity check
  5. If collision → emit telemetry event + trigger reroute animation
  6. Append new log entry (system / algorithm / collision type)
  7. Recalculate fleet-wide efficiency score
  8. Dispatch updated state → React re-render
```

### Algorithm Behavior (Simulated)

| Algorithm | Visual Cue | Simulated Behavior |
|---|---|---|
| **ACO** (Ant Colony) | Purple trail overlay | Follows high-traffic pheromone paths |
| **PSO** (Particle Swarm) | Velocity vectors | Converges toward global best position |
| **RL** (Reinforcement Learning) | Q-value heatmap | Maximizes zone coverage reward |

---

## 🖥️ UI Composition

The main `page.tsx` renders sections in this order:

```tsx
<HeroSection />          {/* Product landing — drone visual, key stats, CTA */}
<DashboardSection>       {/* Full-screen ops center */}
  <DroneFleetStatus />   {/*   Left:   12-drone health panel */}
  <LiveMissionMap />     {/*   Center: animated map canvas */}
  <TelemetryPanel />     {/*   Right:  scrolling event log */}
</DashboardSection>
<StatsSection />         {/* Bento grid — coordination rate, rescue count, etc. */}
<TechStackSection />     {/* Technology showcase with hover glows */}
<FooterSection />        {/* GitHub CTA, docs link, license */}
```

> The dashboard defaults to **dark mission-control theme** with no light mode toggle — by design.

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|---|---|
| Node.js | `>= 20.x` |
| pnpm | `>= 8.x` (recommended) |
| npm | `>= 10.x` (alternative) |

### Installation

```bash
# Using pnpm (recommended)
pnpm install

# Using npm
npm install
```

### Development

```bash
pnpm dev      # http://localhost:3000 — hot reload enabled
```

### Production

```bash
pnpm build    # Optimized production bundle
pnpm start    # Serve production build locally
```

---

## 📜 Available Scripts

```bash
pnpm dev      # Start Next.js dev server with Turbopack
pnpm build    # Type-check + build production bundle
pnpm start    # Serve built output on port 3000
pnpm lint     # Run ESLint across all source files
```

---

## 🗺️ Roadmap

```
Phase 1 — Core Simulation (✅ Complete)
  ✅ 12-drone fleet with real-time state loop
  ✅ Collision detection and avoidance logging
  ✅ Algorithm labeling (ACO / PSO / RL)
  ✅ Telemetry feed with event types
  ✅ Pause / Resume controls

Phase 2 — Simulation Depth (🔄 In Progress)
  ⬜ Deterministic simulation mode (seeded randomness for replay)
  ⬜ Controls for fleet size, speed, and algorithm distribution
  ⬜ Zone-aware cooperative mapping with fog-of-war reveal
  ⬜ Search & rescue target generation and completion tracking

Phase 3 — Data & Persistence (📋 Planned)
  ⬜ Persist telemetry sessions to localStorage
  ⬜ Mission history with playback scrubber
  ⬜ Export mission log as JSON / CSV

Phase 4 — Advanced Visualization (📋 Planned)
  ⬜ Real geospatial tile integration (Mapbox / Leaflet)
  ⬜ 3D isometric map view toggle
  ⬜ Live pheromone trail rendering for ACO
  ⬜ PSO convergence animation with velocity vectors

Phase 5 — Quality & Scale (📋 Planned)
  ⬜ Unit + integration tests for simulation logic
  ⬜ E2E tests for critical UI flows (Playwright)
  ⬜ WebSocket adapter for real ROS2 telemetry bridge
  ⬜ Multi-mission session management
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/deterministic-simulation

# 3. Commit your changes
git commit -m "feat: add seeded randomness for replay mode"

# 4. Push to the branch
git push origin feature/deterministic-simulation

# 5. Open a Pull Request
```

**Before submitting:**
- Run `pnpm lint` — zero lint errors required
- Run `pnpm build` — must compile without TypeScript errors
- Keep simulation logic isolated in `lib/simulation-context.tsx`
- Keep UI components pure — no direct state mutation outside context

---

## 📄 License

This project currently has **no license file**. If you plan to open-source or distribute this project, add a `LICENSE` file to the repository root.

Recommended options:
- **MIT** — maximum permissiveness, attribution required
- **Apache 2.0** — patent protection included
- **GPL-3.0** — copyleft, derivative works must stay open

---

<div align="center">

<!-- FOOTER WAVE -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00f5ff,50:1a56ff,100:0a0f1e&height=120&section=footer" width="100%"/>

**Built with obsessive attention to detail · Powered by swarm intelligence · Deployed on Vercel**

<br/>

<img src="https://img.shields.io/badge/ROS2-Humble-22314e?style=flat-square&logo=ros&logoColor=white"/>
<img src="https://img.shields.io/badge/Gazebo-Simulation-f58113?style=flat-square"/>
<img src="https://img.shields.io/badge/Python-3.11-3776ab?style=flat-square&logo=python&logoColor=white"/>
<img src="https://img.shields.io/badge/OpenCV-4.x-5c3ee8?style=flat-square&logo=opencv&logoColor=white"/>

<br/><br/>

*The universe nudged toward optimization algorithms. We obliged.* 🫠

</div>