# Task Context

## Goal
- Finish the "Client Deposits" full-stack test assignment on top of the current `Next.js + Prisma` project.

## Current Status
- The app uses `Next.js App Router`, `TypeScript`, `Prisma`, `React Query`, `Zustand`, `React Hook Form`, `Zod`, and `Material UI`.
- Deposit domain models already exist in [schema.prisma](/c:/GitHub/client-deposits/prisma/schema.prisma): `User`, `Card`, `DepositProgram`, `Contract`, `Currency`, `PaymentMethod`.
- The main user flow is implemented:
- `/deposits` shows the deposits list or empty state.
- `/deposits/new` contains a 4-step flow:
- program selection,
- deposit parameters,
- review,
- agreement with consent.
- Submit is wired through [route.ts](/c:/GitHub/client-deposits/app/api/deposits/route.ts) and [create-deposit-contract.ts](/c:/GitHub/client-deposits/lib/services/create-deposit-contract.ts).
- The backend already creates a contract, validates card flow, updates card balance, and waits 10 seconds before responding.
- Prisma migration exists in [migration.sql](/c:/GitHub/client-deposits/prisma/migrations/20260314193000_init/migration.sql).
- Seed exists in [seed.ts](/c:/GitHub/client-deposits/prisma/seed.ts) and is now idempotent.
- Local `.env` already points to real PostgreSQL on `localhost:5432`.
- PostgreSQL container was already started successfully and migration + seed were executed.
- Runtime reads no longer use mock fallback data.
- No-auth mode is explicitly implemented through [current-user.ts](/c:/GitHub/client-deposits/lib/db/current-user.ts), which resolves the first user in DB.

## Open Work
- Verify the full DB-backed UI flow end-to-end after the latest changes.
- Finalize the `docker-compose up` scenario so the whole project runs from one command without relying on a separately started local Next dev server.
- Finalize README for handoff.
- Optional future enhancement: support auth mode selection between `Demo user` and `Google auth`.

## Immediate Next Step
- Verify and harden the full Docker-run flow so `docker-compose up` is enough to start DB, app, migrations, and seed for the assignment demo.

## After That
- Run final end-to-end checks:
- contract appears in `/deposits`,
- card balance decreases for `CARD`,
- 10-second delay is observable,
- failure cases behave correctly.
- Clean up remaining presentation or documentation rough edges only if needed.

## Known Constraints
- Current bootstrap user data is demo data only, not future auth identity.
- First-user-in-DB mode is the current no-auth behavior and should remain until optional auth is implemented.
- Seed must stay non-destructive on rerun.
- The current implementation intentionally does not use Google auth yet.

## Future Auth Note
- Planned optional auth behavior:
- user can continue as `Demo user` mapped to the first user in DB,
- or sign in with Google.
- For Google auth, use only the Google profile name.
- On first Google sign-in, create a `User` and generate random cards.
- On later sign-ins, reuse the existing user data.
- Add `Logout` for the Google-authenticated path.

## Risks
- The full `docker-compose up` path still needs final runtime confirmation.
- Google-auth-by-name can become ambiguous if multiple users share the same name.
