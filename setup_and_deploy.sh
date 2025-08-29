#!/bin/bash

# Complete setup and deployment script for GitHub Pages

# Set default commit message if not provided
COMMIT_MESSAGE=${1:-"Update site content $(date +%Y-%m-%d)"}

# Ensure we're in the correct directory
cd "$(dirname "$0")" || exit

# Check if GitHub Pages repository exists
if [ ! -d "outlieralpha.github.io" ]; then
  echo "GitHub Pages repository not found. Attempting to clone it..."
  
  # Try to clone the repository
  if ! git clone https://github.com/outlieralpha/outlieralpha.github.io.git; then
    echo "ERROR: Could not clone the repository."
    echo "Please create it first on GitHub:"
    echo "1. Go to https://github.com/new"
    echo "2. Name the repository 'outlieralpha.github.io'"
    echo "3. Make it public"
    echo "4. Create without README or other files"
    echo "5. Then run this script again"
    exit 1
  fi
  
  echo "Repository cloned successfully."
else
  echo "GitHub Pages repository found."
  
  # Update the repository to get latest changes
  echo "Updating the repository..."
  cd outlieralpha.github.io || exit
  git pull origin main
  cd .. || exit
fi

# Build the site with Hugo
echo "Building site with Hugo..."
hugo --minify

# Copy the built site to the GitHub Pages repository
echo "Copying built site to GitHub Pages repository..."
rm -rf outlieralpha.github.io/*  # Clear existing files
cp -r public/* outlieralpha.github.io/

# Change to the GitHub Pages repository
cd outlieralpha.github.io || exit

# Add all changes to git
echo "Committing changes to GitHub Pages repository..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
  echo "No changes to commit."
else
  git commit -m "$COMMIT_MESSAGE"
  
  # Push to GitHub
  echo "Pushing to GitHub..."
  git push origin main
  echo "Deploy completed! 🚀"
fi

echo "Your site should be live at https://outlieralpha.github.io in a few minutes."
