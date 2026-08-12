#!/bin/bash

# Deployment script untuk GIOS x250 (192.168.1.20)
# Usage: ./scripts/deploy.sh

set -e

echo "🚀 Starting deployment to GIOS x250..."

# Configuration
DEPLOY_HOST="${DEPLOY_HOST:-192.168.1.20}"
DEPLOY_USER="${DEPLOY_USER:-your-username}"
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/optimadigitalselaras}"
SSH_PORT="${SSH_PORT:-22}"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Building project...${NC}"
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}Build failed - dist folder not found${NC}"
    exit 1
fi

echo -e "${YELLOW}Uploading to server...${NC}"
scp -P $SSH_PORT -r dist/* $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH/

echo -e "${GREEN}✅ Deployment successful!${NC}"
echo "Application deployed to: http://$DEPLOY_HOST"
echo "Deployed path: $DEPLOY_PATH"
