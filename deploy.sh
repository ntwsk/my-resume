#!/usr/bin/env bash
set -e

echo "Building for production..."
npm run build

echo "Deploying to GitHub Pages..."
npm run deploy

echo "Done! Visit https://ntwsk.github.io/my-resume/"
