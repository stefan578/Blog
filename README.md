# Starlog

A custom full-stack blog built with Next.js, TypeScript, MongoDB, Mongoose, and Better Auth. Visitors can read stories; signed-in users can publish stories under their account name.

## Run locally

1. Install Node.js 20.9 or newer.
2. Copy `.env.example` to `.env.local` and fill in the values.
3. Create a MongoDB Atlas database and put its connection string in `MONGO_URI`.
4. Set `BETTER_AUTH_URL` to `http://localhost:3000` and use a long random value for `BETTER_AUTH_SECRET`.
5. Install dependencies and start the dev server:

   ```sh
   npm install
   npm run dev
   ```

Open http://localhost:3000. Create an account on `/signin`. Signed-in accounts can publish from **Add a blog**; signed-out visitors are prompted to sign in first.

## Deploy to Vercel

1. Put the project in a GitHub repository and import that repository in Vercel.
2. Add `MONGO_URI`, `BETTER_AUTH_URL`, and `BETTER_AUTH_SECRET` in the Vercel project's environment variables. Set `BETTER_AUTH_URL` to the deployed site's origin, such as `https://your-site.vercel.app`.
3. Ensure your MongoDB Atlas network access settings allow the deployed app to connect.
4. Deploy, then create an account and publish a test post on the deployed site.

Never commit `.env.local` or expose database credentials in client-side code. The site currently allows every signed-in account to publish, as intended; consider moderation or rate limits before opening registration widely.
