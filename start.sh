#!/bin/bash
pm2 start quant-syncer || pm2 restart quant-syncer
pm2 status
