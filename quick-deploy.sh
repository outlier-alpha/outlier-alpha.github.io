#!/bin/bash

echo "🚀 Building and deploying updated Outlier Alpha website..."
echo "=================================================="

# Navigate to Hugo site directory
cd /Users/outlieralpha/Weblog

# Build the Hugo site
echo "📦 Building Hugo site..."
hugo --cleanDestinationDir

# Copy to GitHub Pages directory
echo "📁 Copying files to GitHub Pages..."
cp -r public/* outlier-alpha.github.io/

# Navigate to GitHub Pages directory
cd outlier-alpha.github.io

# Add CNAME file
echo "outlieralphaventures.com" > CNAME

# Git operations
echo "📤 Deploying to GitHub Pages..."
git add .
git commit -m "Update site: AI powered Strategy, Investments & Business Innovation | Made in India 🇮🇳"
git push origin main

echo ""
echo "✅ Deployment completed!"
echo "🌐 GitHub Pages: https://outlier-alpha.github.io"
echo "🌐 Custom Domain: https://outlieralphaventures.com" 
echo ""
echo "⏰ Changes will be live in 2-5 minutes"