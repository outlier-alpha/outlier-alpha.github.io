#!/bin/bash

# Improved deployment script for GitHub Pages

# Set default commit message if not provided
COMMIT_MESSAGE=${1:-"Update site content $(date +%Y-%m-%d)"}

# Ensure we're in the correct directory
cd "$(dirname "$0")" || exit

# Build the site with Hugo
echo "Building site with Hugo..."
hugo --minify

# Copy the built site to the GitHub Pages repository
echo "Copying built site to GitHub Pages repository..."
cp -r public/* outlieralpha.github.io/

# Change to the GitHub Pages repository
cd outlieralpha.github.io || exit

# Add all changes to git
echo "Committing changes to GitHub Pages repository..."
git add .
git commit -m "$COMMIT_MESSAGE"

# Push to GitHub
echo "Pushing to GitHub..."
git push origin main

echo "Deploy completed! 🚀"
echo "Your site should be live at https://outlieralpha.github.io in a few minutes."
