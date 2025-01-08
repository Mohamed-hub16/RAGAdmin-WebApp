#!/usr/bin/env sh

echo 'Building the Node.js/React application for production...'
echo 'This creates a production-ready build in the "build" directory.'
set -x
npm run build
set +x

echo 'Starting the front-end React application...'
echo 'Running the application on a custom HOST and PORT.'
set -x
HOST=192.168.0.1 PORT=4000 npm run start:front &
sleep 1
echo $! > .pidfile
set +x

echo 'Visit http://192.168.0.1:4000 to see your React application in action.'
