# Implementation Plan: Shabk — Persian Interactive Network+ Learning Platform

**Branch**: `001-shabk-network-course` | **Date**: 2026-09-15 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-shabk-network-course/spec.md`

## Summary

Build **شبک** (*Shabk*), an interactive, client-side educational platform in Persian for mastering CompTIA Network+ concepts based on Mohandes Rajaei's 124-page curriculum. The application replicates the warm, distraction-free aesthetic and high-engagement pedagogy of `persian-docker-learning-platform`, utilizing a 100% static, client-side architecture (React 19, TypeScript, Vite, Tailwind CSS) deployable to GitHub Pages with zero backend dependencies.

The platform provides 8 structured learning modules, an in-browser diagnostic CLI terminal simulator (`ping`, `tracert`, `ipconfig`, `arp`, `netstat`, `nslookup`), an interactive IPv4 Subnetting Sandbox with binary octet flippers, visual mental model simulators (OSI/DoD stack, Switch CAM learning, TCP 3-Way Handshake), guided troubleshooting labs with unlock gating, dual-mode quizzes (Study vs. Exam), and zero-backend progress persistence with JSON export/import.

## Technical Context

**Language/Version**: TypeScript 5.7+ / ECMAScript 2022+ / React 19.x  
**Primary Dependencies**: 
- `react`, `react-dom` (v19.x): Core component model and reactive rendering
- `vite` (v6.x): High-speed build tool and static asset bundler
- `tailwindcss` (v3.4+ / v4.x): Utility-first CSS engine with RTL and custom theme extensions
- `lucide-react`: Lightweight, accessible SVG networking and UI icons
- `canvas-confetti`: Micro-celebrations on quiz and lab completions

**Storage**: Browser `localStorage` with JSON state export and 64-character encoded backup code import/export.  
**Testing**: Vitest for pure TypeScript networking math, packet simulation, and state persistence; React Testing Library for component integration.  
**Target Platform**: Modern evergreen web browsers (Desktop, Tablet, Mobile: Chrome, Firefox, Safari, Edge) running statically on GitHub Pages.  
**Project Type**: Client-Side Single Page Application (Static Web).  
**Performance Goals**: 
- Initial static load: < 2.0s on standard broadband.
- Client-side simulation reactions (terminal command execution, packet animation, bit flipper): < 50ms.
- Total production gzip bundle: < 180KB.

**Constraints**:
- Zero backend requirement (static hosting only).
- Native RTL layout with strict LTR isolation for IP addresses, CIDR notation, and CLI syntax.
- Offline-resilient operation via client-side architecture.

**Scale/Scope**:
- 8 Modules, 32+ detailed lessons derived from the 124-page Persian booklet.
- 5 Interactive visualizers (OSI Stack, Packet Traversal, Switch CAM Table, TCP Handshake, Binary Octet Flipper).
- 1 Subnetting Sandbox + Rapid Calculation Drill game.
- 4 Guided hands-on troubleshooting labs.
- 8 Module assessments with dual-mode (Study/Exam) support.
- 1 Searchable & printable Persian Network+ cheatsheet drawer.

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle / Gate | Compliance Status | Justification |
| :--- | :---: | :--- |
| **I. Library-First** | **PASS** | Core network logic (`lib/network/ipv4.ts`, `lib/network/simulator.ts`, `lib/network/cam-table.ts`) is decoupled into pure, independently testable TypeScript libraries without React UI dependencies. |
| **II. CLI Interface Protocol** | **PASS** | The in-browser terminal uses a clean text in/out protocol (command string → stdout lines, stderr lines, exit status) matching real OS network tools. |
| **III. Test-First (TDD)** | **PASS** | Subnetting math (network ID, broadcast, host ranges, bitwise masks) and simulation state machines have dedicated test suites defending observable invariants before UI integration. |
| **IV. Integration Testing** | **PASS** | Lab scenarios and terminal flows are validated end-to-end via automated command sequence tests. |
| **V. Simplicity & YAGNI** | **PASS** | No heavyweight virtualization, no remote server databases, no complex multi-container scaffolding. 100% lightweight client-side execution. |

*Gate Result*: **ALL GATES PASS**.

---

## Project Structure

### Documentation (this feature)

```text
specs/001-shabk-network-course/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
│   ├── terminal-simulator.json
│   ├── subnet-engine.json
│   ├── course-schema.json
│   └── progress-export.json
└── checklists/
    └── requirements.md  # Spec quality checklist
```

### Source Code (repository root)

```text
src/
├── assets/
│   └── fonts/                     # Font definitions & stylesheets
├── components/
│   ├── layout/                    # Shell, Header, Sidebar, Drawer, ThemeToggle, ProgressBar
│   ├── content/                   # LessonRenderer, MarkdownViewer, CheatsheetDrawer
│   ├── visualizers/               # Interactive widgets
│   │   ├── OsiStackInspector.tsx  # Layer 1-7 vs. DoD 4 layers inspector
│   │   ├── PacketFlowAnimator.tsx # Host A -> Switch -> Router -> Host B packet journey
│   │   ├── CamTableSandbox.tsx    # Switch MAC learning & broadcast simulation
│   │   ├── TcpHandshakeViewer.tsx # SYN, SYN-ACK, ACK interactive state machine
│   │   ├── BinaryOctetFlipper.tsx # 8-bit visual decimal-to-binary calculator
│   │   └── CableWiringGame.tsx    # RJ45 T568A / T568B pinout crimping tool
│   ├── terminal/
│   │   ├── TerminalWindow.tsx     # Shell window, prompt, auto-scroll
│   │   ├── TerminalOutput.tsx     # Formatted CLI outputs (ping, traceroute, ipconfig)
│   │   └── CommandSuggestions.tsx # Contextual help and auto-complete hints
│   ├── subnetting/
│   │   ├── SubnetCalculator.tsx   # Visual CIDR slider, octet breakdown, host ranges
│   │   └── RapidDrillGame.tsx     # Timed/scored subnetting practice with explanations
│   ├── labs/
│   │   ├── LabViewer.tsx          # Scenario brief, topology overview, hints
│   │   ├── TopologyGraph.tsx      # SVG/canvas interactive node status map
│   │   └── LabFeedbackBanner.tsx  # Success/verification celebration banner
│   ├── quiz/
│   │   ├── QuizContainer.tsx      # Question card, option list, timer
│   │   ├── ModeToggle.tsx         # Study Mode vs. Exam Mode switch
│   │   └── ScoreReportModal.tsx   # Diagnostic summary and unlock triggers
│   └── ui/                        # Reusable atomic UI components (Button, Card, Badge, Modal, Tooltip)
├── data/
│   ├── modules/                   # 8 Module content definitions in Persian
│   │   ├── module-1-foundations.ts
│   │   ├── module-2-physical-media.ts
│   │   ├── module-3-datalink-switching.ts
│   │   ├── module-4-ipv4-subnetting.ts
│   │   ├── module-5-resolution-diagnostics.ts
│   │   ├── module-6-transport-ports.ts
│   │   ├── module-7-network-services.ts
│   │   └── module-8-security-nat.ts
│   ├── labs/                      # 4 Troubleshooting lab configurations
│   └── cheatsheet/                # Ports, protocols, and CIDR reference data
├── lib/
│   ├── network/                   # Pure TypeScript domain libraries
│   │   ├── ipv4.ts                # Bitwise IP math, CIDR conversion, range derivation
│   │   ├── simulator.ts           # Stateful network node, interface, ARP table, ping logic
│   │   ├── cam-table.ts           # Switch MAC table simulation logic
│   │   └── protocols.ts           # Packet structures, headers, flags
│   ├── storage/
│   │   └── progress-store.ts      # LocalStorage persistence, backup export/import
│   └── utils/
│       ├── bidi.ts                # LTR/RTL text helpers and formatting
│       └── confetti.ts            # Celebration trigger
├── types/                         # Shared TypeScript interfaces
│   ├── course.ts
│   ├── network.ts
│   ├── terminal.ts
│   └── progress.ts
├── App.tsx                        # Main application layout and router
├── main.tsx                       # React application entry point
└── index.css                      # Tailwind base, typography & theme styles

tests/
├── unit/
│   ├── ipv4.test.ts               # 100% coverage on subnetting and bitwise math
│   ├── simulator.test.ts          # State mutations for ping, arp, and ipconfig
│   └── storage.test.ts            # Import/export integrity & schema validation
└── integration/
    ├── terminal-flow.test.ts      # Scenario diagnostics execution
    └── quiz-gating.test.ts        # Module completion score gating logic
```

**Structure Decision**: Single modular static web project layout. All domain networking logic resides under `src/lib/network/` as decoupled, pure TypeScript libraries fulfilling the Library-First principle. All UI components are modularized under `src/components/`, while data content is statically bundled under `src/data/` for instantaneous, zero-latency access.

---

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

*No violations detected. Zero unnecessary dependencies or complexity layers.*
