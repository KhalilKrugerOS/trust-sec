#!/bin/bash

# EC2 Initial Setup Script - Docker Version
# Run this once on your EC2 instance

set -e

echo "🔧 Setting up EC2 instance for Docker deployment..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker
echo "📦 Installing Docker..."
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add user to docker group
sudo usermod -aG docker $USER

# Install Git (if not already installed)
echo "📦 Installing Git..."
sudo apt install -y git

# Configure firewall
echo "🔒 Configuring firewall..."
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

echo "✅ EC2 setup complete!"
echo ""
echo "⚠️  IMPORTANT: Log out and log back in for Docker permissions to take effect!"
echo ""
echo "Next steps:"
echo "1. Log out: exit"
echo "2. Log back in: ssh -i your-key.pem ubuntu@your-ec2-ip"
echo "3. Clone your repository: git clone https://github.com/KhalilKrugerOS/trust-sec.git"
echo "4. Navigate to project: cd trust-sec"
echo "5. Create .env file with production variables"
echo "6. Run deployment: docker compose up -d --build"
