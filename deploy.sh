#!/bin/bash

# Usage: ./deploy_to_github.sh "Commit message"

# Set default commit message if not provided
COMMIT_MESSAGE=${1:-"Update site content $(date +%Y-%m-%d)"}

# Ensure we're in the correct directory
cd "$(dirname "$0")" || exit

# Build the site
echo "Building site with Hugo..."
hugo --minify

# Add all changes to git
echo "Committing changes to Git..."
git add .
git commit -m "$COMMIT_MESSAGE"

# Push to GitHub
echo "Pushing to GitHub..."
git push origin main

echo "Deploy triggered! 🚀"
echo "GitHub Actions will now build and deploy your site."
echo "Your site should be live at https://outlieralpha.github.io in a few minutes."
echo "Check deployment status at: https://github.com/outlieralpha/outlieralpha.github.io/actions"
