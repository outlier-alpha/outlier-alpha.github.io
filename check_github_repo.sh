#!/bin/bash

# Script to check GitHub Pages repository status

# Check if the outlieralpha.github.io repository exists and is set up correctly
if [ -d "outlieralpha.github.io" ]; then
  echo "GitHub Pages repository exists"
  
  # Check if it's a git repository
  if [ -d "outlieralpha.github.io/.git" ]; then
    echo "It is a valid git repository"
    
    # Check repository status
    echo "Repository status:"
    cd outlieralpha.github.io || exit
    git status
    echo ""
    echo "Remote URLs:"
    git remote -v
    
    # Check if an index.html file exists
    if [ -f "index.html" ]; then
      echo "index.html exists in the repository"
    else
      echo "WARNING: No index.html file found in the repository"
      echo "This is likely why you're seeing a 404 error"
    fi
    
  else
    echo "ERROR: Not a valid git repository"
  fi
else
  echo "ERROR: GitHub Pages repository not found at outlieralpha.github.io"
  echo "You need to clone the repository first:"
  echo "git clone https://github.com/outlieralpha/outlieralpha.github.io.git"
fi
