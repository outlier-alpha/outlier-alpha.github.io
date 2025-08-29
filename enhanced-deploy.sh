#!/bin/bash

# Outlier Alpha Blog Enhancement Deployment Script
# This script builds and deploys the enhanced blog with all new features

echo "🚀 Starting Outlier Alpha Blog Enhancement Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Hugo is installed
if ! command -v hugo &> /dev/null; then
    print_error "Hugo is not installed. Please install Hugo first."
    exit 1
fi

print_status "Hugo version: $(hugo version)"

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf public/
rm -rf .hugo_build.lock

# Verify critical files exist
print_status "Verifying enhanced files..."
if [ ! -f "themes/custom-minimal/layouts/_default/single.html" ]; then
    print_error "Enhanced single.html template not found!"
    exit 1
fi

if [ ! -f "themes/custom-minimal/static/css/enhanced-professional.css" ]; then
    print_error "Enhanced CSS file not found!"
    exit 1
fi

print_success "All enhanced files verified successfully!"

# Build the site
print_status "Building Hugo site with enhancements..."
hugo --minify --gc

if [ $? -ne 0 ]; then
    print_error "Hugo build failed!"
    exit 1
fi

print_success "Hugo site built successfully!"

# Check if we're in a git repository
if [ -d ".git" ]; then
    print_status "Git repository detected. Preparing for deployment..."
    
    # Add all changes
    git add .
    
    # Create commit message with timestamp
    COMMIT_MESSAGE="🎨 Enhanced blog with sophisticated styling and real-time features - $(date '+%Y-%m-%d %H:%M:%S')"
    git commit -m "$COMMIT_MESSAGE"
    
    print_success "Changes committed to git!"
    
    # Push to main repository
    print_status "Pushing to main repository..."
    git push origin main
    
    if [ $? -eq 0 ]; then
        print_success "Successfully pushed to main repository!"
    else
        print_warning "Failed to push to main repository. You may need to push manually."
    fi
    
    # Deploy to GitHub Pages if outlier-alpha.github.io directory exists
    if [ -d "outlier-alpha.github.io" ]; then
        print_status "Deploying to GitHub Pages..."
        
        # Copy built site to GitHub Pages repository
        cp -r public/* outlier-alpha.github.io/
        
        cd outlier-alpha.github.io
        
        # Add and commit changes
        git add .
        git commit -m "🚀 Deploy enhanced blog - $(date '+%Y-%m-%d %H:%M:%S')"
        
        # Push to GitHub Pages
        git push origin main
        
        if [ $? -eq 0 ]; then
            print_success "Successfully deployed to GitHub Pages!"
            print_success "Your enhanced blog should be live at: https://outlieralphaventures.com"
        else
            print_error "Failed to deploy to GitHub Pages"
        fi
        
        cd ..
    else
        print_warning "GitHub Pages repository not found. Manual deployment may be required."
    fi
else
    print_warning "Not a git repository. Skipping version control operations."
fi

# Display summary of enhancements
echo ""
echo "🎉 DEPLOYMENT COMPLETE!"
echo "=========================================="
echo ""
print_success "Enhanced Features Deployed:"
echo "✅ Sophisticated blog post styling with professional typography"
echo "✅ Real-time market data from Yahoo Finance (updates every 5 minutes)"
echo "✅ Interactive table of contents with smooth scrolling"
echo "✅ Reading progress indicator"
echo "✅ Enhanced share functionality with copy-to-clipboard"
echo "✅ Image lightbox for better viewing experience"
echo "✅ Author bio section with credentials"
echo "✅ Related posts recommendations"
echo "✅ Newsletter signup with benefits"
echo "✅ Consultation CTA for business development"
echo "✅ Mobile-responsive design for all devices"
echo "✅ Accessibility improvements"
echo "✅ SEO optimizations with structured data"
echo "✅ Removed search functionality as requested"
echo "✅ Streamlined navigation (Home | Research | Resources | About Us)"
echo "✅ Integrated Calendly scheduling links"
echo ""

# Performance tips
echo "📊 Performance & Monitoring Tips:"
echo "• Monitor market data API usage to stay within limits"
echo "• Check blog post load times on mobile devices"  
echo "• Test newsletter signup functionality"
echo "• Verify Calendly integration is working"
echo "• Monitor user engagement with new interactive features"
echo ""

# Next steps
echo "🔧 Recommended Next Steps:"
echo "1. Test the blog on multiple devices and browsers"
echo "2. Verify market data is updating correctly"
echo "3. Check newsletter form submissions"
echo "4. Test share functionality across different platforms"
echo "5. Monitor site performance with Google PageSpeed Insights"
echo "6. Set up analytics tracking for new features"
echo ""

print_success "Your world-class investment blog is now live! 🎯"
