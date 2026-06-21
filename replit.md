# Restaurant Project

A Vue.js 3 web application for managing restaurant listings. Users can sign up, log in, and perform CRUD operations (add, update, delete) on restaurant records.

## Tech Stack

- **Frontend**: Vue.js 3 with Vue Router 4, built with Vue CLI
- **HTTP Client**: Axios
- **Backend API**: Custom Node.js HTTP server (no external dependencies)
- **Data Store**: `db.json` — a local JSON file used as a mock database

## Project Structure

- `src/` — Vue.js source code (components, router)
- `src/components/` — Page components (Home, SignUp, Login, Add, Update, Header, Footer)
- `src/routers.js` — Vue Router configuration
- `server.js` — Lightweight Node.js REST API server (replaces json-server)
- `db.json` — Mock database (users + restaurants)
- `vue.config.js` — Vue CLI dev server config (port 5000, host 0.0.0.0)

## Running the App

Two processes run together:

1. **API Server** — `node server.js` on `localhost:3000`
2. **Frontend** — `npm run serve` on `0.0.0.0:5000`

## Notes

- The API server (`server.js`) is a custom-built REST API that mimics json-server behavior. It was built because json-server has CVEs that are blocked by Replit's security policy.
- npm overrides are set for `shell-quote`, `form-data`, `sha.js`, and `pbkdf2` to bypass security-blocked older versions pulled in by Vue CLI's dependency tree.

## User Preferences

