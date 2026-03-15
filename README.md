# Client Deposits

Повноцінне full-stack тестове завдання для модуля депозитів клієнта, побудоване
на `Next.js App Router`, `TypeScript`, `Prisma`, `React Query`, `Zustand`,
`React Hook Form`, `Zod`, `Material UI` та `PostgreSQL`.

## Огляд

Застосунок покриває повний сценарій відкриття депозиту, описаний у завданні:

- сторінка «Мої вклади» з empty state і списком договорів
- 4-кроковий процес відкриття депозиту
- генерація заяви-договору з чекбоксом згоди
- API-створення договору з фіксованою затримкою відповіді `10` секунд
- автоматичні міграції та seed під час Docker-запуску
- додатково реалізовано: Google auth і Swagger/OpenAPI

## Що реалізовано

### Основні вимоги

- сутності `Users`, `Cards`, `DepositPrograms` і `Contracts` змодельовані в
  Prisma
- no-auth режим працює через першого користувача, знайденого в базі
- `/deposits` показує або empty state, або список створених договорів
- `/deposits/new` містить багатокроковий flow зі станом у Zustand
- внесення з картки перевіряє баланс і відповідність валюти до створення
  договору
- бекенд відповідає рівно через `10` секунд як при успіху, так і при помилці
- під час запиту frontend блокує взаємодію з інтерфейсом
- проєкт запускається командою `docker compose up --build`

### Додаткові можливості

- Google-авторизація через `next-auth`
- окремий вхід як demo user
- `Logout` для Google-auth сценарію
- Swagger UI і raw OpenAPI spec
- адаптований stepper для вузьких екранів

## Технології

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Prisma`
- `PostgreSQL`
- `React Query`
- `Zustand`
- `React Hook Form`
- `Zod`
- `Material UI`
- `Docker Compose`
- `NextAuth`

## Модель даних

Основні сутності:

- `User`
- `Card`
- `DepositProgram`
- `Contract`

Ключові файли:

- [schema.prisma](/c:/GitHub/client-deposits/prisma/schema.prisma)
- [seed.ts](/c:/GitHub/client-deposits/prisma/seed.ts)
- [migration.sql](/c:/GitHub/client-deposits/prisma/migrations/20260314193000_init/migration.sql)

## Швидкий старт

### Рекомендований сценарій: Docker

Це основний шлях для демонстрації та перевірки проєкту.

```bash
docker compose up --build
```

Що робить ця команда:

- запускає PostgreSQL
- збирає і запускає Next.js застосунок
- застосовує Prisma migrations
- автоматично виконує seed даних

Що покривається з коробки:

- demo-user сценарій працює одразу після `docker compose up --build`
- `NEXTAUTH_SECRET` для demo runtime вже закладений у Docker-конфіг
- Google OAuth credentials не зберігаються в репозиторії і передаються окремо

> Важливо: повністю готовий до перевірки сценарій з однієї команди це
> `docker compose up --build` у demo mode.
> Google login є додатковою опцією і потребує окремо переданих
> `GOOGLE_CLIENT_ID` та `GOOGLE_CLIENT_SECRET`.

Адреси застосунку:

- застосунок: `http://localhost:3000`
- сторінка вкладів: `http://localhost:3000/deposits`
- створення нового вкладу: `http://localhost:3000/deposits/new`
- Swagger UI: `http://localhost:3000/api-docs`
- OpenAPI JSON: `http://localhost:3000/api/openapi`

## Локальна розробка

Цей режим зручний, якщо потрібен hot reload, а PostgreSQL залишається в Docker.

### 1. Налаштування оточення

Створи `.env` на основі [.env.example](/c:/GitHub/client-deposits/.env.example).

Мінімально потрібна змінна:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/client_deposits?schema=public"
```

### 2. Запуск тільки бази даних

```bash
docker compose up -d db
```

### 3. Міграції та seed

```bash
npx prisma migrate deploy
npx prisma db seed
```

### 4. Локальний запуск Next.js

Для Windows PowerShell:

```bash
npm.cmd run dev
```

Якщо `app` контейнер Docker ще займає порт `3000`, спочатку зупини його:

```bash
docker compose stop app
```

## Тестові дані

Seed створює:

- 1 demo user
- 2 demo картки
- 3 депозитні програми

Seed є ідемпотентним і безпечно виконується повторно.

## Авторизація

### Demo mode

Без налаштування Google OAuth проєкт усе одно працює через seeded demo user.

### Опціональна Google auth

Базовий demo flow не потребує додаткових секретів і працює без Google OAuth.

> Увага: через GitHub Push Protection реальні Google OAuth credentials не можуть
> зберігатися в репозиторії. Для перевірки Google login їх потрібно додати
> окремо в `.env`.

Щоб увімкнути вхід через Google, додай видані окремо credentials у `.env`:

```env
NEXTAUTH_SECRET="your-random-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

Важливі примітки:

- без цих змінних demo-user flow продовжує працювати
- через GitHub Push Protection реальні Google OAuth credentials не зберігаються в
  репозиторії
- для повної перевірки Google login потрібно підставити передані окремо
  `GOOGLE_CLIENT_ID` і `GOOGLE_CLIENT_SECRET`
- Google sign-in навмисно мапиться лише за `profile name`, як було вказано в
  завданні
- для демо цього достатньо, але для production така схема ідентифікації
  неоднозначна

## API документація

Swagger/OpenAPI доступні за адресами:

- Swagger UI: `http://localhost:3000/api-docs`
- OpenAPI JSON: `http://localhost:3000/api/openapi`

Документований endpoint:

- `POST /api/deposits`

Ключові файли:

- [route.ts](/c:/GitHub/client-deposits/app/api/deposits/route.ts)
- [route.ts](/c:/GitHub/client-deposits/app/api/openapi/route.ts)
- [document.ts](/c:/GitHub/client-deposits/lib/openapi/document.ts)

## Основні бізнес-правила

- активний користувач у demo mode визначається як перший користувач із БД
- для створення вкладу потрібна валідна депозитна програма
- сума має бути більшою за нуль
- для внесення типу `CARD`:
  - картка має бути обрана
  - картка має належати поточному користувачу
  - валюта картки має збігатися з валютою вкладу
  - на картці має бути достатньо коштів
- текст договору є обов’язковим перед відправленням

## UX-особливості

- запит на створення договору навмисно затримується на `10` секунд
- під час очікування UI показує спінер і блокує взаємодію
- stepper має компактну мобільну версію на вузьких екранах
- інтерфейс і текст договору локалізовані українською

## Сценарій помилки

Помилкові відповіді так само повертаються лише через `10` секунд, як і успішні.

Отримати помилку із затримкою можна за таких умов:

- ввести суму меншу або рівну `0`
- обрати `CARD` і не вибрати картку
- обрати картку, валюта якої не збігається з валютою депозитної програми
- ввести суму, що перевищує баланс обраної картки
- відправити форму без валідного тексту договору
- надіслати запит із неіснуючим `selectedProgramId`

Практичний сценарій через UI:

1. Відкрити `http://localhost:3000/deposits/new`
2. Обрати програму в одній валюті
3. Обрати спосіб внесення `CARD`
4. Вибрати картку в іншій валюті або вказати суму більшу за доступний баланс
5. Дійти до останнього кроку і натиснути `Оформити`

Очікуваний результат:

- спінер і блокування інтерфейсу залишаються активними `10` секунд
- після затримки API повертає повідомлення про помилку замість створення
  договору

## Структура проєкту

Верхньорівнева структура:

- [app](/c:/GitHub/client-deposits/app) - маршрути, API handlers, docs pages
- [components](/c:/GitHub/client-deposits/components) - UI та кроки flow
- [lib](/c:/GitHub/client-deposits/lib) - доступ до БД, сервіси, auth, OpenAPI
  config
- [prisma](/c:/GitHub/client-deposits/prisma) - schema, migration, seed
- [store](/c:/GitHub/client-deposits/store) - Zustand state для flow
- [types](/c:/GitHub/client-deposits/types) - спільні TypeScript-типи

## Корисні команди

```bash
docker compose up --build
docker compose up -d db
docker compose stop app
npx prisma migrate deploy
npx prisma db seed
npm.cmd run dev
npm run build
npx.cmd tsc --noEmit
npm run lint
```

## Підсумок

- Docker-сценарій є основним шляхом перевірки.
- Текст заяви-договору приведений до формулювання із завдання.
- Додаткові можливості реалізовані без заміни базової demo-user поведінки.

### Архітектура

- бізнес-логіка відокремлена від UI
- доступ до бази даних винесений у шар
  [lib/db](/c:/GitHub/client-deposits/lib/db)
- створення договору винесене в окремий сервіс
  [create-deposit-contract.ts](/c:/GitHub/client-deposits/lib/services/create-deposit-contract.ts)
- API routes, UI-компоненти, Prisma schema і flow state розділені по
  відповідальних модулях

### Стейт-менеджмент

- `Zustand` використовується для збереження стану багатокрокової форми між
  етапами
- `React Query` використовується для async mutation та оновлення даних після
  створення вкладу
- відповідальність між локальним flow state і server interaction не дублюється

### Валідація

- `Zod` використовується для перевірки полів форми і умовних правил
- окремо перевіряється сценарій внесення через картку
- критичні бізнес-обмеження дублюються на backend-рівні, а не лише у frontend

### DevOps

- проєкт запускається через `docker compose up --build`
- Docker-сценарій піднімає базу, застосунок, міграції та seed з однієї команди
- Prisma migration і seed інтегровані в загальний сценарій запуску
- seed є ідемпотентним і безпечним для повторного виконання

### Clean Code

- використовується наскрізна TypeScript-типізація
- структура проєкту побудована за зонами відповідальності
- UI flow розбитий на окремі кроки й компоненти
- README описує запуск, архітектуру, правила роботи та сценарії перевірки
