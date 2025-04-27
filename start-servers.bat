#!/bin/bash

# Start JSON Server for the API
npx json-server --watch db.json --port 3000 & npm run start

# Start Angular development server


# Wait for both processes
wait