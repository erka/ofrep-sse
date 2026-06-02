# OFREP Web Minimal

Minimal OFREP web provider demo.

## Development

```sh
npm run dev
```

Vite dev server on `:5173` proxies `/ofrep` and `/stream` to `localhost:8080`.

## Build & Serve via nginx

```sh
npm i
npm run build
docker compose up
```

Nginx on `:8080` serves the built frontend at `/`, the OFREP API at `/ofrep/v1/evaluate/flags` (POST), and SSE at `/stream`.

Edit `nginx/static/flags.json` to change flag definitions.
