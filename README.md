# Client Deposits

Full-stack test assignment for a client deposits module built with `Next.js`, `TypeScript`, `Prisma`, `React Query`, `Zustand`, `React Hook Form`, `Zod`, and `Material UI`.

## Current Scope
- "My Deposits" page with empty state and deposits list
- Multi-step deposit opening flow
- Agreement generation with consent step
- API-based deposit creation with a fixed 10-second response delay
- Prisma seed data for a demo user, cards, and deposit programs
- No-auth demo mode that resolves the first user from the database

## Local Run
1. Create `.env` from [.env.example](/c:/GitHub/client-deposits/.env.example).
2. Make sure PostgreSQL is running locally on port `5432`.
3. Run Prisma migration and seed:

```bash
npx prisma migrate deploy
npx prisma db seed
```

4. Build and start the app:

```bash
npm run build
npm run start
```

## Docker Run
Run:

```bash
docker compose up --build
```

This starts:
- PostgreSQL
- the Next.js app on `http://localhost:3000`
- Prisma migration deployment
- Prisma seed

## Notes
- Current demo mode uses the first user in the database as the active user.
- Seed is idempotent and safe to rerun.
- Future optional Google auth should use explicit identity mapping and must not rely on the current demo user as an implicit authenticated identity.
