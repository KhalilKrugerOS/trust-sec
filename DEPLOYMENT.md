# EC2 Deployment Guide

## Prerequisites
- EC2 instance running (Ubuntu 22.04 recommended)
- SSH access to EC2 instance
- Domain name pointed to EC2 IP (optional, can use IP)

## Step 1: Initial EC2 Setup (One-time)

SSH into your EC2 instance:
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

Upload and run the setup script:
```bash
# From your local machine
scp -i your-key.pem ec2-setup.sh ubuntu@your-ec2-ip:~/

# On EC2
chmod +x ec2-setup.sh
./ec2-setup.sh
```

## Step 2: Clone Repository

```bash
git clone https://github.com/KhalilKrugerOS/trust-sec.git
cd trust-sec
```

## Step 3: Configure Environment Variables

Create `.env` file on EC2:
```bash
nano .env
```

Add your production environment variables:
```env
NODE_ENV=production
DATABASE_URL="your-production-database-url"
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="https://your-domain.com"
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-aws-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret"
AWS_ENDPOINT_URL_S3=""
AWS_ENDPOINT_URL_IAM=""
NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES="your-bucket-name"
RESEND_API_KEY="your-resend-key"
AUTH_GOOGLE_CLIENT_ID="your-google-id"
AUTH_GOOGLE_CLIENT_SECRET="your-google-secret"
```

## Step 4: Configure Nginx

```bash
# Copy nginx config
sudo cp nginx-ec2.conf /etc/nginx/sites-available/trust-sec

# Edit with your domain/IP
sudo nano /etc/nginx/sites-available/trust-sec

# Enable the site
sudo ln -s /etc/nginx/sites-available/trust-sec /etc/nginx/sites-enabled/

# Remove default config
sudo rm /etc/nginx/sites-enabled/default

# Test nginx config
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

## Step 5: Deploy Application

```bash
chmod +x deploy.sh
./deploy.sh
```

## Step 6: Setup SSL (Optional but Recommended)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is set up automatically
```

## Useful Commands

### PM2 Process Management
```bash
pm2 status                    # Check app status
pm2 logs trust-sec           # View logs
pm2 restart trust-sec        # Restart app
pm2 stop trust-sec           # Stop app
pm2 delete trust-sec         # Delete app from PM2
```

### View Logs
```bash
pm2 logs trust-sec --lines 100
```

### Update Code
```bash
cd ~/trust-sec
git pull origin main
./deploy.sh
```

## Security Checklist
- [ ] Change default SSH port
- [ ] Use SSH keys (disable password auth)
- [ ] Setup UFW firewall
- [ ] Enable SSL/HTTPS
- [ ] Use environment variables (never commit .env)
- [ ] Regular security updates: `sudo apt update && sudo apt upgrade`
- [ ] Setup automated backups
- [ ] Use separate IAM user for S3 with minimal permissions

## Monitoring
```bash
# Check server resources
htop

# Check nginx status
sudo systemctl status nginx

# Check disk space
df -h

# Monitor PM2
pm2 monit
```
