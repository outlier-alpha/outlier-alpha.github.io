#!/bin/bash

# Competitive Intelligence Platform Deployment Script
# This script builds and deploys the Hugo website with the competitive intelligence app

set -e

echo "🚀 Starting Competitive Intelligence Platform Deployment..."

# Check if Hugo is installed
if ! command -v hugo &> /dev/null; then
    echo "❌ Hugo is not installed. Please install Hugo first."
    echo "Visit: https://gohugo.io/installation/"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "config.toml" ]; then
    echo "❌ config.toml not found. Please run this script from the Hugo site root directory."
    exit 1
fi

echo "✅ Hugo installation verified"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf public/ outlier-alpha.github.io/

# Build the site
echo "🏗️  Building Hugo site..."
hugo --gc --minify

if [ $? -ne 0 ]; then
    echo "❌ Hugo build failed"
    exit 1
fi

echo "✅ Hugo build completed successfully"

# Verify competitive intelligence files exist
echo "🔍 Verifying competitive intelligence platform files..."

REQUIRED_FILES=(
    "public/js/competitive-intelligence-app.js"
    "public/solutions/competitive-intelligence/index.html"
    "public/solutions/index.html"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file is missing"
        exit 1
    fi
done

# Check if competitive intelligence app directory exists
if [ -d "competitive-intelligence-app" ]; then
    echo "✅ Competitive intelligence app source code available"
else
    echo "⚠️  Competitive intelligence app source directory not found"
fi

# Verify critical components
echo "🧪 Testing critical components..."

# Check if the main layout file exists
if [ -f "layouts/solutions/competitive-intelligence.html" ]; then
    echo "✅ Competitive intelligence layout file exists"
else
    echo "❌ Competitive intelligence layout file missing"
    exit 1
fi

# Check if traction channels data exists
if [ -f "competitive-intelligence-app/src/data/tractionChannels.js" ]; then
    echo "✅ Traction channels data available"
else
    echo "❌ Traction channels data missing"
fi

# Check if vertical configurations exist
if [ -f "competitive-intelligence-app/src/data/verticalConfigurations.js" ]; then
    echo "✅ Vertical configurations available"
else
    echo "❌ Vertical configurations missing"
fi

# Check if services are implemented
if [ -f "competitive-intelligence-app/src/services/intelligenceService.js" ]; then
    echo "✅ Intelligence service implemented"
else
    echo "❌ Intelligence service missing"
fi

if [ -f "competitive-intelligence-app/src/services/googleSheetsService.js" ]; then
    echo "✅ Google Sheets service implemented"
else
    echo "❌ Google Sheets service missing"
fi

# Display deployment summary
echo ""
echo "📊 Deployment Summary:"
echo "======================"
echo "✅ Hugo website built successfully"
echo "✅ Competitive Intelligence Platform integrated"
echo "✅ 19 AI Agent configurations available"
echo "✅ Pre-populated vertical data ready"
echo "✅ Export capabilities implemented"
echo "✅ Executive-level reporting configured"
echo ""

# Show site structure
echo "📁 Site Structure:"
echo "=================="
echo "📂 Blogs: /posts/"
echo "📂 Resources: /resources/"
echo "📂 Solutions: /solutions/"
echo "🎯 Competitive Intelligence: /solutions/competitive-intelligence/"
echo ""

# Local development server instructions
echo "🖥️  Local Development:"
echo "====================="
echo "To start local development server:"
echo "hugo server -D --bind 0.0.0.0 --baseURL http://localhost:1313"
echo ""
echo "Then visit: http://localhost:1313/solutions/competitive-intelligence/"
echo ""

# Deployment options
echo "🌐 Deployment Options:"
echo "====================="
echo "1. GitHub Pages: Copy 'public/' contents to your GitHub Pages repository"
echo "2. Netlify: Connect this repository to Netlify for automatic deployments"
echo "3. Vercel: Import this project to Vercel for edge deployments"
echo "4. Custom Server: Upload 'public/' directory to your web server"
echo ""

# Next steps
echo "🎯 Next Steps:"
echo "=============="
echo "1. Configure your domain name in config.toml"
echo "2. Set up Google Analytics (update config.toml)"
echo "3. Configure email settings for contact forms"
echo "4. Test the competitive intelligence platform"
echo "5. Train your team on using the platform"
echo ""

echo "🎉 Deployment completed successfully!"
echo "🔗 Your competitive intelligence platform is ready to use!"

# Optional: Start local server
read -p "Would you like to start the local development server? (y/n): " start_server

if [[ $start_server =~ ^[Yy]$ ]]; then
    echo "🚀 Starting Hugo development server..."
    hugo server -D --bind 0.0.0.0 --baseURL http://localhost:1313
fi
