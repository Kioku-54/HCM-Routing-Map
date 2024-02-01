#!/bin/sh

OSRM_FILE="/data/vietnam.osrm"

# Check if the file exists
if [ -f "$OSRM_FILE" ]; then
    echo "File $OSRM_FILE already exists. Skipping the generation process."
else 
    echo "File $OSRM_FILE not found. Running commands to generate it."

    osrm-extract -p /opt/car.lua /data/vietnam.osm.pbf 
    osrm-partition /data/vietnam.osrm
    osrm-customize /data/vietnam.osrm
    echo "Commands executed successfully."

fi
    osrm-routed --algorithm mld /data/vietnam.osrm

# Run your commands to generate the file

