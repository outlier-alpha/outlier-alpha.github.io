#!/bin/bash

echo "🔍 GitHub Repository Setup Helper"
echo "================================="

# Get current git remote
CURRENT_REMOTE=$(git remote get-url origin 2>/dev/null || echo "No remote set")
echo "Current git remote: $CURRENT_REMOTE"

# Extract username from remote URL
if [[ $CURRENT_REMOTE == *"github.com"* ]]; then
    USERNAME=$(echo $CURRENT_REMOTE | sed 's/.*github\.com[:/]\([^/]*\)\/.*/\1/')
    REPO_NAME="$USERNAME.github.io"
    echo "Detected GitHub username: $USERNAME"
    echo "Repository should be: $REPO_NAME"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Go to: https://github.com/new"
    echo "2. Repository name: $REPO_NAME"
    echo "3. Make it PUBLIC"
    echo "4. Don't initialize with README"
    echo "5. Click 'Create repository'"
    echo "6. Then run: ./outlier-alpha-deploy.sh"
    echo ""
    echo "🌐 Your site will be available at: https://$REPO_NAME"
    echo "🎯 Custom domain: https://outlieralphaventures.com"
else
    echo "❌ No GitHub remote found. Please check your git configuration."
fi
