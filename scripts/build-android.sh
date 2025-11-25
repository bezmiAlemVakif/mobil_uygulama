#!/usr/bin/env bash
set -euo pipefail

echo "Running Android build script inside container..."

cd /workspace

echo "Installing node modules..."
npm install --no-audit --no-fund

echo "Building web assets..."
npm run build

echo "Syncing Capacitor and preparing Android project..."
npx cap sync android

if [ -d "android" ]; then
  echo "Building Android (Gradle)..."
  cd android
  # Make gradlew executable
  chmod +x ./gradlew
  ./gradlew assembleDebug
  echo "APK(s) produced under android/app/build/outputs/apk/"
else
  echo "Android project directory not found. Make sure npx cap sync android completed successfully."
  exit 2
fi
