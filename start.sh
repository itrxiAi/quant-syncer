#!/bin/bash
pm2 start ecosystem.config.js || pm2 restart quant-syncer
pm2 status
