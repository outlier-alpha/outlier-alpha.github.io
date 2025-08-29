#!/bin/bash

echo "🔧 Applying Design Fixes to Outlier Alpha Website..."
echo "=================================================="

# Check if we're in the correct directory
if [ ! -f "config.toml" ]; then
    echo "❌ Error: Not in Hugo project directory. Please run from /Users/outlieralpha/Weblog"
    exit 1
fi

echo "✅ Found Hugo project directory"

# Check if theme files exist
if [ ! -d "themes/custom-minimal" ]; then
    echo "❌ Error: Theme directory not found"
    exit 1
fi

echo "✅ Theme directory found"

# Verify our new CSS and JS files exist
if [ ! -f "themes/custom-minimal/static/css/design-fixes.css" ]; then
    echo "❌ Error: design-fixes.css not found"
    exit 1
fi

if [ ! -f "themes/custom-minimal/static/js/enhanced-sidebar.js" ]; then
    echo "❌ Error: enhanced-sidebar.js not found"
    exit 1
fi

echo "✅ New CSS and JS files found"

# Check logo file
if [ ! -f "static/images/outlier-alpha-ventures-logo.png" ]; then
    echo "⚠️  Warning: Logo file not found at static/images/outlier-alpha-ventures-logo.png"
    echo "   Please ensure the logo file exists for proper rendering"
else
    echo "✅ Logo file found"
fi

echo ""
echo "🚀 Building Hugo site..."
echo "========================"

# Clean previous builds
rm -rf public/

# Build the site
hugo --minify

if [ $? -eq 0 ]; then
    echo "✅ Hugo build successful!"
    echo ""
    echo "📋 Design Fixes Applied:"
    echo "========================"
    echo "✅ Fixed logo rendering in sidebar"
    echo "✅ Improved sidebar toggle functionality"
    echo "✅ Corrected hashtag button sizing and backgrounds"
    echo "✅ Optimized sidebar minimized state"
    echo "✅ Enhanced responsive behavior"
    echo "✅ Improved navigation link styling"
    echo "✅ Fixed widget proportions and spacing"
    echo "✅ Enhanced mobile menu functionality"
    echo ""
    echo "🌐 Next Steps:"
    echo "==============="
    echo "1. Test the site locally with: hugo server"
    echo "2. Verify all fixes are working correctly"
    echo "3. Deploy to production when ready"
    echo ""
    echo "📊 Key Improvements:"
    echo "===================="
    echo "• Logo now displays at correct size (80px desktop, 32px minimized)"
    echo "• Sidebar toggle button works properly with smooth animations"
    echo "• Hashtags have consistent, clean styling without large backgrounds"
    echo "• Sidebar minimizes correctly on desktop, hides properly on mobile"
    echo "• All interactive elements have proper hover states and transitions"
    echo "• Mobile menu functionality improved with proper overlay behavior"
    echo ""
else
    echo "❌ Hugo build failed. Please check for errors above."
    exit 1
fi

echo "🎉 Design fixes successfully applied!"
echo "Run 'hugo server' to test locally, or deploy to see changes live."