# Ujala Maurya — Portfolio (Full Stack)

A premium, animated personal portfolio built with React + Vite + Tailwind + Framer Motion on the
frontend, and Node.js + Express + MongoDB on the backend.

```
project/
  client/    React + Vite frontend
  server/    Node/Express/MongoDB backend
```

---

## 1. Prerequisites

- Node.js 18+ and npm
- A MongoDB Atlas account (free tier is enough) — https://www.mongodb.com/cloud/atlas
- Git

---

## 2. Backend setup (`server/`)

```bash
cd server
npm install
cp .env.example .env
```

Open `.env` and fill in:

- `MONGODB_URI` — from MongoDB Atlas → Database → Connect → Drivers
- `JWT_SECRET` — any long random string (e.g. generate one with `openssl rand -hex 32`)
- `CLIENT_ORIGIN` — the URL your frontend runs on (`http://localhost:5173` for local dev)
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — the login you'll use for `/admin/login` on the site
- `AI_API_KEY` / `AI_PROVIDER` — optional. Leave blank to use the built-in rule-based demo
  assistant for "Ask Ujala AI" (no external API needed, works out of the box).
- `GITHUB_USERNAME` / `GITHUB_TOKEN` — optional, for live GitHub stats later.

Seed the database with starter projects, skills, certificates, and your admin account:

```bash
npm run seed
```

Start the server:

```bash
npm run dev
```

The API runs at `http://localhost:5000/api`. Check `http://localhost:5000/api/health`.

### Certificate images
The seed script uses placeholder image URLs for certificates. Upload your real certificate
images somewhere (e.g. Cloudinary, an S3 bucket, or just drop them in `client/public/certs/`
and reference them as `/certs/filename.jpg`), then update the certificate documents via the
admin dashboard or by editing `seed.js` before re-seeding.

---

## 3. Frontend setup (`client/`)

```bash
cd client
npm install
cp .env.example .env
```

Set `VITE_API_URL` in `.env` to your backend's API URL (`http://localhost:5000/api` for local dev).

Run the dev server:

```bash
npm run dev
```

Visit `http://localhost:5173`.

Build for production:

```bash
npm run build
```

This outputs static files to `client/dist/`.

---

## 4. Using the admin dashboard

1. Go to `/admin/login` on your deployed (or local) site.
2. Log in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set before seeding.
3. From `/admin/dashboard` you can add/delete projects and read contact messages.
   (Skills/certificates management via the API is included on the backend; the dashboard UI
   currently focuses on projects and messages — extend `AdminDashboard.jsx` the same way to
   add UI for skills/certificates if you want full CRUD from the browser.)

Passwords are hashed with bcrypt before being stored — never stored in plain text.

---

## 5. Deployment

### Database — MongoDB Atlas
1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Add a database user and allow network access from anywhere (or your host's IPs)
3. Copy the connection string into `MONGODB_URI`

### Backend — Render or Railway
1. Push this repo to GitHub
2. Create a new Web Service on Render (or Railway), pointing at the `server/` folder
3. Set the environment variables from `server/.env.example` in the host's dashboard
4. Build command: `npm install` — Start command: `npm start`
5. After first deploy, run `npm run seed` once (Render/Railway both support one-off shell commands)

### Frontend — Vercel or Netlify
1. Import the repo, set the project root to `client/`
2. Build command: `npm run build` — Output directory: `dist`
3. Set `VITE_API_URL` to your deployed backend's URL (e.g. `https://your-api.onrender.com/api`)
4. Update `CLIENT_ORIGIN` on the backend to match your deployed frontend URL

### After deployment
- Update `client/public/robots.txt` and `sitemap.xml` with your real domain
- Update the Open Graph/Twitter meta tags in `client/index.html` if you add a preview image

---

## 6. Security notes

- No API keys are ever sent to the frontend — the AI key and GitHub token live only in the
  server's `.env` file and are read via `process.env`.
- Passwords are hashed with bcrypt (12 salt rounds).
- Admin routes (`create/update/delete` for projects, skills, certificates; reading messages)
  require a valid JWT via the `Authorization: Bearer <token>` header.
- Rate limiting is applied globally, with stricter limits on the contact form, AI chat, and
  login endpoints to reduce abuse.
- Input is validated and lightly sanitized server-side (see `server/utils/validators.js`).
- CORS is restricted to the origin(s) listed in `CLIENT_ORIGIN`.
- Never commit your real `.env` file — only `.env.example` is tracked.

---

## 7. What's a demo/fallback right now

- **Ask Ujala AI** — works immediately with a rule-based knowledge base (no key needed).
  To connect a real AI provider, fill in `AI_API_KEY`/`AI_PROVIDER` and complete the
  `callConfiguredProvider` function in `server/controllers/aiController.js`.
- **GitHub Activity** — shows a static fallback card. Wire up the GitHub REST API using
  `GITHUB_USERNAME`/`GITHUB_TOKEN` in a new controller/route if you want live repo stats.
- **Resume download** — the "Download Resume" button currently shows a toast reminding you
  to connect a real file. Add your resume PDF to `client/public/` and point the button at it.

---

## 8. Tech stack summary

**Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, React Router, Lucide icons
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth, bcrypt, express-rate-limit
