# Quickstart & Verification Guide: Shabk

**Feature**: Shabk — Persian Interactive Network+ Learning Platform  
**Branch**: `001-shabk-network-course`  
**Date**: 2026-09-15  

---

## 1. Environment Prerequisites

- **Node.js**: `v20.x` or higher (LTS recommended)
- **Package Manager**: `npm` (v10+), `pnpm` (v9+), or `bun`
- **Operating System**: Windows, macOS, or Linux
- **Target Browser**: Evergreen browser supporting modern ES2022+ (Chrome 110+, Firefox 115+, Safari 16+, Edge 110+)

---

## 2. Project Setup & Local Development

### 2.1 Initialization & Dependency Installation
```bash
# Install development dependencies
npm install

# Run automated domain logic unit tests (IPv4 math, simulation engine)
npm run test

# Launch local development server with Hot Module Replacement (HMR)
npm run dev
```

The application will be accessible at:
```text
http://localhost:5173/
```

---

## 3. End-to-End Verification Scenarios

### Scenario 1: Subnetting Sandbox & Bitwise Math Verification
**Objective**: Prove that the pure TypeScript IPv4 math engine computes exact network boundaries, host ranges, and binary representations without backend calls.

1. Navigate to **"ماشین‌حساب و سندباکس ساب‌نتینگ"** in the navigation header.
2. In the IP input field, enter `172.16.10.75`.
3. Adjust the CIDR slider to `/22`.
4. **Expected Outcome**:
   - Subnet Mask displays: `255.255.252.0`
   - Network Address displays: `172.16.8.0`
   - Directed Broadcast displays: `172.16.11.255`
   - Usable Host Range displays: `172.16.8.1` to `172.16.11.254`
   - Total Usable Hosts displays: `1022`
   - Binary representation shows the first 22 bits highlighted as Network bits and the remaining 10 bits highlighted as Host bits.
   - Reference contract: [`subnet-engine.json`](./contracts/subnet-engine.json).

---

### Scenario 2: In-Browser Terminal Diagnostic Simulator
**Objective**: Prove that the terminal simulator accepts dual-platform commands, mutates live interface state, and produces authentic CLI output.

1. Open **"ترمینال شبیه‌ساز شبکه"** or launch any interactive lab.
2. Enter the Windows command:
   ```text
   ipconfig /all
   ```
3. Verify that virtual interface `eth0` displays its MAC, IP, Subnet Mask, and Gateway.
4. Enter the Linux equivalent:
   ```text
   ifconfig
   ```
5. **Expected Outcome**:
   - The terminal executes successfully, displaying network interface statistics formatted cleanly in LTR typography.
   - A subtle educational badge/tip appears: *"نکته: در ویندوز از دستور `ipconfig` و در لینوکس از `ifconfig` یا `ip a` استفاده می‌شود."*
6. Enter an ICMP reachability check:
   ```text
   ping 8.8.8.8
   ```
7. **Expected Outcome**:
   - Terminal renders 4 ICMP reply lines with realistic millisecond latency (e.g., `time=24ms`), `TTL=118`, and packet loss summary `0% loss`.
   - Reference contract: [`terminal-simulator.json`](./contracts/terminal-simulator.json).

---

### Scenario 3: Guided Troubleshooting Lab & Unlocking Gate
**Objective**: Verify the Hybrid Guided Flow where troubleshooting labs are locked until the corresponding module assessment is passed ($\ge 70\%$).

1. Navigate to **"فصل ۴: آدرس‌دهی شبکه و ساب‌نتینگ"**.
2. Scroll to the bottom and attempt to open **"آزمایشگاه عیب‌یابی قطعی گیت‌وی"**.
3. **Expected Outcome**:
   - The lab displays a locked indicator stating that the module quiz must be passed with at least 70% to unlock the scenario.
4. Start the Module 4 assessment in **Study Mode**.
5. Complete the 5 questions, scoring at least 4 out of 5 ($\ge 80\%$).
6. **Expected Outcome**:
   - Confetti animation triggers on the score modal.
   - The troubleshooting lab status changes immediately to **"باز شده (Unlocked)"**.
   - Entering the lab provides the diagnostic ticket, virtual topology map, and terminal with the misconfigured gateway ready for troubleshooting.

---

### Scenario 4: Zero-Backend Progress Portability (Export & Import)
**Objective**: Prove that user progress can be backed up as a JSON file and restored cleanly on another device or browser session.

1. Open **"تنظیمات و سوابق"** in the top navigation bar.
2. Click **"خروجی کارنامه (Export Backup)"**.
3. **Expected Outcome**:
   - Browser initiates a download of `shabk-backup-[timestamp].json`.
   - A modal displays a compact, one-click copyable backup code string.
4. In an Incognito/Private browser window (or after clearing `localStorage`), navigate to `http://localhost:5173/`.
5. Open **"تنظیمات و سوابق"** and click **"بازیابی کارنامه (Import Backup)"**.
6. Upload the downloaded JSON file or paste the backup code string.
7. **Expected Outcome**:
   - Toast notification confirms: *"سوابق و کارنامه شما با موفقیت بازیابی شد."*
   - All previously completed lessons, unlocked labs, and quiz scores are 100% restored.
   - Reference contract: [`progress-export.json`](./contracts/progress-export.json).

---

## 4. Production Build & GitHub Pages Deployment

To verify static export readiness:
```bash
# Build production bundle
npm run build

# Preview static production build locally
npm run preview
```

### GitHub Pages CI/CD Action
Pushing to the main branch automatically builds and deploys the `dist/` directory via `.github/workflows/deploy.yml` with zero server runtime requirements.
