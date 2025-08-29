#!/bin/bash

# Quick deployment script for Outlier Alpha
# This resolves the current naming issues and deploys the site

set -e  # Exit on any error

echo "🚀 Outlier Alpha - Quick Deployment Script"
echo "=========================================="

# Ensure we're in the correct directory
cd "$(dirname "$0")" || exit

# Step 1: Determine correct repository name
echo "📋 Step 1: Checking repository configuration..."

# Check current git remote
CURRENT_REMOTE=$(git remote get-url origin)
echo "Current remote: $CURRENT_REMOTE"

if [[ $CURRENT_REMOTE == *"outlier-alpha"* ]]; then
    GITHUB_USERNAME="outlier-alpha"
    REPO_NAME="outlier-alpha.github.io"
    GITHUB_PAGES_URL="https://outlier-alpha.github.io"
elif [[ $CURRENT_REMOTE == *"outlieralpha"* ]]; then
    GITHUB_USERNAME="outlieralpha"  
    REPO_NAME="outlieralpha.github.io"
    GITHUB_PAGES_URL="https://outlieralpha.github.io"
else
    echo "❌ Could not determine GitHub username from remote URL"
    echo "Please ensure your git remote is set correctly"
    exit 1
fi

echo "✅ Using GitHub username: $GITHUB_USERNAME"
echo "✅ GitHub Pages repo: $REPO_NAME"

# Step 2: Create/setup GitHub Pages repository
echo ""
echo "📂 Step 2: Setting up GitHub Pages repository..."

# Remove existing directory if it exists
if [ -d "$REPO_NAME" ]; then
    echo "Removing existing $REPO_NAME directory..."
    rm -rf "$REPO_NAME"
fi

# Clone the GitHub Pages repository
echo "Cloning $REPO_NAME repository..."
if git clone "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"; then
    echo "✅ Repository cloned successfully"
else
    echo "❌ Could not clone repository. Creating local directory..."
    echo ""
    echo "Please create the repository on GitHub first:"
    echo "1. Go to https://github.com/new"
    echo "2. Repository name: $REPO_NAME"
    echo "3. Make it PUBLIC"
    echo "4. Don't initialize with README, .gitignore, or license"
    echo "5. Then run this script again"
    echo ""
    read -p "Press Enter after creating the repository on GitHub..."
    
    # Try cloning again
    if ! git clone "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"; then
        echo "❌ Still cannot clone. Please check repository exists and is public."
        exit 1
    fi
fi

# Step 3: Build the Hugo site
echo ""
echo "🔨 Step 3: Building Hugo site..."

# Check if Hugo is installed
if ! command -v hugo &> /dev/null; then
    echo "❌ Hugo is not installed. Please install Hugo first:"
    echo "https://gohugo.io/installation/"
    exit 1
fi

# Build the site
echo "Building site with Hugo..."
# Disable minification temporarily to avoid CSS processing issues
hugo --cleanDestinationDir

if [ ! -d "public" ]; then
    echo "❌ Hugo build failed - public directory not created"
    exit 1
fi

echo "✅ Hugo build completed"

# Step 4: Deploy to GitHub Pages
echo ""
echo "🚀 Step 4: Deploying to GitHub Pages..."

# Copy built site to GitHub Pages repository
echo "Copying built site to $REPO_NAME..."
cp -r public/* "$REPO_NAME/"

# Ensure CNAME file is in place for custom domain
if [ -f "static/CNAME" ]; then
    cp static/CNAME "$REPO_NAME/"
    echo "✅ CNAME file copied for custom domain"
fi

# Change to GitHub Pages repository directory
cd "$REPO_NAME" || exit

# Configure git if needed
if ! git config user.email > /dev/null 2>&1; then
    echo "Setting up git configuration..."
    git config user.email "hello@outlieralphaventures.com"
    git config user.name "Outlier Alpha"
fi

# Add and commit changes
echo "Committing changes..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to deploy"
else
    COMMIT_MESSAGE="Deploy Outlier Alpha website - $(date '+%Y-%m-%d %H:%M:%S')"
    git commit -m "$COMMIT_MESSAGE"
    
    # Push to GitHub
    echo "Pushing to GitHub..."
    git push origin main
    
    echo ""
    echo "🎉 Deployment completed successfully!"
fi

# Step 5: Verification and next steps
echo ""
echo "📋 Step 5: Verification & Next Steps"
echo "===================================="
echo ""
echo "✅ Your site has been deployed!"
echo ""
echo "🌐 GitHub Pages URL: $GITHUB_PAGES_URL"
echo "🌐 Custom Domain: https://outlieralphaventures.com (if DNS configured)"
echo ""
echo "⏰ It may take a few minutes for changes to appear online."
echo ""
echo "🔧 Next Steps:"
echo "1. Verify your site loads at: $GITHUB_PAGES_URL"
echo "2. Set up custom domain DNS if not already done"
echo "3. Enable GitHub Pages in repository settings"
echo "4. Consider switching to GitHub Actions for automatic deployment"
echo ""
echo "📚 For ongoing updates:"
echo "   - Edit content in the content/ directory"
echo "   - Run: ./outlier-alpha-deploy.sh"
echo "   - Or use GitHub Actions (recommended)"
echo ""
echo "🎯 Deployment Summary:"
echo "   Repository: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo "   Live Site: $GITHUB_PAGES_URL"
echo "   Custom Domain: outlieralphaventures.com"
echo ""
echo "Happy publishing! 🚀"