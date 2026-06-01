#!/usr/bin/env bash
set -euo pipefail

# Render build helper for Django backend
# Usage (Render build command): bash backend/render_build.sh

echo "Installing Python dependencies..."
pip install --upgrade pip setuptools wheel
pip install -r backend/requirements.txt

echo "Collecting static files..."
cd backend/myproject
python manage.py collectstatic --noinput

echo "Backend build steps complete."
