#!/bin/bash

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Print header
echo -e "${GREEN}🚀 Starting deployment process...${NC}"

# Check if we're in the right directory
if [ ! -f "config.toml" ]; then
    echo "❌ Error: Run this script from your Hugo site's root directory"
    exit 1
fi

# Get the latest changes from git
echo -e "\n${GREEN}🔄 Pulling latest changes...${NC}"
git pull

# Install theme dependencies if needed
if [ -f "package.json" ]; then
    echo -e "\n${GREEN}📦 Installing Node.js dependencies...${NC}"
    npm install
fi

# Build the site
echo -e "\n${GREEN}🔨 Building site...${NC}"
hugo --minify --cleanDestinationDir

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi

# Show build size
echo -e "\n${GREEN}📊 Build completed. Size of public directory:${NC}"
du -sh public/

# Deploy to Netlify if netlify-cli is installed
if command -v netlify &> /dev/null; then
    echo -e "\n${GREEN}🚀 Deploying to Netlify...${NC}"
    netlify deploy --prod
else
    echo -e "\n${GREEN}ℹ️  netlify-cli not found. You can deploy by pushing to your connected Git repository.${NC}"
    echo "   Changes have been built to the 'public' directory."
    echo "   To complete deployment, commit and push your changes:"
    echo "   git add ."
    echo "   git commit -m 'Update site content'"
    echo "   git push origin main"
fi

echo -e "\n${GREEN}✅ Deployment process completed!${NC}"
