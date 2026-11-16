#!/bin/bash
cd /d/Projects/Github-crypto/felag
npm run dev &
DEV_PID=$!
echo "Dev server PID: $DEV_PID"
sleep 15
if curl -s http://localhost:4321/image-test/ > /dev/null 2>&1; then
  echo "Dev server is UP"
  node scripts/verify-image.mjs
  kill $DEV_PID
else
  echo "Dev server FAILED to start"
  cat /tmp/astro-dev.log 2>/dev/null
  exit 1
fi
