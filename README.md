# Node Express Movie API

A small TypeScript REST API for an in-memory movie catalog. The previous Express generator source is preserved under `legacy/` for reference.

## Requirements and commands

Node.js 22 or newer.

```sh
npm ci
npm run dev
```

The API listens on port `3000` by default. Set `PORT` to change it. Run checks with `npm test`, `npm run typecheck`, and `npm run build`.

## Endpoints

- `GET /health`
- `GET /movies` and `GET /movies/:id`
- `POST /movies` and `PUT /movies/:id` with `{ "title": "Arrival", "year": 2016, "genre": "Sci-fi" }`
- `DELETE /movies/:id`

Movie data lives in memory and resets when the process restarts. Add a persistent repository adapter before using this as a production data service. No license is granted unless a `LICENSE` file is present.

## Error contract

All unmatched routes and request failures return JSON with an `error` message. Malformed JSON returns 400, bodies over 32 KiB return 413, and unsupported body encodings return 415. Unexpected exceptions are logged server-side and return a generic 500 without exposing their details.

## Containers

Use `docker compose up --build` for the production image, or `docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build` for source watching. Run container tests with `docker compose -f docker-compose.yml -f docker-compose.test.yml run --build --rm node-app`. The production image compiles TypeScript, installs only runtime dependencies and runs as a non-root user on Node.js 22. No MongoDB is required. npm and `package-lock.json` are the supported installation path; historical Yarn, MongoDB and Travis definitions are preserved under `legacy/deployment/` and excluded from the image.
