#!/bin/sh
set -e

# Apply pending migrations before serving traffic.
if [ -n "$DATABASE_URL" ]; then
  echo "Running prisma migrate deploy..."
  node ./node_modules/prisma/build/index.js migrate deploy
fi

echo "Starting LexCursor on port ${PORT:-3000}..."
exec node server.js
