#!/usr/bin/env sh

echo 'Starting the back-end Node.js application...'
set -x
npm run start:back &
sleep 1
echo $! > .pidfile
set +x

echo 'The back-end application is running. Check its logs or API responses for activity.'
