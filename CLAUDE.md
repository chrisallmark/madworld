# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm install` — install dependencies
- `pnpm dev` — Next.js dev server (uses local files in `public/`)
- `pnpm build` / `pnpm start` — production build (reads audio from S3)
- `pnpm lint` — ESLint 9 flat config (`eslint.config.mjs`; `eslint-config-next` core-web-vitals + TS)

There are no tests in this project.

## Architecture

Next.js 16 App Router app (TypeScript, React 18) — a single-page audio player. Path alias `@/*` → `src/*`.

### Asset-source split (development vs production)

`src/services/audio.ts` is the seam between the two modes and is the only place that branches on `NODE_ENV`:

- **Development**: `getExtras` / `getSamples` / `getTracks` read filenames from `public/extras`, `public/samples`, and `public/tracks` via `fs.readdirSync`. The `package.json` `"browser": { "fs": false }` field prevents `fs` from leaking into client bundles — these helpers must stay server-only (called from `src/app/page.tsx`, a server component).
- **Production**: same helpers list objects from an S3 bucket using `@aws-sdk/client-s3` (lazy-initialised via `getS3Client()`, which calls `requireEnv()` for `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `AWS_BUCKET`). `listS3` paginates via `ListObjectsV2Command` continuation tokens. The Terraform in `terraform/` provisions the bucket and uploads everything under `public/{samples,tracks,extras,videos}` to matching S3 prefixes.
- `getVideoUrl()` follows the same dev/prod split and is consumed by `page.tsx` (server) → threaded as a `videoUrl` prop through `MadWorld` → `Background`. Don't reintroduce the prod URL inline in any client component.

When adding new audio asset categories, both `audio.ts` and `terraform/main.tf` need matching changes.

### Component flow

`page.tsx` (server) fetches extras/sample/track lists and the video URL → `MadWorld` (client) gates the UI on a click via `Splash` to satisfy browser autoplay policies → `Player` mounts `AudioVolumeProvider`, with an inner `PlayerContent` component that calls `useExtra` and renders `Track` and `Sample`.

### Audio coordination via context

`src/contexts/Audio.tsx` exposes `AudioVolumeContext` / `AudioVolumeProvider`. The context is deliberately _not_ called `AudioContext` because that would shadow the browser's `window.AudioContext` global used by `useTrack`. In addition to `volume`/`setVolume`, the context carries `lastAudioPlayedAt` (timestamp, initialized to `Date.now()`) and `notifyAudioPlayed` (resets the timestamp). Both `useSample` and `useExtra` call `notifyAudioPlayed()` when they begin playback.

- `useTrack` (background music) creates a Web Audio `AudioContext` + `GainNode` chained to the `<audio id="track">` element and writes `volume` into the gain node. Track shuffles to a different track on `onEnded`.
- `useSample` (commentary clips) plays `<audio id="sample">` and ducks the music to `DUCK_VOLUME` (0.33) while playing, restoring `FULL_VOLUME` (1) on `onended`/error. It calls `audio.removeAttribute("src")` before `audio.load()` to clear any `src` set by `useExtra` — per HTML spec, a `src` attribute takes precedence over `<source>` children.
- `useExtra` (idle extras) waits 30 s of no audio activity then auto-plays a random clip from the `extras/` prefix using the same `<audio id="sample">` element and the same ducking behaviour. The idle timer is reset via `lastAudioPlayedAt` whenever either hook plays audio. The `idleTimer` callback performs no React state updates (only `audio.src` / `audio.load()`); all state updates happen inside a nested `playTimer` — this avoids a re-render that would run effect cleanup and cancel `playTimer` before it fires.

Shared audio constants (`DUCK_VOLUME`, `FULL_VOLUME`, `SAMPLE_START_DELAY_MS`) live in `src/hooks/audioConstants.ts`.

The two `<audio>` elements are referenced by DOM id (looked up via `getAudioElement` in `src/helpers/audioElement.ts`, which uses `instanceof HTMLAudioElement` rather than an `as` cast). Keep the ids `track` and `sample` and the `crossOrigin="anonymous"` attribute (required for the Web Audio graph to read S3-hosted media).

### Background visuals

`Background.tsx` layers (a) a randomized still from `/images/madworld-NN.jpg` chosen by `useBackground` (rotates every 30s, 20 images), (b) an autoplaying muted looping MP4 that fades in on `canplay` and falls back to the still on error, (c) animated rain `<hr>` elements from `useRain`, and (d) a scanlines overlay wrapping `children`. The still index is zero-padded to two digits — image filenames must follow `madworld-00.jpg` … `madworld-19.jpg`.

### UI library

`semantic-ui-react` (beta) plus `styled-components`. The compiled Semantic UI CSS lives at `src/app/semantic.css` (~750KB) and is imported once in `layout.tsx`; custom theme overrides live in `src/app/themes/`. Component-level styling uses `styled-components` with the `$prop` transient-prop convention. The shared dropdown wrapper for the music-track and sample selectors is `src/components/AudioDropdown.tsx`; filename-display formatting is `displayNameFromUrl` in `src/helpers/format.ts`.

## Dependency pins

- **React stays on `^18`** even though Next 16 supports React 19. The reason is `semantic-ui-react@3.0.0-beta.2`, whose peer-deps cap at `react@^18`. Both the latest beta (3.x) and stable (2.x) advertise the same cap. Bumping React triggers peer-dep warnings on `pnpm install` and risks runtime breakage from React 19's removed legacy APIs (semantic-ui-react still uses class components and older ref patterns). Don't bump React 18 → 19 without first replacing or upgrading semantic-ui-react.
- `@types/node@^25` matches the current Node major; not LTS-pinned.
- `semantic-ui-react@3.0.0-beta.2` is the latest 3.x; no stable 3.x exists yet.

## Security headers

`next.config.mjs` exports a `headers()` function that applies CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy to all routes. The CSP allows `'unsafe-inline'` for both scripts (Next inline) and styles (styled-components / Semantic UI); in development it also adds `'unsafe-eval'` to `script-src` for Next.js HMR. `https://*.amazonaws.com` is allowed for S3 media, `https://va.vercel-scripts.com` in `script-src` and both `https://va.vercel-scripts.com` / `https://vitals.vercel-insights.com` in `connect-src` for Speed Insights, and `https://fonts.googleapis.com` / `https://fonts.gstatic.com` for the Lato webfont imported by `semantic.css`. If you add a new third-party script, font, or media host, update the matching CSP directive.

## Deployment

Targets Vercel (`@vercel/speed-insights` is wired into the root layout, `metadataBase` points at `mad-world.vercel.app`). `.vercelignore` excludes the bulk audio/video assets from the deploy bundle since production serves them from S3.
