#!/bin/bash

# Docker Deployment script for EC2
# Usage: ./deploy.sh

set -e

echo "🚀 Starting Docker deployment to EC2..."

# Pull latest changes
echo "📥 Pulling latest code..."
git pull origin main

# Stop existing containers
echo "� Stopping existing containers..."
docker compose down

# Build and start containers
echo "🏗️ Building and starting containers..."
docker compose up -d --build

# Show container status
echo "📊 Container status:"
docker compose ps

# Show logs
echo "📝 Recent logs:"
docker compose logs --tail=50

echo "✅ Deployment complete!"
echo ""
echo "Useful commands:"
echo "  View logs:        docker compose logs -f"
echo "  View status:      docker compose ps"
echo "  Restart:          docker compose restart"
echo "  Stop:             docker compose down"
