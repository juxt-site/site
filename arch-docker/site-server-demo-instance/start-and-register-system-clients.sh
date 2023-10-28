#!/bin/bash

# Start your service in the background
bin/site-server &

# Wait for the desired line indicating readiness
while true; do
    if tail -n 1 log/app.log | grep -q "System started and ready"; then
        break
    fi
    sleep 1
done

# Execute another command once the service is ready
echo "Service is ready. Registering system clients..."
site register-system-clients --site-cli-secret demo-client-secret --insite-secret demo-client-secret

# Keep Docker running
tail -f /dev/null
