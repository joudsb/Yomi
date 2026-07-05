# Yomi — Process Log

Narrative record of the build: phases, challenges, iterations, learnings. Raw material for the case study.

---

## Phase 1 — Setup & first screen (2026-07-05)

Chose React Native + Expo (one codebase → iOS + Android, responsive via flexbox) with Firebase planned for auth/storage/feeds. Notable constraint discovered: the OneDrive-synced project folder can't host a git repo (lock files), so the repo lives in the build sandbox and syncs both ways.

Built v001: the Quick Access home page in grayscale, direct from Joud's annotated wireframe. Everything functional-first: camera permissions flow, tap-vs-hold shutter (60s video cap), double-tap to flip, expandable task strip. Verified layout on a 390×844 viewport (iPhone-class) via web preview screenshot.
