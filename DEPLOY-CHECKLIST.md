# Simple Deployment Checklist ✅

## Before You Start
- [yes] Have a server ready (DigitalOcean, AWS, etc.)
- [yes] Docker installed on server
- [yes] SSH access to server

## Setup Steps

### 1. GitHub Setup
- [yes] Add secrets in GitHub repo settings:
  - `SERVER_HOST` (your server IP)
  - `SERVER_USER` (usually "ubuntu")    
  - `SERVER_SSH_KEY` (your private SSH key)

### 2. Server Setup
```bash
# On your server
mkdir -p /opt/virtumate
cd /opt/virtumate
# Copy docker-compose.yml here
```

### 3. Environment Setup
- [ ] Create `.env` file on server
- [ ] Add MongoDB connection string
- [ ] Add JWT secret

### 4. First Deploy
- [ ] Push code to `main` branch
- [ ] Check GitHub Actions (should be green ✅)
- [ ] Visit your website

## Testing
- [ ] Frontend loads: `http://your-server-ip`
- [ ] API works: `http://your-server-ip:4000/health`
- [ ] Can create account and login

## That's it! 🎉

If something breaks:
1. Check GitHub Actions logs
2. Check server with: `docker-compose logs`
3. Restart with: `docker-compose restart`