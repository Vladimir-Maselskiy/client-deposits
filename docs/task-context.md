# Task Context

## Goal
- Use this file as the session recovery context for the test assignment.
- Build the "Client Deposits" module on top of the existing `Next.js + Prisma` template.

## Current State
- The repository is a `Next.js` App Router project with `TypeScript`, `React`, and `Prisma`.
- [app/page.tsx](/c:/GitHub/client-deposits/app/page.tsx) is still the default `create-next-app` landing page.
- [app/layout.tsx](/c:/GitHub/client-deposits/app/layout.tsx) is still mostly template-level with default metadata and base font setup.
- [prisma/schema.prisma](/c:/GitHub/client-deposits/prisma/schema.prisma) already models the deposit domain: `User`, `Card`, `DepositProgram`, `Contract`, `Currency`, `PaymentMethod`.
- [lib/prisma.ts](/c:/GitHub/client-deposits/lib/prisma.ts) already contains a standard `PrismaClient` singleton for development.
- The project direction is already aligned with deposit management, but the UI, API flow, validation, seed data, and user scenarios are not implemented yet.
- Boilerplate content still exists in the README and page metadata.
- The first implementation slice is now in progress: app-level providers, DB read helpers, deposits routes, and the initial flow shell have been added in code.

## Test Assignment Summary
- Build a web app for managing bank deposits.
- Required stack: `Next.js App Router`, `TypeScript`, `React Query`, `Zustand`, `React Hook Form`, `Zod`, `Material UI`, database, `Docker`, `Docker Compose`.
- Required entities: `Users`, `Cards`, `DepositPrograms`, `Contracts`.
- By default, the app should work with the first user found in the database.
- Required page: "My Deposits" with either empty state or deposit list.
- Required multi-step flow:
- Step 1: choose a deposit program from DB.
- Step 2: enter parameters: amount, optional custom name, payment method, card selection if card payment is used.
- Step 3: review entered data.
- Step 4: render agreement text with dynamic data and a consent checkbox.
- Submit must call an API that writes to DB and returns after exactly 10 seconds.
- During the async wait, the UI must be blocked and show a spinner.
- On success, show result details and redirect to the deposits list.
- On failure, show an error message.
- The project must run with `docker-compose up`.
- Database seeding must happen automatically on startup.
- Optional extras: auth, mobile adaptation, Swagger.

## Decisions
- Keep the existing template and evolve it instead of recreating the project.
- Store working context in this file, not in chat history.
- Deliver all mandatory requirements first; treat optional items as stretch goals.
- Implement in small vertical slices and verify locally after each completed task.

## Technical Blueprint

### Route Structure
- `/` should become a lightweight redirect or entry page to the main deposits flow.
- `/deposits` should be the "My Deposits" page.
- `/deposits/new` should be the multi-step deposit opening flow.
- `/api/deposits` should handle contract creation.

### Layer Boundaries
- Server components should load initial DB-backed page data for `deposits` pages.
- Client components should own interactive form flow, step transitions, pending state, and mutation UX.
- `React Query` should be used for client-side mutations and optionally for refetch-triggered client reads if needed.
- `Zustand` should only store cross-step deposit form state and current step metadata.
- `React Hook Form + Zod` should validate each interactive step and shape submission payloads.
- Prisma access should stay on the server side only.

### Expected Directory Shape
- `app/`
- `app/deposits/page.tsx` for the deposits list page.
- `app/deposits/new/page.tsx` for the multi-step form page.
- `app/api/deposits/route.ts` for contract creation.
- `components/`
- `components/deposits/` for deposit-specific UI blocks.
- `components/common/` for reusable UI wrappers if needed.
- `lib/`
- `lib/prisma.ts` for Prisma client.
- `lib/db/` for DB query helpers.
- `lib/services/` for business logic that composes DB operations.
- `lib/validators/` for Zod schemas.
- `lib/mappers/` for DTO formatting if needed.
- `store/`
- `store/deposit-flow-store.ts` for Zustand multi-step state.
- `types/`
- `types/deposits.ts` for shared app-level deposit types if needed.
- `prisma/`
- `prisma/schema.prisma` for the schema.
- `prisma/seed.ts` for test data seeding.

### Data Access Design
- Add a helper that resolves the default current user as the first user in DB.
- Add a DB query/helper for loading deposit programs.
- Add a DB query/helper for loading the current user together with cards and contracts.
- Add a contract creation service that encapsulates:
- payload validation,
- program lookup,
- user lookup,
- optional card lookup,
- optional card balance mutation,
- contract creation,
- agreement text persistence.

### State Management Design
- `Zustand` store should hold:
- selected program id,
- entered amount,
- optional custom name,
- payment method,
- selected card id,
- agreement accepted flag,
- current step.
- `React Hook Form` should be step-local.
- On successful step submit, validated values should be copied into `Zustand`.
- The review and agreement steps should read from `Zustand`, not maintain duplicate form state.

### Validation Strategy
- Step 1: require selected program.
- Step 2: require positive amount and valid payment method.
- Step 2 conditional rule: `cardId` is required only when payment method is `CARD`.
- Server-side validation must repeat critical rules regardless of client validation.
- If card payment is selected, validate card ownership and optionally sufficient balance.
- If business rules require same-currency behavior, enforce it consistently in both Zod and server logic.

### UI Composition Plan
- Use `Material UI` as the base component system.
- Build the form as one page with a visible stepper and per-step content panels.
- Keep the "My Deposits" page simple: headline, CTA, empty state, list/cards.
- Agreement step should render the provided template with substituted values in a readable block.
- Async submission state should use a blocking overlay or disabled page-level interaction state.

### Async Flow Design
- Submit from `/deposits/new` through a `React Query` mutation targeting `/api/deposits`.
- The API should wait 10 seconds before responding.
- On success:
- invalidate/refetch deposits data if needed,
- show success feedback,
- clear `Zustand` flow state,
- redirect to `/deposits`.
- On failure:
- keep the form state,
- surface a readable error message,
- allow retry.

### Docker / Infra Plan
- Prefer PostgreSQL because the current Prisma schema already targets it.
- Add `Dockerfile` for the Next.js app.
- Add `docker-compose.yml` with app + postgres services.
- Ensure startup flow includes:
- database container start,
- migrations,
- Prisma client generation if needed,
- seed execution.
- Keep local non-Docker startup possible in parallel.

## Dependencies Plan

### Required By Assignment
- `@mui/material`
- `@tanstack/react-query`
- `zustand`
- `react-hook-form`
- `zod`

### Required To Support Chosen Implementation
- `@emotion/react`
- `@emotion/styled`
- `@hookform/resolvers`

### Optional Only If Needed
- `@mui/icons-material`
- `dayjs`

## Prisma Schema Assessment

### What Already Fits The Assignment
- `User` already contains the required client identity fields: `fullName` and `address`.
- `Card` already covers the core card requirements: `name`, `balance`, `currency`, and ownership through `userId`.
- `DepositProgram` already covers the core banking product requirements: `name`, `rate`, `termMonths`, `currency`.
- `Contract` already stores the main deposit opening result: linked user, linked program, optional linked card, amount, optional custom name, payment method, agreement text, creation date.
- `Currency` and `PaymentMethod` enums already match the business language of the task.
- The schema is already suitable for "first user in DB" logic without introducing auth.

### What Looks Good To Keep As Is
- Keep `agreementText` persisted in `Contract`; this directly supports the agreement step from the assignment.
- Keep `cardId` nullable; this is correct because cash deposits should not require a card.
- Keep `customName` nullable; the assignment marks the deposit name as optional.
- Keep `createdAt` on both `User` and `Contract`; `Contract.createdAt` is directly needed for the deposits list.

### What May Need Clarification Before Implementation
- `Contract` currently does not store deposit currency directly; the app can derive it from `DepositProgram.currency`, which is probably enough unless denormalization is needed later.
- `Contract` currently does not store program name, rate, or term snapshot separately; if the product changes later, historical contracts would still read through the relation. For the test assignment, relation-based reading is probably acceptable.
- `Card.balance` and `Contract.amount` use `Float`; for a real banking system this would be weak, but for the test assignment it is likely acceptable unless we want to harden precision by switching to `Decimal`.
- There are no explicit DB-level indexes yet; likely not required for the test assignment, but could be added for clarity on foreign keys.

### Recommended Data Decisions For This Project
- Keep the current model structure and do not expand entities unless implementation reveals a concrete gap.
- Treat `DepositProgram.currency` as the source of truth for deposit currency.
- Treat `Contract.agreementText` as the immutable stored agreement snapshot.
- Keep card-based payment optional and validate card ownership and balance in service logic.
- Keep PostgreSQL as the target DB because the schema already points to it and it fits Docker setup well.

### Possible Schema Adjustments Only If Needed
- Consider switching monetary fields from `Float` to `Decimal` if precision concerns become material during implementation.
- Consider adding explicit indexes on `userId`, `depositProgramId`, and `cardId` if query clarity or Prisma migrations suggest it.
- Consider adding a dedicated status field on `Contract` only if the flow later needs more than "created or failed"; the assignment does not require it now.

## First Iteration File Plan

### App Shell / Providers
- `app/layout.tsx`
- `app/page.tsx`
- `app/providers.tsx`

### Deposits Routes
- `app/deposits/page.tsx`
- `app/deposits/new/page.tsx`

### API Layer
- `app/api/deposits/route.ts`

### UI Components
- `components/deposits/deposits-page.tsx`
- `components/deposits/deposits-empty-state.tsx`
- `components/deposits/deposits-list.tsx`
- `components/deposits/deposit-flow.tsx`
- `components/deposits/deposit-stepper.tsx`
- `components/deposits/steps/select-program-step.tsx`
- `components/deposits/steps/deposit-params-step.tsx`
- `components/deposits/steps/deposit-review-step.tsx`
- `components/deposits/steps/deposit-agreement-step.tsx`

### State / Validation / Types
- `store/deposit-flow-store.ts`
- `lib/validators/deposit-flow.ts`
- `types/deposits.ts`

### Data Access / Business Logic
- `lib/db/users.ts`
- `lib/db/deposit-programs.ts`
- `lib/db/contracts.ts`
- `lib/services/create-deposit-contract.ts`
- `lib/services/build-deposit-agreement.ts`

### Prisma
- `prisma/schema.prisma`
- `prisma/seed.ts`

### Infra
- `Dockerfile`
- `docker-compose.yml`
- `README.md`

## Implementation Order
1. Finalize target structure and dependency plan.
2. Adjust Prisma schema only if required by the assignment details.
3. Add seed flow and DB helpers.
4. Add app-wide providers: MUI, React Query.
5. Implement the "My Deposits" page.
6. Implement the Zustand store and step container for `/deposits/new`.
7. Implement step 1.
8. Implement step 2 with RHF + Zod.
9. Implement step 3 review.
10. Implement step 4 agreement.
11. Implement the backend deposit creation flow.
12. Wire mutation UX and redirects.
13. Add Docker and startup automation.
14. Remove boilerplate and prepare README.

## Verification Strategy
- After each task, run only the smallest relevant local check instead of waiting until the end.
- After schema/data tasks: verify migrations, seed, and DB reads.
- After provider/layout tasks: verify the app still builds and pages render.
- After each form step: verify step state survives transitions and back navigation.
- After backend submit logic: verify success path, failure path, and 10-second delay behavior.
- After Docker work: verify clean startup from containers with seeded data.

## First Iteration Scope
- Replace the current landing page with the deposits entry flow.
- Introduce target routes and providers.
- Keep the first delivery focused on mandatory features only.
- Do not start auth, Swagger, or extra UX polish before the core flow is stable.

## Progress
- Done: app-level `Providers` with `React Query` and `MUI`.
- Done: root route now redirects to `/deposits`.
- Done: DB helper modules for current user, cards, programs, and contracts reads.
- Done: `/deposits` page with empty state and contracts list UI.
- Done: `/deposits/new` page with flow shell, stepper, Zustand store, and working step 1 program selection.
- Deferred: step 2 parameters form, review step, agreement step, submit API, seed, Docker.

## First Iteration Delivery Order
1. Finalize dependency list.
2. Add providers and route skeletons.
3. Add DB query helpers and seed plan.
4. Implement "My Deposits" page.
5. Implement the deposit flow container and Zustand store.
6. Implement steps 1-4.
7. Implement submit API and async UX.
8. Add Docker support.
9. Remove boilerplate and finalize docs.

## Initial Implementation Slice

### Primary Goal
- Deliver the first meaningful vertical slice using the existing template without touching optional features.

### Start Order
1. Add app-level providers and replace template entry routing.
2. Add DB query helpers for current user, cards, programs, and contracts.
3. Build the "My Deposits" page with empty and non-empty states.
4. Add the deposit flow shell and Zustand store.
5. Add the first form step for selecting a deposit program.

### First Files To Touch
- `app/layout.tsx`
- `app/page.tsx`
- `app/providers.tsx`
- `app/deposits/page.tsx`
- `app/deposits/new/page.tsx`
- `components/deposits/deposits-page.tsx`
- `components/deposits/deposits-empty-state.tsx`
- `components/deposits/deposits-list.tsx`
- `components/deposits/deposit-flow.tsx`
- `components/deposits/steps/select-program-step.tsx`
- `store/deposit-flow-store.ts`
- `lib/db/users.ts`
- `lib/db/deposit-programs.ts`
- `lib/db/contracts.ts`

### What We Intentionally Defer
- Step 2 form details and validation.
- Review and agreement steps.
- Submit API and 10-second async processing.
- Docker implementation.
- README cleanup and final polish.

### Local Verification After This Slice
- The app has a non-template entry path.
- `/deposits` renders using DB-backed data loading.
- Empty state and seeded data list can both be displayed.
- `/deposits/new` renders the flow shell and preserves selected program in Zustand.
- No optional features are mixed into this first slice.

## Risks / Questions
- The current Prisma schema is close to the assignment, but full business-rule coverage is not confirmed yet.
- The repository still lacks API handlers, form architecture, seed implementation, and runtime UX.
- There is an existing user change in `tsconfig.json`; future edits must avoid overwriting it blindly.
- The exact startup strategy for migrations and seed inside Docker still needs to be chosen.
- "Exactly 10 seconds" should be implemented in a way that is deterministic and easy to verify locally.
