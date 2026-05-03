# 🧑‍🚀 Astronaunt

Fast Astro starter for multilingual REST projects.

## What is inside?

- Astro 6 + Vue islands
- Tailwind CSS 4 + DaisyUI
- Bun package manager
- Biome instead of ESLint/Prettier
- REST API client in `src/lib/http.ts`
- JWT helper utilities in `src/lib/auth.ts`
- i18n dictionaries for English, Uzbek, and Russian
- Lightweight Motion animations
- CI + Dependabot + Bun audit

## Quick start

```bash
bun install
cp .env.example .env
bun run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
bun run dev       # local dev server
bun run build     # production build
bun run preview   # preview build
bun run check     # Biome lint + format check
bun run format    # format files
bun run audit     # security audit
bun run validate  # check + typecheck + build + audit
```

## REST + JWT

Use REST helpers from `src/lib`:

```ts
import { api, tokenStore } from "./src/lib";

tokenStore.set(accessToken);
const profile = await api.get("/api/me");
```

Best practice: keep refresh token in `HttpOnly Secure SameSite` cookie on backend. Keep short-lived access token in memory.

## i18n

Translations live here:

```txt
src/i18n/locales/en.json
src/i18n/locales/uz.json
src/i18n/locales/ru.json
```

Routes:

- English: `/`, `/demo`
- Uzbek: `/uz`, `/uz/demo`
- Russian: `/ru`, `/ru/demo`

## Animation

Lightweight Motion example lives in:

```txt
src/components/vue/AnimatedShowcase.vue
```

It runs as a Vue island with `client:visible`, so animation JavaScript loads only when needed.

## Quality gate

Before deploy:

```bash
bun run validate
```

No GraphQL setup included. REST-first by default.
