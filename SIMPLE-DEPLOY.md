# Simple CI/CD Setup for Virtumate

## What it does
- Tests your code when you push changes
- Builds Docker images automatically
- Deploys to your server

## Setup Steps

### 1. GitHub Secrets
Go to your GitHub repo → Settings → Secrets → Add these:

- `SERVER_HOST` - Your server IP address
- `SERVER_USER` - Username for SSH (usually "ubuntu")
- `SERVER_SSH_KEY` - Your private SSH key

### 2. Server Setup
On your server, run:

```bash
# Create app folder
sudo mkdir -p /opt/virtumate
cd /opt/virtumate

# Copy docker-compose.yml to server
# Start containers
docker-compose up -d
```

### 3. Environment Variables
Create `.env` file on your server with:

```
NODE_ENV=production
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```

## How to Deploy

1. Push code to `main` branch
2. GitHub Actions will automatically:
   - Test your code
   - Build Docker images
   - Deploy to your server

## Manual Deploy

On your server:
```bash
cd /opt/virtumate
./deploy.sh
```

## Check if it's working

- Frontend: `http://your-server-ip`
- API: `http://your-server-ip:4000`

That's it! Keep it simple. 🚀