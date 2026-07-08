#!/bin/bash
pm2 stop quant-syncer 2>/dev/null || true
pm2 delete quant-syncer 2>/dev/null || true
echo "quant-syncer stopped"
