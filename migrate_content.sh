#!/bin/bash

# WordPress to Hugo Migration Helper Script
# Usage: ./migrate_content.sh

echo "WordPress to Hugo Migration Helper"
echo "=================================="

# Function to create a new post
create_post() {
    echo "Creating new post..."
    read -p "Enter post title: " title
    read -p "Enter category (public-equity-investments/sector-research/philosophy-tech): " category
    read -p "Enter tags (comma-separated): " tags
    
    # Convert title to filename
    filename=$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/[^a-z0-9-]//g')
    
    # Get current date
    date=$(date +%Y-%m-%d)
    
    # Create post file
    cat > "content/$category/$filename.md" << EOF
---
title: "$title"
date: $date
categories: ["$(echo $category | sed 's/-/ /g')"]
tags: [$(echo "$tags" | sed 's/,/", "/g' | sed 's/^/"/' | sed 's/$/"/')])
author: "Outlier Alpha"
description: "Brief description for $title"
draft: false
---

# $title

**Bottom Line**: Key insight in 1-2 sentences

## Your content here

[Paste and format your WordPress content]

---

*Add your standard disclaimer here*
EOF

    echo "Created: content/$category/$filename.md"
    echo "Edit the file to add your content!"
}

# Function to setup categories
setup_categories() {
    echo "Setting up category structure..."
    mkdir -p content/public-equity-investments
    mkdir -p content/sector-research  
    mkdir -p content/philosophy-tech
    echo "✅ Category directories created"
}

# Main menu
echo "Choose an option:"
echo "1. Setup category structure"
echo "2. Create new post"
echo "3. Test Hugo server"
echo "4. Deploy to GitHub"

read -p "Enter choice (1-4): " choice

case $choice in
    1)
        setup_categories
        ;;
    2)
        create_post
        ;;
    3)
        echo "Starting Hugo development server..."
        hugo server -D
        ;;
    4)
        echo "Deploying to GitHub..."
        git add .
        git commit -m "Update blog content"
        git push
        ;;
    *)
        echo "Invalid choice"
        ;;
esac
