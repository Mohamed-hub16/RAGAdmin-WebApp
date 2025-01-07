#!/bin/bash


echo "Killing running application..."

# shellcheck disable=SC2009
PID=$(ps aux | grep 'node' | grep -v 'grep' | awk '{print $2}')

if [ -z "$PID" ]; then
    echo "No running Node.js process found!"
else
    kill -9 $PID
    echo "Node.js process with PID $PID killed."
fi
