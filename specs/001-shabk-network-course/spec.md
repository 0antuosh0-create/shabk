# Feature Specification: Shabk — Persian Interactive Network+ Learning Platform

**Feature Branch**: `001-shabk-network-course`

**Created**: 2026-09-15

**Status**: Draft

**Input**: User description: "I want you to build an educational course based on the PDF located at C:\Users\ALL DIGITAL\Desktop\Shabk\NetWork +.pdf, using the UI, styling, and design inspired by https://0antuosh0-create.github.io/persian-docker-learning-platform/. Make sure it's not just pure theory, but genuinely practical and high-yield, and keep the course content in Persian and i want to name it Shabk. Enhancements: 1. UI/UX, Animations & Background Delight (interactive dynamic packet nodes, floating network topology particles, polished micro-interactions, celebrations); 2. Content Depth & Completeness (audit chapters against Network+ notes, expand shallow lessons with practical CLI examples, real-world terminal usage, intuitive Persian analogies); 3. Bug Fixes & Functional QA (walkthrough, verify buttons, layout, quiz scoring, LocalStorage state sync)."

## Clarifications

### Session 2026-09-15

- Q: Should the in-browser terminal and lab simulator use a stateful in-memory network engine or a scenario-based scripted output model? (FR-006) → A: Hybrid Engine (Dynamic stateful simulation for host configuration and Layer 2/3 queries like ipconfig, arp, and ping, combined with deterministic topology path definitions for multi-hop tools like tracert and nslookup).
- Q: Should course navigation allow open access across all modules from the start, or require sequential completion to unlock subsequent topics? (FR-011) → A: Hybrid Guided Flow (All conceptual lessons and sandboxes are accessible openly without restriction, while advanced hands-on troubleshooting labs and scenario challenges unlock upon passing the corresponding module quiz with >=70% score).
- Q: Should the in-browser terminal simulator accept both Windows and Linux command syntax via dual aliases, or strictly follow Windows command conventions? (FR-006) → A: Dual Cross-Platform Aliases (Terminal supports both Windows and Linux equivalents such as ipconfig/ifconfig/ip a and tracert/traceroute, providing valid simulated output along with educational cross-platform notes).
- Q: Should the platform provide an offline progress export and import mechanism to allow transferring study state across devices? (FR-011) → A: JSON File & Code String Export/Import (Learners can export their progress as a downloadable JSON file or copy a compact backup string to seamlessly restore on any device without server accounts).
- Q: How should end-of-module quizzes handle retries and answer feedback for learners? (FR-009) → A: Dual-Mode (Study vs. Exam) (Learners can toggle between "Study Mode" with instant per-question feedback and unlimited attempts, and "Exam Mode" which is timed with delayed score reveals and no in-flight hints to simulate real certification pressure).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Interactive Conceptual Learning & Mental Model Exploration (Priority: P1)

A Persian-speaking technology learner wants to master computer networking concepts systematically from the provided Network+ curriculum without drowning in dry, passive text. When navigating through the Shabk platform, the learner accesses rich, structured Persian lessons accompanied by interactive, visual mental models (such as the OSI 7-layer stack, packet encapsulation/decapsulation flows, and switch MAC learning).

**Why this priority**: The foundational educational content and intuitive visual mental models form the core value of the platform. Without clear, high-yield conceptual lessons, no subsequent simulation or drill delivers meaningful learning.

**Independent Test**: Can be fully tested by navigating through any course module (e.g., OSI vs. DoD reference models), toggling through layer descriptions, inspecting header data units, and verifying that the explanatory Persian content accurately conveys the networking principles.

**Acceptance Scenarios**:

1. **Given** a learner opens the course platform at the home/overview page, **When** they select "فصل ۱: مبانی شبکه و مدل‌های مرجع" (Module 1: Network Fundamentals & Reference Models), **Then** the platform displays the curriculum outline, estimated reading time, learning objectives, and clear Persian explanatory prose with English technical terms preserved.
2. **Given** a learner is viewing the OSI 7-Layer section, **When** they click on a specific layer (e.g., "لایه انتقال / Transport"), **Then** the interactive visualizer highlights that layer, reveals its Protocol Data Unit (Segment), shows corresponding protocols (TCP, UDP), and displays its encapsulation role with animated visual cues.
3. **Given** a learner completes a conceptual lesson, **When** they scroll to the bottom, **Then** a "درس بعدی" (Next Lesson) navigation trigger guides them smoothly to the next sequential topic while preserving their progress.

---

### User Story 2 - In-Browser Hands-on Terminal Simulator & Command Practice (Priority: P2)

A learner needs hands-on familiarity with essential networking diagnostic CLI commands (such as `ping`, `tracert`/`traceroute`, `ipconfig`, `arp`, `netstat`, and `nslookup`) so they can translate theory into real-world engineering skills without needing to configure physical hardware or external lab environments.

**Why this priority**: Network engineering cannot be mastered purely through theory. Immediate CLI execution within a simulated network environment bridges the critical gap between understanding a concept and applying it.

**Independent Test**: Can be fully tested by launching the embedded terminal simulator, entering standard network diagnostic commands, and verifying that the simulated output matches real operating system behavior and displays relevant network statistics.

**Acceptance Scenarios**:

1. **Given** a learner is inside a diagnostic lab, **When** they enter `ping 8.8.8.8` into the interactive terminal, **Then** the terminal renders authentic ICMP echo request and reply lines showing bytes, round-trip times in milliseconds, TTL values, and packet loss statistics.
2. **Given** a learner investigates cross-subnet communication, **When** they execute `arp -a`, **Then** the terminal outputs a formatted ARP table listing IP addresses, physical MAC addresses, and allocation types (dynamic vs. static).
3. **Given** a learner types `tracert google.com` or `traceroute 8.8.8.8`, **When** the command executes, **Then** the terminal simulates realistic hop-by-hop router traversal, displaying incremental hop numbers, millisecond latencies, and intermediate router IP addresses.
4. **Given** a learner enters an unrecognized or malformed command, **When** they press Enter, **Then** the terminal returns a helpful, realistic error message along with available command suggestions.

---

### User Story 3 - Practical Subnetting Sandbox & Interactive Calculation Drills (Priority: P3)

A student preparing for networking roles struggles with IPv4 subnetting, binary octet calculations, and CIDR prefix math. The student opens Shabk's Subnetting Sandbox to experiment with CIDR sliders, view binary bit breakdowns in real time, and practice rapid calculation drills with instant feedback.

**Why this priority**: Subnetting is widely recognized as the single most challenging and high-yield topic in Network+ education. Providing a dedicated visual sandbox transforms an abstract calculation into an intuitive visual pattern.

**Independent Test**: Can be fully tested by manipulating the CIDR prefix slider, inputting arbitrary IPv4 addresses, and verifying that the calculated network ID, broadcast address, valid host range, and usable host count match mathematically correct subnetting rules.

**Acceptance Scenarios**:

1. **Given** a learner accesses the Subnetting Sandbox, **When** they enter IP `192.168.10.45` and select prefix `/26` (Mask `255.255.255.192`), **Then** the sandbox visually demonstrates the borrowed subnet bits vs. host bits, and calculates:
   - Network ID: `192.168.10.0`
   - Broadcast Address: `192.168.10.63`
   - Usable Host Range: `192.168.10.1` to `192.168.10.62`
   - Total Usable Hosts: `62` ($2^6 - 2$)
2. **Given** a learner starts a "چالش محاسبه سریع ساب‌نت" (Rapid Subnetting Drill), **When** presented with a random scenario (e.g., "Find the broadcast address for 172.16.50.0/22"), **Then** they can submit their answer and receive instant correctness verification, accompanied by a step-by-step Persian explanation of the calculation method.
3. **Given** a learner enters an invalid IP or prefix (e.g., octet > 255 or prefix > 32), **When** validating, **Then** the interface flags the exact invalid field with clear, friendly Persian guidance.

---

### User Story 4 - Scenario-Based Network Troubleshooting Labs & Knowledge Checks (Priority: P4)

A learner wants to test their diagnostic reasoning on realistic engineering problems (such as investigating why a host cannot access the internet, identifying a rogue DHCP server, resolving an IP address conflict, or diagnosing an incorrect default gateway).

**Why this priority**: Real-world proficiency requires holistic problem-solving rather than isolated memorization. Guided troubleshooting scenarios synthesize multiple networking layers into cohesive problem-solving tasks.

**Independent Test**: Can be fully tested by starting a troubleshooting scenario, performing diagnostic CLI inspections to discover the fault, submitting the root cause or configuration correction, and observing successful verification.

**Acceptance Scenarios**:

1. **Given** a learner initiates the "سناریوی قطعی ارتباط با اینترنت" (Internet Connectivity Outage Scenario), **When** they inspect the host configuration via `ipconfig` and ping the default gateway vs. an external IP, **Then** they discover the default gateway is set to a mismatched subnet IP.
2. **Given** the learner identifies the root cause, **When** they choose or configure the correct gateway address, **Then** the simulation confirms connectivity restoration with a success banner and a summary of the diagnostic takeaway.
3. **Given** a learner finishes a module, **When** they complete the end-of-module interactive quiz, **Then** the platform presents immediate scoring, detailed Persian rationales for every option, and highlights areas needing review.

---

### User Story 5 - Course Navigation, Progress Tracking & Persian RTL Aesthetic (Priority: P5)

A learner accesses the platform across multiple study sessions on desktop and mobile devices. They need an inviting, distraction-free interface inspired by modern Persian technical platforms, with clean typography (`Vazirmatn`), code font (`JetBrains Mono`), warm cream/slate palette, clear progress indicators, and automatic state preservation.

**Why this priority**: Sustained learner engagement depends on visual delight, comfortable reading ergonomics for Persian script, and friction-free resumption of previous study progress.

**Independent Test**: Can be fully tested by completing several lessons and drills, refreshing the browser or closing and reopening the tab, and verifying that completed statuses, scores, and active position are accurately restored.

**Acceptance Scenarios**:

1. **Given** a learner uses the platform on any modern viewport (mobile, tablet, or desktop), **When** browsing content, **Then** the UI renders in native RTL layout, typography renders crisp Vazirmatn font with comfortable line heights, and code snippets/terminals display in monospaced JetBrains Mono with proper LTR isolation.
2. **Given** a learner marks a lesson as completed, **When** viewing the sidebar or header progress bar, **Then** the progress percentage updates dynamically, reflecting their journey toward course completion.
3. **Given** a learner returns to the platform after closing the browser, **When** they reopen the application, **Then** their previously completed lessons, quiz scores, and dark/light theme preference persist seamlessly without requiring an account registration barrier.
4. **Given** a learner wants to transfer study progress to another device or browser, **When** they open Settings/Progress and select "خروجی کارنامه" (Export Progress), **Then** the platform provides a downloadable JSON backup file and a one-click copyable backup code string that can be imported on any other device via "بازیابی کارنامه" (Import Progress) with instantaneous verification and state restoration.
---

### User Story 6 - Immersive Delight, Visual Aesthetics & Deep Practical Guidance (Priority: P2)

A learner studying complex networking concepts wants an interface that feels alive, modern, and engaging rather than a dry static document. When studying, they experience an interactive, subtle network particle background with glowing packet nodes, smooth micro-interactions on cards and buttons, celebratory trophy badges upon mastering topics, and deep, comprehensive Persian lessons packed with real-world command outputs and memorable engineering analogies.

**Why this priority**: High visual delight, tactile micro-feedback, and rich conceptual depth dramatically boost learner retention, comprehension, and completion rates on self-paced educational platforms.

**Independent Test**: Can be verified by moving the cursor across the canvas to observe interactive network particle node connections, inspecting lessons for expanded real-world CLI examples and Persian analogies, and verifying celebratory badge pops upon lesson or quiz completion.

**Acceptance Scenarios**:

1. **Given** a learner opens the platform in either Light or Dark mode, **When** viewing any page, **Then** an interactive background renders floating network nodes and dynamic packet links that gently interact with mouse movement, while remaining subtle and non-distracting to reading.
2. **Given** a learner marks a lesson complete or passes a module assessment, **When** the action completes, **Then** an animated celebration badge modal with confetti and soundless micro-motion confirms their achievement.
3. **Given** a learner reads through any of the 8 modules, **When** reviewing lessons, **Then** every topic includes concrete CLI examples, terminal output snippets, and intuitive Persian analogies (e.g., postal letters for encapsulation, office extensions for NAT/PAT, phonebook for DNS).

---

### Edge Cases

- **Subnetting Boundary Conditions**: How does the subnetting engine handle edge prefixes such as `/31` (point-to-point RFC 3021 with 2 usable addresses, no traditional broadcast) and `/32` (single host route with 0 usable client host range)?
  - *Resolution*: The interface explicitly explains the RFC 3021 exception for `/31` in modern routing contexts while demonstrating why traditional formula ($2^h - 2$) yields 0 usable hosts, preventing learner confusion.
- **Terminal Simulator Command Edge Cases**: How does the simulated terminal react to rapid keystrokes, Ctrl+C interrupt signals, invalid flag arguments, or empty commands?
  - *Resolution*: Empty inputs advance a new prompt line cleanly; `Ctrl+C` halts ongoing simulated continuous pings; invalid flags output standard tool help menus (e.g., displaying valid flags for `ping` or `ipconfig`).
- **Mixed Bidirectional Typography (Bidi)**: How does the interface prevent Persian-English mixed text layout glitches when sentences interweave Persian verbs with Latin networking terms (e.g., `Default Gateway`, `3-Way Handshake`, `Broadcast Domain`)?
  - *Resolution*: All Latin terms, IP addresses, port numbers, and code blocks use strict LTR text direction wrappers (`dir="ltr"` / unicode isolation) embedded inside the native RTL Persian flow, ensuring punctuation and parentheses never flip erroneously.
- **Storage Availability**: What happens if a learner uses private/incognito browsing or has browser local storage disabled?
  - *Resolution*: The platform falls back gracefully to in-memory session state without throwing uncaught exceptions, and displays a subtle notification informing the user that progress will last for the active session only.
- **Responsive Layout for Complex Visualizers**: How do intricate interactive network topology diagrams and packet animation tracks render on narrow mobile screens?
  - *Resolution*: Visualizers feature responsive horizontal scrolling with touch-friendly pan/zoom and simplified stacked card alternatives on viewports under 640px.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001: Course Curriculum Architecture**: The platform MUST structure the 124-page Network+ body of knowledge into 8 coherent, progressive learning modules:
  1. *مبانی شبکه و مدل‌های مرجع (Network Fundamentals & Reference Models)*: DOD history, ARPANET, ISO/OSI 7 layers vs. DoD 4 layers, encapsulation/decapsulation, PDU types (Bits, Frames, Packets, Segments, Data).
  2. *رسانه‌های انتقال، کابل‌کشی و توپولوژی‌ها (Transmission Media, Cabling & Topologies)*: Coaxial (10Base2, 10Base5, BNC, Terminator), Twisted Pair (Cat1-Cat7, UTP/STP/FTP, RJ45 pinouts T568A/T568B, straight vs. crossover), Fiber Optic (Single-mode, Multi-mode, ST/SC/LC), Topologies (Star, Mesh, Ring, Bus), Physical devices (Hubs, Repeaters, NICs).
  3. *لایه پیوند داده، مک‌آدرس و سوئیچینگ (Data Link Layer, MAC Addressing & Switching)*: 48-bit MAC address structure (OUI + Vendor), switch architecture (manageable vs. unmanageable, Core Switch, Uplink ports), CAM MAC address table learning, frame flooding, broadcast domains vs. collision domains.
  4. *آدرس‌دهی شبکه IPv4 و زیرشبکه‌سازی (IPv4 Addressing, Subnetting & CIDR)*: IPv4 32-bit format, Classes A/B/C/D/E, Net ID vs. Host ID, default masks, Public vs. Private ranges (RFC 1918), APIPA (169.254.x.x), Loopback (127.0.0.1), Subnetting calculations ($2^s$ subnets, $2^h-2$ hosts), CIDR prefix notation, VLSM concepts.
  5. *پروتکل‌های تفکیک آدرس و عیب‌یابی لایه ۳ (Address Resolution & Layer 3 Diagnostics)*: ARP protocol mechanics (Broadcast Request, Unicast Reply), ARP cache (`arp -a`, `arp -d`), cross-subnet routing via Default Gateway MAC, ICMP error/query messages, TTL decrementing, routing hops.
  6. *لایه انتقال، پورت‌ها و سوکت‌ها (Transport Layer, Ports & Sockets)*: Multiplexing, TCP vs. UDP characteristics, TCP 3-Way Handshake (SYN, SYN-ACK, ACK), 4-Way Teardown (FIN/ACK), Sequence & Acknowledgment numbers, Flow control, Port ranges (Well-Known 0-1023, Registered 1024-49151, Dynamic 49152-65535), Sockets, `netstat` usage.
  7. *سرویس‌های بنیادین شبکه و لایه کاربرد (Core Network Services & Application Layer)*: DHCP operation (DORA: Discover, Offer, Request, Acknowledge), scopes, lease times, `ipconfig /release` and `/renew`; DNS hierarchy, recursive/iterative queries, DNS cache, `hosts` file, `nslookup`; Application protocols (HTTP/80, HTTPS/443, FTP/20-21, SSH/22, Telnet/23, SMTP/25, POP3/110, IMAP/143).
  8. *امنیت، فایروال و ترجمه آدرس شبکه (Security, Firewalls, NAT & PAT)*: NAT/PAT fundamentals, Source NAT, Destination NAT, Port Forwarding; Firewall types (Packet filtering L3/L4, Stateful inspection, Application Proxy L7); Network defense principles and basic authentication.

- **FR-002: Persian-First Instructional Design with Technical Accuracy**: All explanations, tutorials, visual captions, and problem statements MUST be authored in fluent, professional Persian, while maintaining standard English networking terminology, acronyms, and command syntaxes in clear visual contrast.
- **FR-003: Interactive OSI & Encapsulation Visualizer**: The platform MUST provide an interactive reference model component enabling learners to select any OSI layer to inspect its corresponding DoD layer, PDU name, header fields, common protocols, and real-world hardware devices.
- **FR-004: Interactive Packet Flow Simulator**: The platform MUST provide a visual packet traversal simulation demonstrating how data travels from an application on Host A, gets encapsulated with TCP, IP, and Ethernet headers, passes through switches (Layer 2 MAC lookup) and routers (Layer 3 IP lookup + MAC re-encapsulation), and arrives at Host B.
- **FR-005: Interactive Switch CAM Table Simulator**: The platform MUST offer an interactive switch laboratory where learners can trigger simulated frame transmissions between virtual nodes and witness the switch populate its MAC address table dynamically and perform broadcast floods on unknown destination MACs.
- **FR-006: In-Browser Network CLI Terminal & Dual-Platform Support**: The platform MUST implement a Hybrid Simulation Engine supporting both Windows and Linux diagnostic command syntax via dual aliases with cross-platform educational hints. Host configuration and Layer 2/3 operations operate dynamically on live in-memory state tables (ARP cache, interface IP/mask/gateway), while multi-hop tools traverse deterministic virtual topology paths defined per scenario. Supported commands include:
  - `ping [-t] [-n count] [-c count] <target>`: Simulates ICMP echo requests with latency, TTL, and summary statistics, reflecting live reachability based on subnet and gateway state.
  - `tracert <target>` / `traceroute <target>`: Simulates multi-hop router discovery with realistic intermediate IP hops based on the scenario's virtual topology graph (accepts both Windows and Unix syntax).
  - `ipconfig [/all] [/release] [/renew] [/flushdns] [/displaydns]` / `ifconfig` / `ip a`: Displays and dynamically mutates virtual interface network configurations, providing context notes explaining platform command differences.
  - `arp [-a] [-d]`: Displays and dynamically updates simulated ARP cache entries based on recent transmissions.
  - `netstat [-a] [-n]`: Displays simulated active TCP connections, listening sockets, and port states.
  - `nslookup <domain>` / `dig <domain>`: Queries simulated DNS server records, returning resolved IP mappings from the active scenario's DNS zone table.
  - `help` / `clear`: Provides command listing and screen clearing.
- **FR-007: Subnetting Calculator & Rapid Drill Engine**: The platform MUST feature an interactive subnetting engine that:
  - Dynamically calculates Network Address, Broadcast Address, First Usable Host, Last Usable Host, Total Usable Hosts, and Subnet Mask from any input IP and CIDR prefix.
  - Renders a visual 32-bit binary octet map separating network bits from host bits.
  - Generates timed or self-paced practice questions with step-by-step mathematical explanations upon submission.
- **FR-008: Guided Troubleshooting Lab Scenarios & Access Gating**: The platform MUST include at least 4 interactive troubleshooting scenarios depicting realistic network faults (e.g., Default Gateway misconfiguration, DNS outage, duplicate IP conflict, ARP table poisoning/mismatch), requiring learners to diagnose the issue via the simulated CLI and select or apply the corrective action. In accordance with the Hybrid Guided Flow, all conceptual lessons and calculators remain openly accessible, while advanced hands-on troubleshooting labs unlock upon achieving at least a 70% passing score on the corresponding module assessment.
- **FR-009: Knowledge Checks & Dual-Mode Assessments**: Every module MUST include interactive assessment questions (multiple-choice, matching, and fill-in-the-blank) supporting two distinct learner modes:
  - *Study Mode (حالت مطالعه و تمرین)*: Provides immediate option-by-option Persian rationales upon selection, instant correctness feedback, and unlimited retries with randomized option shuffling.
  - *Exam Mode (حالت شبیه‌ساز آزمون)*: Simulates formal certification conditions with a timed countdown, no in-flight hints or early answer reveals, and an end-of-test performance summary requiring at least 70% to achieve certified module completion and unlock corresponding troubleshooting labs.
- **FR-010: Design System & Styling Fidelity**: The user interface MUST faithfully reflect the design inspiration of `persian-docker-learning-platform`:
  - Warm, clean background palette (`#f8f5ee` / `#faf8f5`) with subtle slate/parchment surfaces and dark navy typography (`#0f1f33` / `#1e293b`).
  - Primary Persian font: `Vazirmatn` across all weights (300 to 900).
  - Code and CLI font: `JetBrains Mono` for terminal commands, headers, and IP addresses.
  - Native RTL directionality with smooth animations, clear active states, and pill badges for technical metadata.
  - Support for dark mode switching with persistent user selection.
- **FR-011: Local Progress Persistence, Gating & Data Portability**: The platform MUST automatically track and store the learner's progress (completed lessons, drill scores, unlocked and completed lab statuses, and theme preference) in browser storage without requiring registration or external server dependencies. Progress tracking MUST dynamically evaluate and persist lab unlock criteria based on module quiz scores. Additionally, the platform MUST offer a zero-backend export/import feature allowing users to download a JSON state snapshot or copy/paste a compact encrypted/encoded backup string to transfer progress across devices.
- **FR-012: Responsive Accessibility & Keyboard Navigation**: The platform MUST function across desktop, tablet, and mobile displays, providing responsive layouts, accessible contrast ratios, and keyboard navigation support for all interactive exercises.

---
- **FR-013: Dynamic Interactive Network Topology Background**: The application canvas MUST incorporate an interactive particle and link canvas system simulating network nodes, packet pulses, and dynamic connectivity meshes that respond smoothly to cursor proximity, automatically adapting to light/dark themes and respecting `prefers-reduced-motion`.
- **FR-014: Micro-Interactions, Routing Motion & Celebratory Feedback**: The UI MUST provide interactive feedback including smooth hover transitions on curriculum cards, animated packet pulses along simulated routes, accordion state transitions, and satisfying completion celebrations (trophy badge pops and confetti) when finishing lessons or passing assessments.
- **FR-015: Expanded Curriculum Depth & Real-World Analogies**: All 8 course modules MUST provide comprehensive depth based on the CompTIA Network+ curriculum and Mohandes Rajaei's booklet, incorporating:
  - Memorable Persian real-world analogies for abstract concepts (Encapsulation = multi-layered postal envelopes; Switches = sorting mailrooms; NAT/PAT = PBX phone extensions; DNS = contacts directory).
  - Explicit real-world CLI command examples with formatted outputs for `ping`, `tracert`, `ipconfig`, `arp`, `netstat`, and `nslookup`.
  - Troubleshooting practical tips for common real-world IT support and network administration tickets.
- **FR-016: Mobile Ergonomics, Responsive Touch Layout & Bottom Bar Navigation**: The user interface MUST provide a dedicated mobile-optimized layout for viewports under 640px. The mobile experience MUST feature zero horizontal body scroll leakage, touch target sizes meeting the minimum 44x44px standard, a fixed mobile bottom navigation bar providing one-tap access to primary tools (Curriculum, Subnetting, Terminal, Labs, Resources), and smooth slide-over drawers for chapter navigation.
- **FR-017: Comprehensive Educational References & Resource Hub ("مطالعه بیشتر")**: Every lesson MUST include a dedicated "مطالعه بیشتر و مراجع استاندارد" (Further Reading & Standard References) section citing relevant RFC documents (e.g. RFC 791 for IPv4, RFC 793 for TCP, RFC 826 for ARP, RFC 1918 for Private IPs, RFC 2131 for DHCP, RFC 1035 for DNS, RFC 3021 for /31 Point-to-Point), Cisco/IEEE whitepapers, and free hands-on practice recommendations (Wireshark, Cisco Packet Tracer). Additionally, the platform MUST offer a dedicated "منابع و مراجع" (Resources & References) view.
- **FR-018: Explicit Foundational Attribution**: The application footer and module catalog MUST clearly attribute the foundational syllabus to Mohandes Rajaei's Network+ instructional notes and CompTIA Network+ standards.
- **FR-019: Sidebar Multi-Line Wrapping & BiDi Isolation**: The course sidebar and accordion navigation rows MUST NOT truncate titles with ellipsis. Titles must wrap cleanly across multiple lines. English technical tokens (such as IPv4, DoD, UDP, ARP, NAT, TCP, OSI, CIDR) MUST be strictly wrapped in directional isolation (<bdi> / dir="ltr" / unicode-bidi: isolate) so parentheses, slashes (/), and numbers never invert or clip. Rows must be strictly ordered for RTL: Chapter index badge on the far right (start), chapter title in the center, and completed checkmark/chevron on the far left (end).
- **FR-020: Mobile Off-Canvas Drawer & Viewport Hardening (< 768px)**: On mobile viewports under 768px, the desktop sidebar MUST be replaced by a smooth slide-over off-canvas drawer with an interactive backdrop overlay, toggled cleanly by a hamburger button. The drawer, main shell, and all component cards must enforce overflow-x: hidden to eliminate any horizontal scroll leakage.
- **FR-021: Hands-on Active Learning Workspaces per Lesson**: Every lesson MUST provide an interactive active-learning workspace containing:
  - a) مینی چالش تحلیلی (Micro-Challenge): An immediate interactive task per lesson (e.g., protocol matcher, header builder, IP class identifier, or CLI sequence reordering) with instant correctness validation.
  - b) سناریوی عملی در دنیای واقعی (Real-world Debugging Scenario): A practical incident case study with realistic terminal outputs (ping, traceroute, tcpdump, netstat) and guided troubleshooting steps.
  - c) جعبه ابزار ذهنی و تمثیل مهندسی (Intuitive Engineering Analogy & Mental Model card).
- **FR-022: Multi-Modal Dynamic Assessments**: Module assessments MUST incorporate diverse question types beyond single-choice memorization:
  - a) سوالات شبیه‌سازی خط فرمان (Terminal Simulation Questions): The learner must identify or type the exact CLI command to resolve a network issue.
  - b) بازرس بسته و پرچم‌های TCP (Packet & Flag Inspectors): Identifying missing flags, sequence numbers, or calculating broadcast/usable host bounds.
  - c) تمرین‌های تطبیق و اتصال (Interactive Matching Drills): Connecting OSI layers to their respective PDUs, protocols, and hardware devices.
  - d) بازخورد عمیق آموزشی: Detailed pedagogical explanations for both correct and wrong choices.

---

### Key Entities


- **CourseModule (فصل آموزشی)**: Represents a major curriculum unit (1 of 8); attributes include unique identifier, numeric order, Persian title, English subtitle, description, estimated study duration, and list of constituent lessons.
- **Lesson (درس/مبحث)**: A focused conceptual topic within a module; attributes include identifier, title, Persian markdown/rich content, associated interactive visualizers, and completion status.
- **InteractiveVisualizer (ابزار بصری تعاملی)**: A client-side visual model (e.g., OSI Stack, Packet Encapsulation, Switch CAM Table, TCP Handshake); attributes include visualizer type, initial state, configurable parameters, and interactive event handlers.
- **VirtualNetworkNode (گره شبکه مجازی)**: An entity within simulated network topologies (Host, Switch, Router, Server); attributes include node name, IP address, MAC address, subnet mask, default gateway, ARP table, and interface port bindings.
- **TerminalCommand (دستور ترمینال)**: A command definition supported by the simulated CLI; attributes include command name, accepted flags, syntax documentation, validation logic, and simulated execution handler.
- **SubnetDrillScenario (چالش ساب‌نتینگ)**: A generated or curated subnetting problem; attributes include target IP, prefix, question prompt, expected answers (network, broadcast, host range, mask), and step-by-step Persian derivation.
- **TroubleshootingLab (آزمایشگاه عیب‌یابی)**: A guided diagnostic scenario; attributes include scenario title, background story, virtual network configuration with an injected fault, goal condition, diagnostic hints, and solution verification criteria.
- **QuizQuestion (سوال ارزیابی)**: An assessment item; attributes include question text, question type, answer options, correct answer index/value, and Persian explanatory rationale.
- **LearnerProgress (کارنامه و وضعیت کاربر)**: The persistent client-side state tracking completed lessons, completed troubleshooting labs, quiz scores, drill statistics, and UI preferences.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001: Curriculum Completeness**: 100% of the core networking topics covered in the 124-page source booklet are accurately represented across the 8 structured platform modules.
- **SC-002: Practical Engagement Ratio**: 100% of modules include at least one hands-on practical component (interactive visualizer, terminal drill, subnetting sandbox, or troubleshooting lab) ensuring zero purely passive reading modules.
- **SC-003: Subnetting Fluency Acceleration**: Learners who complete the Subnetting Sandbox and at least 5 practice drills achieve a successful calculation completion rate of over 80% on random IPv4 subnetting challenges.
- **SC-004: Troubleshooting Scenario Success**: Over 85% of learners are able to identify the simulated network fault within 5 minutes using the in-browser terminal commands (`ping`, `tracert`, `ipconfig`).
- **SC-005: Platform Performance & Responsiveness**: The platform loads initially in under 2.0 seconds on standard broadband connections and executes all client-side simulations (packet flow, terminal commands, subnet math) in under 100 milliseconds with zero server round-trip latency.
- **SC-006: Persian Reading Experience & Ergonomics**: Zero text clipping, proper bidirectional typography (LTR technical tokens smoothly embedded in RTL Persian paragraphs), and full legibility verified across desktop (1920x1080), tablet (768x1024), and mobile (375x812) viewports.
- **SC-007: Zero-Friction Progress Continuity**: 100% of user progress states (read lessons, quiz results, lab achievements) persist correctly across browser page reloads and browser restarts without requiring user account creation.
- **SC-008: Animation Performance & Frame Budget**: The dynamic particle background and micro-interactions MUST maintain a steady 60 FPS on standard viewports, with particle calculations consuming $< 3\%$ CPU and zero noticeable impact on terminal typing latency.
- **SC-009: Curriculum Depth Metric**: 100% of the 8 modules contain at least 4 detailed sub-lessons with practical Persian analogies, real-world terminal snippets, and troubleshooting key takeaways.
- **SC-010: Touch Target & Mobile Usability Standard**: 100% of interactive buttons, links, and switches on viewports under 640px meet the WCAG 44x44px minimum tap target standard with zero horizontal page scroll leakage.
- **SC-011: Reference Integrity & RFC Coverage**: 100% of lessons include verified RFC and international standard citations with recommended software links.

- **SC-012: Sidebar Ergonomics & BiDi Quality**: 100% of chapter and lesson titles in the sidebar wrap cleanly without ellipsis clipping, with zero inverted parentheses or corrupted BiDi numbers.
- **SC-013: Active Learning Density**: 100% of lessons feature an interactive micro-challenge and a real-world incident case study.
- **SC-014: Multi-Modal Assessment Variety**: Every module assessment includes at least two distinct question formats (matching drills, CLI simulation, or packet inspectors) alongside standard scenario questions.
---

## Assumptions

- **Target Audience**: Persian-speaking students, junior system administrators, web developers, DevOps trainees, and IT professionals seeking a solid, practical foundation in computer networking equivalent to CompTIA Network+.
- **Source Fidelity**: The core conceptual syllabus faithfully reflects the scope and pedagogical focus of Mohandes Rajaei's Network+ instructional booklet, while modernizing obsolete historical artifacts (such as Windows XP/7 screenshots and outdated dial-up references) into contemporary networking realities (IPv4/IPv6, modern Gigabit/10G switches, Wi-Fi 6, modern CLI tools).
- **Execution Environment**: The learning platform operates as a modern client-side single-page application capable of running completely offline or on static web hosting (e.g., GitHub Pages) without requiring specialized backend servers or container runtimes.
- **Browser Compatibility**: The platform targets evergreen modern web browsers supporting ES2022+, CSS Grid, Flexbox, and HTML5 Web Storage (Chrome, Firefox, Safari, Edge).
- **Scope Boundary for v1**: Advanced Layer 3 dynamic routing protocols (such as complex OSPF area configuration or BGP peering) are introduced conceptually as per Network+ standards, but deep protocol engine emulation is reserved for advanced Cisco CCNA tracks.
