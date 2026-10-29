# Contact form relay

A tiny Vercel function that forwards the portfolio contact form to a Telegram bot,
so the bot token stays secret (GitHub Pages can't hold secrets).

Deploy: import this repo on Vercel with **Root Directory = `relay`**, add env vars
`BOT_TOKEN` (from @BotFather) and `CHAT_ID` (your Telegram ID, e.g. from @userinfobot).
Then set `contacts.relay` in `src/content.ts` to `https://<project>.vercel.app/api/contact`.
