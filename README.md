# jsonplaceholder-sdk

JsonPlaceholder SDK for various JavaScript frameworks

## Development

### Installation

```bash
docker compose exec node pnpm install
```

### Docker Compose Startup

```bash
docker compose up --detach
```

### JsonPlaceholder SDK

#### React

##### Build

```bash
docker compose exec node pnpm --filter @jsonplaceholder-sdk/react run build
```

### Client

#### React

##### Development

```bash
docker compose exec node pnpm --filter @client/react run dev
```

### Docker Compose Shutdown

```bash
docker compose down --remove-orphans --volumes --timeout 0
```
