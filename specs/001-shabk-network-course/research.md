# Technical Research & Architecture Decisions: Shabk

**Feature**: Shabk — Persian Interactive Network+ Learning Platform  
**Branch**: `001-shabk-network-course`  
**Date**: 2026-09-15  

---

## 1. Frontend Framework & Tooling

### Decision
**React 19 + TypeScript + Vite**

### Rationale
- **Fidelity to Reference Platform**: The reference platform (`persian-docker-learning-platform`) is built on React 19 with a Vite build system. Adopting this stack ensures identical reactivity, rendering speed, and component lifecycle behavior.
- **Strict Typing for Network Models**: Computer networking domain entities (32-bit IPv4 octets, binary bit manipulation, MAC addresses, ARP tables, TCP flags, ICMP packets) benefit heavily from TypeScript's discriminated unions and strict type safety.
- **Ultra-Fast Development & Static Optimization**: Vite provides sub-second hot module replacement (HMR), tree-shaking, and minified production bundles (<150KB gzip for initial page load), easily deployable as pure static files.
- **Zero-Backend Architecture**: All business logic (IP calculation, packet traversal, CLI simulation, progress tracking) runs entirely in the client browser with zero API latency, zero hosting cost, and 100% privacy.

### Alternatives Considered
- *Next.js (App Router)*: Overkill for a static educational client app; introduces unnecessary server runtime concepts and complex static export configuration (`output: 'export'`) with no benefit over Vite.
- *Vanilla JavaScript*: Too cumbersome for managing complex interactive state machines (e.g. switch CAM tables, terminal command history, multi-step troubleshooting labs).
- *Svelte / Vue*: Excellent performance, but departs from the exact architecture and component primitives demonstrated in the reference platform.

---

## 2. Styling, Typography & RTL Design System

### Decision
**Tailwind CSS with Custom Persian & Networking Design Tokens + Vazirmatn & JetBrains Mono Fonts**

### Rationale
- **Visual Parity**: Replicates the reference platform's warm parchment aesthetic (`#f8f5ee` background, `#faf8f5` cards, `#0f1f33` typography, crisp border contrasts `#e2e8f0` / `#cbd5e1`).
- **RTL-First with Strict LTR Technical Isolation**: Persian is native RTL (`dir="rtl"` at root level). Technical entities (IP addresses like `192.168.1.1`, CIDR masks like `/24`, MAC addresses `00:1A:2B:3C:4D:5E`, port numbers, code blocks, and terminal commands) must be isolated with strict LTR boundaries (`dir="ltr"` / `unicode-bidi: isolate`) to prevent character flipping and punctuation inversion.
- **Typography Pairing**:
  - Persian prose & headings: `Vazirmatn` (weights 300, 400, 500, 600, 700, 800, 900) via Google Fonts / WOFF2.
  - Code, terminal, and networking data units: `JetBrains Mono` (weights 400, 500, 700).
- **Network Protocol Color Palette**:
  - Primary Blue (`#0284c7` / `#38bdf8`): Layer 3 IP, Packets, Routing.
  - Emerald Green (`#059669` / `#10b981`): Layer 4 TCP Handshake ACK, Valid Subnets, Success.
  - Amber/Gold (`#d97706` / `#f59e0b`): Layer 2 ARP Broadcasts, Switch CAM floods, Warnings.
  - Purple/Indigo (`#7c3aed` / `#818cf8`): Layer 7 Applications, DNS, DHCP.
  - Rose/Red (`#e11d48` / `#f43f5e`): Collisions, Dropped Packets, Diagnostic Errors.

### Alternatives Considered
- *Pure CSS / CSS Modules*: Lacks the rapid utility-first composition needed for dozens of interactive widget variations and dark mode transitions.
- *Heavy UI Component Libraries (AntD / MUI)*: Too opinionated, heavy bundle size (>400KB), and difficult to style to match the custom warm aesthetic of the Persian Docker reference site.

---

## 3. In-Browser Terminal & Hybrid Network Simulation Engine

### Decision
**Pure TypeScript Hybrid Simulation Engine (Stateful Host L2/L3 + Deterministic Topology Paths)**

### Rationale
- **Dynamic Stateful Host Operations**:
  - `ipconfig`, `ifconfig`, `ip a`: Reads and writes directly to the virtual host's network interface configuration (IP address, subnet mask, default gateway, DNS server).
  - `arp -a`, `arp -d`: Dynamically tracks IP-to-MAC resolution history; sending frames dynamically adds entries; cache timeouts and clear commands mutate state immediately.
  - `ping <target>`: Evaluates whether the target IP resides on the local subnet (bitwise AND with subnet mask). If local, it performs an ARP resolution for the target MAC; if remote, it checks if a Default Gateway is configured. If reachable, it outputs authentic ICMP round-trip times and TTLs.
- **Deterministic Multi-Hop Topologies**:
  - `tracert <target>` / `traceroute <target>`: Traverses pre-configured multi-hop routing paths defined per lab scenario, displaying realistic router hops, hostnames, and millisecond latencies.
  - `nslookup <target>` / `dig <target>`: Queries the virtual scenario's DNS server zone table to return A/CNAME records.
- **Cross-Platform Dual Aliases**: Seamlessly accepts both Windows CMD syntax and Linux Bash syntax with educational tooltips.

### Alternatives Considered
- *Full WebAssembly Linux Kernel (v86 / WebVM)*: Massive bundle size (>20MB), slow boot times (5–10s), complex networking emulation, and impossible to inspect/debug step-by-step for educational visualization.
- *Pure String Matching (Regex only)*: Too brittle; breaks when learners change host settings or enter commands in non-standard order.

---

## 4. State Management & Data Portability

### Decision
**Lightweight Reactive Store (Zustand or React Context + Custom Hooks) with LocalStorage & JSON/Base64 Export**

### Rationale
- **Lightweight (<2KB)**: Zero overhead; handles fast reactive updates when marking lessons complete, answering quizzes, or advancing terminal labs.
- **Local Persistence**: Automatically saves:
  - Completed lesson IDs
  - Module assessment scores and best attempts
  - Unlocked troubleshooting lab states
  - Terminal history and custom preferences (Dark/Light theme)
- **Data Portability (Zero-Backend Cloud Alternative)**:
  - One-click "خروجی کارنامه" (Download JSON backup or copy 64-character encoded backup code).
  - One-click "بازیابی کارنامه" (Upload JSON or paste code) with cryptographic validation check.

### Alternatives Considered
- *Redux Toolkit*: Unnecessary boilerplate and bundle overhead for a single-page educational application.
- *Remote Database / Firebase / Supabase*: Violates the user's explicit "zero backend, static, client-side" requirement and introduces authentication friction for Persian learners.

---

## 5. Deployment & Hosting Strategy

### Decision
**GitHub Pages with GitHub Actions CI/CD Pipeline**

### Rationale
- **Zero Cost & High Reliability**: Native static site hosting with global CDN distribution.
- **Single Command Build**: `vite build` outputs static HTML, CSS, and JS to `dist/`.
- **SPA Path Handling**: Configured with Vite `base: './'` or `/shabk/` for repo hosting, plus a lightweight client-side routing fallback (`404.html` redirect) to prevent routing breaks on deep links.

---

## 6. High-Yield Interactive Enhancements for Shabk

### Enhancements Designed for Network+ Mastery:
1. **Interactive 8-Bit Octet Binary Flipper**:
   - A row of 8 interactive bit switches (`128, 64, 32, 16, 8, 4, 2, 1`).
   - Toggling bits dynamically updates the binary string (`11000000`) and computed decimal sum (`192`), giving learners immediate intuition for CIDR masks.
2. **Interactive T568A / T568B RJ45 Cable Wiring Game**:
   - Drag-and-drop or click-to-order the 8 colored wires (White-Orange, Orange, White-Green, Blue, White-Blue, Green, White-Brown, Brown).
   - Demonstrates the difference between Straight-Through (same standard both ends) and Crossover (T568A on one end, T568B on the other).
3. **Animated Packet Header Dissector**:
   - Visual breakdown of IPv4 Header (Version, IHL, Total Length, TTL, Protocol, Header Checksum, Source IP, Dest IP) and TCP Header (Source Port, Dest Port, Sequence Number, Ack Number, Flags: SYN/ACK/FIN/RST).
   - Clicking any field opens a plain-Persian explanation of its purpose in real-world networking.
4. **Switch CAM Table Learning Interactive Playground**:
   - Virtual network topology with PC1, PC2, PC3 connected to a central Switch.
   - Learner sends a frame from PC1 to PC2; the simulator illustrates the Switch recording PC1's MAC on Port 1, broadcasting out Ports 2 & 3, and PC2 replying to update Port 2.
5. **Printable Persian Network+ Cheatsheet Drawer (جعبه‌ابزار شبکه)**:
   - Floating drawer accessible anywhere in the app with:
     - Well-Known Ports Table (0–1023)
     - CIDR Slash-to-Subnet-Mask quick reference (/8 to /30)
     - Private IP address blocks (Class A, B, C, APIPA, Loopback)
     - Essential CLI diagnostic commands summary
