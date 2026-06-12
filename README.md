# Orbas CRM

Next.js CRM app backed by Supabase.

## Local Development

Create `.env.local` from `.env.example`, then run:

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

```sh
npm run build
```

## Vercel Deployment

Import the GitHub repository into Vercel as a Next.js project. Use the default commands:

- Install command: `npm install`
- Build command: `npm run build`
- Output directory: leave blank

Set these Vercel environment variables for Production, Preview, and Development as needed:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_ACCESS_TOKEN`

The `SUPABASE_*` server/admin values must stay in Vercel environment variables and must not be committed.

## Seed Scripts

The seed scripts require the env vars listed in `.env.example`.

```sh
node scripts/seed.mjs
node scripts/reseed.mjs
```
