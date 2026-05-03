# 🧑‍🚀 Astronaunt

Fast Astro starter for multilingual REST projects.

## What is inside?

- Astro 6 + Vue islands
- Tailwind CSS 4 + DaisyUI
- Biome instead of ESLint/Prettier
- REST API client in `src/lib/http.ts`
- JWT helper utilities in `src/lib/auth.ts`
- i18n dictionaries for English, Uzbek, and Russian
- Remotion video composition starter
- CI + Dependabot + npm audit

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev       # local dev server
npm run build     # production build
npm run preview   # preview build
npm run check     # Biome lint + format check
npm run format    # format files
npm run audit     # security audit
npm run validate  # check + typecheck + build + audit
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

## Remotion

```bash
npm run video:studio
npm run video:render
```

Composition entry: `src/remotion/Root.tsx`.

## Quality gate

Before deploy:

```bash
npm run audit
npm run validate
```

No GraphQL setup included. REST-first by default.
