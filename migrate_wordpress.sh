#!/bin/bash

# This script helps migrate content from WordPress to Hugo
# Usage: ./migrate_wordpress.sh wordpress_export.xml

if [ $# -ne 1 ]; then
  echo "Usage: $0 wordpress_export.xml"
  exit 1
fi

# Create necessary directories
mkdir -p content/posts/imported
mkdir -p content/resources/book-reviews
mkdir -p content/resources/podcast-summaries
mkdir -p content/resources/ai-hacks
mkdir -p content/resources/prompt-library
mkdir -p content/resources/code-corner
mkdir -p static/images/imported

# Use WordPress to Hugo importer (example)
# Replace with the actual import command you want to use
echo "Starting WordPress import from $1"
echo "For a full migration, consider using wordpress-to-hugo-exporter WordPress plugin"
echo "or a dedicated tool like wordpress-export-to-markdown"

# Example of how to manually migrate posts:
# 1. Export WordPress content as XML
# 2. Use a tool like wordpress-export-to-markdown or ExitWP to convert to Markdown
# 3. Move the converted files to the correct Hugo directories
# 4. Update front matter as needed

echo "Migration script completed. Manual steps required:"
echo "1. Convert WordPress posts to Markdown format"
echo "2. Update front matter to match Hugo requirements"
echo "3. Move images to static/images/imported/"
echo "4. Update image paths in Markdown files"
echo "5. Categorize content into appropriate directories"
