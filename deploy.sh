#!/bin/bash
set -e

echo "=== quant-syncer deploy ==="

npm install
npx prisma generate
npx prisma migrate deploy

pm2 restart ecosystem.config.js --update-env || pm2 start ecosystem.config.js
pm2 save

echo "=== deploy done ==="
pm2 status
