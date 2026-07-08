#!/bin/bash
set -e

echo "=== quant-syncer deploy ==="

# install deps
npm install

# generate prisma client
npx prisma generate

# run migrations
npx prisma migrate deploy

# build
npm run build

# restart pm2
pm2 restart ecosystem.config.js --update-env || pm2 start ecosystem.config.js

# save pm2 process list (auto-restart on reboot)
pm2 save

echo "=== deploy done ==="
pm2 status
