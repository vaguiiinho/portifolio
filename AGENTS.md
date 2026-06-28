# Repository Guidelines

## Project Structure & Module Organization
This repository has two apps:
- `frontend/`: Next.js app router UI, reusable components in `src/components/`, hooks in `src/hooks/`, shared utilities in `src/lib/`, and static assets in `public/`.
- `backend/`: NestJS API with feature modules in `src/modules/`, shared infrastructure in `src/shared/`, Prisma schema and migrations in `prisma/`, and tests alongside source files as `*.spec.ts`.

The backend follows Clean Architecture + DDD boundaries: `domain/` for entities and repository interfaces, `application/` for use cases, `infrastructure/` for Prisma and persistence, and `presentation/` for controllers and DTOs. Main domains are `projects`, `contact`, `stats`, and `config`.

## Build, Test, and Development Commands
Run commands from the relevant package directory.
- `frontend/`
  - `npm run dev`: start the Next.js dev server.
  - `npm run build`: create a production build.
  - `npm run lint`: run ESLint.
- `backend/`
  - Run backend commands with `docker compose exec`, for example `docker compose exec backend npm run start:dev`.
  - `npm run start:dev`: start NestJS in watch mode.
  - `npm run build`: compile the backend to `dist/`.
  - `npm run test`: run unit tests.
  - `npm run test:e2e`: run end-to-end tests.
  - `npm run test:cov`: generate coverage output.

## Coding Style & Naming Conventions
Use TypeScript throughout. Follow the existing formatting style: 2-space indentation, semicolons in the backend, and the current React/Next.js component conventions in the frontend. Keep filenames descriptive and lowercase with hyphens for components and modules where that pattern already exists, for example `project-form-modal.tsx` and `project-prisma-repository.ts`.

Prefer small, focused modules. In the backend, keep controller, DTO, application, domain, and infrastructure code separated by folder. In the frontend, keep UI primitives in `src/components/ui/` and feature components in `src/components/portfolio/`.

## Testing Guidelines
Backend tests use Jest, with unit specs named `*.spec.ts` and e2e tests under `backend/test/`. When changing API behavior or validation, update the nearest spec first and run `npm run test` or `npm run test:e2e` as appropriate. The frontend currently relies on linting and manual verification; add tests only if the change introduces complex behavior.

## Commit & Pull Request Guidelines
Git history is short and informal, with terse Portuguese messages such as `tarefa 10 concluida`. Prefer concise, imperative commit messages that describe the user-facing change, for example `fix video validation on project edit`.

For pull requests, include:
- a short description of the change and scope;
- the commands you ran to verify it;
- screenshots or screen recordings for UI changes;
- notes about database or environment changes, especially Prisma migrations or API contract updates.

## Configuration Tips
Keep secrets out of the repo. Frontend API configuration comes from `NEXT_PUBLIC_API_URL`; backend changes that affect persistence usually require Prisma migration updates in `backend/prisma/migrations/`. When changing Prisma models or running migrations, prefer `docker compose exec backend ...` so the database tooling uses the same container environment as the app.
