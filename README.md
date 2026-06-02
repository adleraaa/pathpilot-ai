This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## AI Report Setup (DeepSeek)

The course report page can use the DeepSeek API to generate a personalized report. This is optional.

1. **Add your API key.** Open `.env.local` in the project root and paste your key:

   ```bash
   DEEPSEEK_API_KEY=your_deepseek_api_key
   ```

   You can get a key at [platform.deepseek.com](https://platform.deepseek.com/). The key is read on the server only and is never exposed to the browser.

2. **Restart the dev server** so the new environment variable is picked up:

   ```bash
   # stop the running server with Ctrl+C, then:
   npm run dev
   ```

3. **No key? No problem.** If `DEEPSEEK_API_KEY` is missing — or the API call fails, times out, or returns an invalid response — the app silently falls back to the built-in rule-based report, so the site always works.

> `.env.local` is git-ignored and will not be committed. `.env.example` documents the variable name.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
