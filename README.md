# StudioSpace

Peer-to-peer creative workspace and production studio sharing platform. Studio owners can list their creative spaces, and creators can discover, inspect, and book them.

## Links

- Live Site: https://studiospace-client-gilt-eta.vercel.app/
- Backend API Live: https://studiospace-server-8exu.onrender.com
- Client Repo: https://github.com/mijanurdev/studiospace-client
- Server Repo: https://github.com/mijanurdev/studiospace-server
- GitHub Profile: https://github.com/mijanurdev

## Features

- Browse studios by 5 categories: Photo Studios, Sound Stages, Podcast Rooms, Music Suites, Art Workshops
- View all studios and a single studio by id, with category filter and limit support
- Add a new studio with title, category, hourly rate, security deposit, capacity, location, image, amenities, and overview
- Update and delete your own studio listings
- Create a booking for a studio with date and time slot
- View your own bookings by email
- Double-booking prevention for the same studio, date, and overlapping time
- Cancel only Pending bookings
- JWT protected routes: POST /api/studios, DELETE /api/studios/:id, and POST /api/bookings return 401 without a valid token

## Tech Stack

- JavaScript
- Express
- MongoDB Atlas
- BetterAuth JWT verified with jose via /api/auth/jwks
- CORS
- dotenv

## Setup Locally

1. Clone the repo:

```bash
git clone https://github.com/mijanurdev/studiospace-server.git
cd studiospace-server
```

2. Install packages:

```bash
npm install
```

3. Create a `.env` file in the project root:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/
CLIENT_URL=http://localhost:3000
PORT=8000
```

4. Add seed studios:

```bash
node seed.js
```

5. Start the server:

```bash
npm start
```

Server runs on http://localhost:8000

## API Endpoints

- GET / — Hello World!
- GET /api/studios — Get all studios, supports ?category= and ?limit=
- GET /api/studios/:id — Get a single studio
- POST /api/studios — Add a studio, JWT protected
- PATCH /api/studios/:id — Update a studio, JWT protected
- DELETE /api/studios/:id — Delete a studio, JWT protected
- GET /api/bookings — Get bookings, supports ?email=
- POST /api/bookings — Create a booking, JWT protected
- PATCH /api/bookings/:id/cancel — Cancel a Pending booking, JWT protected

## Seed Data

`seed.js` adds 10 studios in Dhaka across all 5 categories. Run it once with `node seed.js`. Do not run it again after adding real studios, because it clears the studios collection first.

## Test Info

- GET /api/studios and GET /api/bookings are public and return JSON.
- POST /api/studios, DELETE /api/studios/:id, and POST /api/bookings need a valid login token from the Frontend. Without a token they return 401 with `{"msg":"Unauthorized!"}`.
- Seed studios use ownerEmail `host@studiospace.com`.
- Examiner login accounts are in the Frontend repo README, because login and register live in the Frontend with BetterAuth.

## Project Files

- index.js — Express server, MongoDB connect, verifyToken, all API routes
- seed.js — 10 seed studios
- package.json — Scripts and packages
- .env — MongoDB URI and client URL, never pushed to GitHub
- .gitignore — Excludes node_modules, .env, and package-lock.json