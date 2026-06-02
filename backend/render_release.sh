#!/usr/bin/env bash
set -euo pipefail

# Render release helper for Django backend
# Usage (Render release command): bash backend/render_release.sh

cd backend/myproject
python manage.py migrate --noinput

echo "Database migrations applied successfully."
