# Yomi — Design Decision Log

Every entry: **Context → Options considered → Decision → Rationale**. Screenshots referenced from `versions/`.

---

## 2026-07-05 — Tech stack

**Context:** Yomi must ship on Android and iOS simultaneously, responsive across phone sizes, with camera capture and friend-sharing.

**Options considered:** React Native + Expo vs Flutter (framework); Firebase vs Supabase vs local-only (backend).

**Decision:** React Native + Expo, Firebase backend.

**Rationale:** Single codebase for both platforms; Expo provides camera APIs, live preview on a real device via Expo Go, and managed app-store builds. Firebase's free tier covers auth, photo storage, and realtime feeds — fastest path to working friend-sharing. Responsiveness handled via flexbox layouts and density-independent units rather than fixed sizes.
