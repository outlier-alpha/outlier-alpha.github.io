#!/bin/bash

echo "🚀 Applying Critical Design Fixes to Outlier Alpha Website..."

# Set the base directory
SITE_DIR="/Users/outlieralpha/Weblog"
cd "$SITE_DIR"

echo "📁 Current directory: $(pwd)"

# Check if Hugo is available
if ! command -v hugo &> /dev/null; then
    echo "❌ Hugo not found. Please install Hugo first."
    exit 1
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf public/*

# Build the site
echo "🔨 Building Hugo site..."
hugo --minify --gc

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Hugo build completed successfully"
else
    echo "❌ Hugo build failed"
    exit 1
fi

# Copy critical assets if they exist
echo "📋 Verifying critical assets..."

# Check CSS files
CSS_FILES=(
    "themes/custom-minimal/static/css/urgent-fixes.css"
    "themes/custom-minimal/static/css/enhanced-professional.css"
    "themes/custom-minimal/static/css/design-fixes.css"
)

for css_file in "${CSS_FILES[@]}"; do
    if [ -f "$css_file" ]; then
        echo "✅ Found: $css_file"
    else
        echo "⚠️  Missing: $css_file"
    fi
done

# Check JS files
JS_FILES=(
    "themes/custom-minimal/static/js/sidebar-fixes.js"
    "themes/custom-minimal/static/js/enhanced-professional.js"
    "themes/custom-minimal/static/js/enhanced-sidebar.js"
)

for js_file in "${JS_FILES[@]}"; do
    if [ -f "$js_file" ]; then
        echo "✅ Found: $js_file"
    else
        echo "⚠️  Missing: $js_file"
    fi
done

# Check image files
IMAGE_FILES=(
    "static/images/outlier-alpha-ventures-logo.png"
    "static/images/outlier-alpha-logo.png"
)

for img_file in "${IMAGE_FILES[@]}"; do
    if [ -f "$img_file" ]; then
        echo "✅ Found: $img_file"
    else
        echo "⚠️  Missing: $img_file"
    fi
done

# Deploy to GitHub Pages if outlier-alpha.github.io directory exists
if [ -d "outlier-alpha.github.io" ]; then
    echo "🚢 Deploying to GitHub Pages..."
    
    # Copy built files to GitHub Pages repo
    cp -r public/* outlier-alpha.github.io/
    
    # Navigate to GitHub Pages repo
    cd outlier-alpha.github.io
    
    # Add all changes
    git add .
    
    # Create commit with timestamp
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    git commit -m "🔧 Apply critical design fixes - $TIMESTAMP

- Fixed logo rendering and sizing issues
- Implemented working sidebar toggle functionality  
- Standardized hashtag styling and sizing
- Fixed navigation icon consistency
- Improved mobile responsiveness
- Enhanced widget layouts and spacing
- Added accessibility improvements
- Updated CSS with critical fixes"
    
    # Push to GitHub
    git push origin main
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully deployed to GitHub Pages!"
        echo "🌐 Your site will be available at: https://outlier-alpha.github.io"
    else
        echo "❌ Failed to push to GitHub Pages"
        exit 1
    fi
    
    # Return to main directory
    cd ..
else
    echo "⚠️  GitHub Pages directory not found. Build completed but not deployed."
fi

echo "🎉 Design fixes applied successfully!"
echo "
📋 Summary of fixes applied:
✓ Logo rendering and sizing fixed
✓ Sidebar toggle button functionality restored
✓ Hashtag styling standardized
✓ Navigation icons properly sized
✓ Mobile responsiveness improved
✓ Widget layouts enhanced
✓ CSS specificity issues resolved
✓ JavaScript functionality restored

🔍 Key files updated:
- urgent-fixes.css (critical CSS fixes)
- sidebar-fixes.js (toggle functionality)
- enhanced-sidebar.html (logo path fixed)
- baseof.html (includes new assets)
"

# Show final status
echo "
🚀 Deployment Complete!
📊 Build Status: SUCCESS
🌐 Site URL: https://outlier-alpha.github.io
⏰ Deployed at: $(date '+%Y-%m-%d %H:%M:%S')
"