# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 16 TypeScript application. Route files live in `src/app`, reusable UI lives in `src/components`, shared React state in `src/contexts`, browser/audio helpers in `src/helpers`, reusable hooks in `src/hooks`, and service integrations in `src/services`. Static media is under `public`: `public/tracks`, `public/samples`, `public/extras`, and `public/videos` contain runtime audio/video assets. Source design assets are in `assets`. Infrastructure for the S3-backed production audio setup is in `terraform`.

## Build, Test, and Development Commands

Use pnpm, as pinned by `packageManager`.

- `pnpm install`: install dependencies.
- `pnpm dev`: start the local Next.js development server.
- `pnpm build`: create a production Next.js build.
- `pnpm start`: run the production server after `pnpm build`.
- `pnpm lint`: run ESLint with Next core-web-vitals and TypeScript rules.
- `pnpm format` / `pnpm format:check`: write or verify Prettier formatting.
- `pnpm commit`: create a Conventional Commit through Commitizen.

## Coding Style & Naming Conventions

Write TypeScript and React function components. Keep components in `PascalCase` files such as `Player.tsx`; hooks should be `useCamelCase`, for example `useTrack.ts`. Prefer the `@/*` path alias for imports from `src`, then relative imports for nearby files. Formatting is handled by Prettier, including sorted imports via `@ianvs/prettier-plugin-sort-imports`. Use strict TypeScript-friendly code and avoid browser APIs outside client-safe React code.

## Testing Guidelines

There is currently no configured test runner or `test` script. For now, verify changes with `pnpm lint`, `pnpm format:check`, and `pnpm build`. When adding tests, add the runner and script in the same change, place tests near the code they cover or in a clear `tests` directory, and use names like `Component.test.tsx` or `helper.test.ts`.

## Commit & Pull Request Guidelines

Commits must follow Conventional Commits; commitlint runs from the Husky `commit-msg` hook. Recent history uses messages like `fix: update commit-msg`, `build: update allowed_origins`, and `docs: update docs`. Use `feat:` for user-visible features, `fix:` for patches, `build:` for deployment/build changes, and `docs:` for documentation-only updates.

Pull requests should include a concise description, verification steps run, linked issues when applicable, and screenshots or screen recordings for UI changes. Note any changes to public media assets, S3/Terraform settings, or required environment variables.

## Security & Configuration Tips

Do not commit AWS credentials, `.env` files, or `terraform/terraform.tfvars`. Production audio uses S3 and expects `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, and `AWS_BUCKET` in the deployment environment.
