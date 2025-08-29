#!/bin/bash

echo "🔍 Verifying Critical Design Fixes..."
echo "====================================="

# Check if critical files exist
echo "📂 Checking file existence:"

if [ -f "themes/custom-minimal/static/css/critical-fixes.css" ]; then
    echo "✅ critical-fixes.css - EXISTS"
else
    echo "❌ critical-fixes.css - MISSING"
fi

if [ -f "themes/custom-minimal/static/js/critical-sidebar-fix.js" ]; then
    echo "✅ critical-sidebar-fix.js - EXISTS"
else
    echo "❌ critical-sidebar-fix.js - MISSING"
fi

if [ -f "themes/custom-minimal/layouts/_default/baseof.html" ]; then
    echo "✅ baseof.html - EXISTS"
    
    # Check if critical CSS is referenced
    if grep -q "critical-fixes.css" "themes/custom-minimal/layouts/_default/baseof.html"; then
        echo "✅ critical-fixes.css - REFERENCED in baseof.html"
    else
        echo "❌ critical-fixes.css - NOT REFERENCED in baseof.html"
    fi
    
    # Check if critical JS is referenced
    if grep -q "critical-sidebar-fix.js" "themes/custom-minimal/layouts/_default/baseof.html"; then
        echo "✅ critical-sidebar-fix.js - REFERENCED in baseof.html"
    else
        echo "❌ critical-sidebar-fix.js - NOT REFERENCED in baseof.html"
    fi
else
    echo "❌ baseof.html - MISSING"
fi

echo ""
echo "🎯 Checking specific fixes in CSS:"

if [ -f "themes/custom-minimal/static/css/critical-fixes.css" ]; then
    # Check for logo fix
    if grep -q "profile-avatar img" "themes/custom-minimal/static/css/critical-fixes.css"; then
        echo "✅ Logo fixes - FOUND"
    else
        echo "❌ Logo fixes - MISSING"
    fi
    
    # Check for sidebar toggle fix
    if grep -q "sidebar-toggle" "themes/custom-minimal/static/css/critical-fixes.css"; then
        echo "✅ Sidebar toggle fixes - FOUND"
    else
        echo "❌ Sidebar toggle fixes - MISSING"
    fi
    
    # Check for hashtag fix
    if grep -q "hashtag-link" "themes/custom-minimal/static/css/critical-fixes.css"; then
        echo "✅ Hashtag fixes - FOUND"
    else
        echo "❌ Hashtag fixes - MISSING"
    fi
    
    # Check for widget fixes
    if grep -q "market-widget" "themes/custom-minimal/static/css/critical-fixes.css"; then
        echo "✅ Widget fixes - FOUND"
    else
        echo "❌ Widget fixes - MISSING"
    fi
fi

echo ""
echo "🎯 Checking JavaScript functionality:"

if [ -f "themes/custom-minimal/static/js/critical-sidebar-fix.js" ]; then
    if grep -q "toggleSidebar" "themes/custom-minimal/static/js/critical-sidebar-fix.js"; then
        echo "✅ Toggle function - FOUND"
    else
        echo "❌ Toggle function - MISSING"
    fi
    
    if grep -q "addEventListener" "themes/custom-minimal/static/js/critical-sidebar-fix.js"; then
        echo "✅ Event listeners - FOUND"
    else
        echo "❌ Event listeners - MISSING"
    fi
fi

echo ""
echo "📊 File sizes:"
if [ -f "themes/custom-minimal/static/css/critical-fixes.css" ]; then
    SIZE=$(wc -c < "themes/custom-minimal/static/css/critical-fixes.css")
    echo "📄 critical-fixes.css: $SIZE bytes"
fi

if [ -f "themes/custom-minimal/static/js/critical-sidebar-fix.js" ]; then
    SIZE=$(wc -c < "themes/custom-minimal/static/js/critical-sidebar-fix.js")
    echo "📄 critical-sidebar-fix.js: $SIZE bytes"
fi

echo ""
echo "====================================="
echo "🎯 Ready to deploy? Run: ./deploy-critical-fixes.sh"
