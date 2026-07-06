# Yomi — Design Decision Log

Every entry: **Context → Options considered → Decision → Rationale**. Screenshots referenced from `versions/`.

---

## 2026-07-05 — Tech stack

**Context:** Yomi must ship on Android and iOS simultaneously, responsive across phone sizes, with camera capture and friend-sharing.

**Options considered:** React Native + Expo vs Flutter (framework); Firebase vs Supabase vs local-only (backend).

**Decision:** React Native + Expo, Firebase backend.

**Rationale:** Single codebase for both platforms; Expo provides camera APIs, live preview on a real device via Expo Go, and managed app-store builds. Firebase's free tier covers auth, photo storage, and realtime feeds — fastest path to working friend-sharing. Responsiveness handled via flexbox layouts and density-independent units rather than fixed sizes.

## 2026-07-05 — Quick Access page structure (v001)

**Context:** First screen users see on every app open. Wireframe combines a Google-Calendar-style task strip, a Locket-style camera, and social entry points.

**Options considered:** (a) camera-first full-screen like BeReal with tasks hidden behind a tab; (b) wireframe's stacked layout — tasks above camera, both visible at once.

**Decision:** Stacked layout per wireframe: top bar → task strip → near-square camera (aspect 1:1.15, slightly taller than Locket) → capture controls → friends' new-posts row → 5-tab bottom nav.

**Rationale:** Yomi's core loop is *task → proof photo*; keeping tasks and camera on one screen makes the loop one glance, one tap. Task rows use height to encode size (small = thin, big/event = tall) exactly like a calendar's visual language. Overflow handled with an expand chevron instead of scrolling the strip, so the camera never gets pushed off-screen.

**Also decided:** custom state-based tab bar instead of a navigation library for now (fewer dependencies while the IA is still fluid); grayscale only — color system deferred deliberately so structure gets critiqued before aesthetics.

**Screenshot:** `versions/v001-quick-access/screenshot-home.png`

## 2026-07-06 — Home iteration v002

**Context:** First hands-on test on a real device (Expo Go) surfaced layout and interaction gaps.

**Decisions:**
- Top bar rebalanced: date pill absolutely centered (side icons can't push it off-axis); notifications bell introduced left of chat, chat anchored far right; add-friends removed from the bar (friend management lives in the Friends tab).
- Camera zoom: two-finger pinch for free zoom, with preset buttons (.5 / 1× / 2 / 5) that fade in while zooming and auto-hide after 3s — borrows the familiar iOS camera pattern so zoom control is discoverable but never permanently cluttering the viewfinder.
- Friends' new posts: compressed from a labeled avatar row into a compact pill of overlapping avatars, centered, names removed — reads as a single button and reduces visual competition with the shutter.

**Screenshot:** `versions/v002-home-refinements/screenshot-home.png`
