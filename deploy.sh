#!/bin/bash

echo "🚀 Deploying Virtumate..."

# Pull latest images
echo "📦 Pulling latest images..."
docker-compose pull

# Stop old containers
echo "🛑 Stopping old containers..."
docker-compose down

# Start new containers
echo "▶️ Starting new containers..."
docker-compose up -d

# Clean up old images
echo "🧹 Cleaning up..."
docker image prune -f

echo "✅ Deployment complete!"
echo "🌐 Frontend: http://localhost"
echo "🔗 API: http://localhost:4000"