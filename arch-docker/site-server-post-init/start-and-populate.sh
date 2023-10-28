#!/bin/bash

# Start your service in the background
bin/site-server &

# PID of the background process
service_pid=$!

# Function to check if the service is running
is_service_running() {
    kill -0 "$1" 2>/dev/null
}

# Wait for the desired line indicating readiness
while true; do
    if tail -n 1 log/app.log | grep -q "System started and ready"; then
        break
    fi
    sleep 1
done

# Execute another command once the service is ready
echo "Service is ready. Executing another command..."
site init --no-clients

# Check if the second command was successful
if [ $? -eq 0 ]; then
    # Second command completed successfully
    echo "Install command completed successfully."

    # Optionally, wait for the service to complete (if it's a long-running service)
    if is_service_running "$service_pid"; then
        echo "Stopping the background service..."
        kill "$service_pid"
        wait "$service_pid"  # Wait for the service to finish gracefully
    fi
else
    echo "Install command failed."
fi

# Optionally, perform cleanup or additional actions
echo "All tasks completed."
