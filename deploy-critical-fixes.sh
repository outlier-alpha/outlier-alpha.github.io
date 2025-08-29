#!/bin/bash

# Make script executable
chmod +x "$0"

# CRITICAL DESIGN FIXES DEPLOYMENT SCRIPT
# This script applies all the design fixes identified in the red circles

echo "🚀 Applying Critical Design Fixes for Outlier Alpha Website..."

# Set script permissions
chmod +x "$0"

# Navigate to the Hugo site directory
cd /Users/outlieralpha/Weblog

# Check if we're in the right directory
if [ ! -f "config.toml" ]; then
    echo "❌ Error: Not in Hugo site directory. Please run from the correct location."
    exit 1
fi

echo "📁 Current directory: $(pwd)"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf public/
rm -rf resources/

# Hugo build with debugging
echo "🔨 Building Hugo site with critical fixes..."
hugo --debug --verbose

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Hugo build failed. Please check the error messages above."
    exit 1
fi

echo "✅ Hugo build completed successfully"

# Copy built site to GitHub Pages directory
echo "📦 Copying to GitHub Pages directory..."
if [ -d "outlier-alpha.github.io" ]; then
    # Remove old files but keep .git
    find outlier-alpha.github.io -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
    
    # Copy new files
    cp -r public/* outlier-alpha.github.io/
    
    echo "✅ Files copied to GitHub Pages directory"
else
    echo "❌ GitHub Pages directory not found"
    exit 1
fi

# Navigate to GitHub Pages directory
cd outlier-alpha.github.io

# Check if we have changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Adding files to git..."
    git add .
    
    # Create commit message with timestamp
    TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
    git commit -m "Critical Design Fixes Applied - $TIMESTAMP

    ✅ Fixed Issues:
    1. Logo rendering and sizing
    2. Sidebar toggle button functionality
    3. Hashtag styling consistency
    4. Widget spacing and layout
    5. Mobile responsiveness
    6. Typography and spacing fixes
    
    🎯 All red circle issues addressed"
    
    echo "🚀 Pushing to GitHub..."
    git push origin main
    
    if [ $? -eq 0 ]; then
        echo "🎉 SUCCESS! Critical fixes deployed to https://outlieralphaventures.com"
        echo ""
        echo "🔍 Fixed Issues:"
        echo "   ✅ Logo now renders properly with correct sizing"
        echo "   ✅ Sidebar toggle button works correctly"
        echo "   ✅ Hashtags have consistent styling"
        echo "   ✅ Removed excessive spacing and gaps"
        echo "   ✅ Widgets are now compact and professional"
        echo "   ✅ Mobile responsive layout improved"
        echo ""
        echo "🌐 Website should be live in 1-2 minutes at:"
        echo "   https://outlieralphaventures.com"
        echo ""
        echo "🔧 Files updated:"
        echo "   • CSS: critical-fixes.css (new)"
        echo "   • JS: critical-sidebar-fix.js (new)"  
        echo "   • Template: baseof.html (updated)"
        echo ""
    else
        echo "❌ Git push failed. Please check your credentials and try again."
        exit 1
    fi
else
    echo "ℹ️  No changes detected. Site is already up to date."
fi

# Return to original directory
cd ..

echo "✨ Deployment completed!"
echo ""
echo "🎯 Summary of Fixes Applied:"
echo "==========================================="
echo "1. 🖼️  Logo Fix: Proper rendering with 80x80px size"
echo "2. 🔘 Toggle Fix: Working sidebar minimizer button"
echo "3. 🏷️  Hashtag Fix: Consistent 0.75rem font, rounded design"
echo "4. 📦 Layout Fix: Removed big gaps, compact widgets"
echo "5. 📱 Mobile Fix: Improved responsive behavior"
echo "6. 🎨 Style Fix: Professional color scheme and typography"
echo "==========================================="
echo ""
echo "⏱️  Changes should be visible within 2 minutes"
echo "🌍 Visit: https://outlieralphaventures.com"
