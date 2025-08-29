#!/bin/bash

# Outlier Alpha Ventures - Professional Deployment Script
# This script automates the build and deployment process

set -e

echo "🚀 Starting Outlier Alpha Ventures Website Deployment"
echo "=================================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SITE_URL="https://outlieralphaventures.com"
GITHUB_REPO="outlier-alpha-website"
BUILD_DIR="public"

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
check_hugo() {
    print_status "Checking Hugo installation..."
    if ! command -v hugo &> /dev/null; then
        print_error "Hugo is not installed. Please install Hugo first."
        print_status "Install with: brew install hugo (macOS) or visit https://gohugo.io/installation/"
        exit 1
    fi
    
    hugo_version=$(hugo version)
    print_success "Hugo found: $hugo_version"
}

# Check if Git is configured
check_git() {
    print_status "Checking Git configuration..."
    if ! git config --get user.email > /dev/null; then
        print_error "Git email not configured. Please run:"
        echo "git config --global user.email 'your-email@example.com'"
        exit 1
    fi
    
    if ! git config --get user.name > /dev/null; then
        print_error "Git name not configured. Please run:"
        echo "git config --global user.name 'Your Name'"
        exit 1
    fi
    
    print_success "Git is properly configured"
}

# Clean previous build
clean_build() {
    print_status "Cleaning previous build..."
    if [ -d "$BUILD_DIR" ]; then
        rm -rf "$BUILD_DIR"
        print_success "Previous build cleaned"
    else
        print_status "No previous build found"
    fi
}

# Build the website
build_site() {
    print_status "Building the website with Hugo..."
    
    # Build with minification and optimization
    hugo --minify --gc --cleanDestinationDir
    
    if [ $? -eq 0 ]; then
        print_success "Website built successfully"
        
        # Show build statistics
        file_count=$(find $BUILD_DIR -type f | wc -l)
        total_size=$(du -sh $BUILD_DIR | cut -f1)
        print_status "Build statistics: $file_count files, $total_size total"
    else
        print_error "Build failed. Please check the errors above."
        exit 1
    fi
}

# Validate critical files
validate_build() {
    print_status "Validating build output..."
    
    critical_files=("index.html" "sitemap.xml" "CNAME" "robots.txt" "manifest.json")
    
    for file in "${critical_files[@]}"; do
        if [ -f "$BUILD_DIR/$file" ]; then
            print_success "✓ $file found"
        else
            print_error "✗ Critical file missing: $file"
            exit 1
        fi
    done
}

# Test the website locally (optional)
test_locally() {
    read -p "Would you like to test the website locally before deployment? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Starting local server for testing..."
        print_status "The website will open at http://localhost:1313"
        print_status "Press Ctrl+C to stop the server and continue with deployment"
        
        hugo server --bind 0.0.0.0 --port 1313 --disableFastRender
    fi
}

# Commit and push to GitHub
deploy_to_github() {
    print_status "Deploying to GitHub..."
    
    # Check if we're in a git repository
    if [ ! -d ".git" ]; then
        print_error "Not a git repository. Please initialize git first:"
        echo "git init"
        echo "git remote add origin https://github.com/YOUR_USERNAME/$GITHUB_REPO.git"
        exit 1
    fi
    
    # Add all files
    git add .
    
    # Check if there are changes to commit
    if git diff --staged --quiet; then
        print_warning "No changes to commit"
        return
    fi
    
    # Commit with timestamp
    commit_message="Deploy website - $(date '+%Y-%m-%d %H:%M:%S')"
    git commit -m "$commit_message"
    
    # Push to GitHub
    print_status "Pushing to GitHub..."
    git push origin main
    
    if [ $? -eq 0 ]; then
        print_success "Successfully pushed to GitHub"
        print_status "GitHub Pages will automatically deploy your changes"
        print_status "Check deployment status at: https://github.com/YOUR_USERNAME/$GITHUB_REPO/actions"
    else
        print_error "Failed to push to GitHub"
        exit 1
    fi
}

# Show deployment summary
show_summary() {
    echo
    echo "=================================================="
    echo "🎉 Deployment Complete!"
    echo "=================================================="
    echo
    print_success "Website URL: $SITE_URL"
    print_success "GitHub Repository: https://github.com/YOUR_USERNAME/$GITHUB_REPO"
    print_success "GitHub Pages URL: https://YOUR_USERNAME.github.io/$GITHUB_REPO"
    echo
    print_status "Next steps:"
    echo "1. Wait for DNS propagation (up to 48 hours)"
    echo "2. Verify SSL certificate is active"
    echo "3. Test all website functionality"
    echo "4. Submit sitemap to Google Search Console"
    echo "5. Update social media profiles with new website"
    echo
    print_status "Monitoring:"
    echo "• GitHub Actions: https://github.com/YOUR_USERNAME/$GITHUB_REPO/actions"
    echo "• DNS Propagation: https://whatsmydns.net"
    echo "• SSL Check: https://www.ssllabs.com/ssltest/"
    echo
}

# Create backup before deployment
create_backup() {
    print_status "Creating backup..."
    backup_dir="backup_$(date +%Y%m%d_%H%M%S)"
    mkdir -p "backups/$backup_dir"
    
    # Backup critical files
    cp -r content "backups/$backup_dir/"
    cp -r static "backups/$backup_dir/"
    cp -r themes "backups/$backup_dir/"
    cp config.toml "backups/$backup_dir/"
    
    print_success "Backup created in backups/$backup_dir"
}

# Main deployment function
main() {
    echo "Starting deployment process..."
    echo
    
    # Run all checks and deployment steps
    check_hugo
    check_git
    create_backup
    clean_build
    build_site
    validate_build
    test_locally
    deploy_to_github
    show_summary
    
    print_success "Deployment script completed successfully!"
}

# Handle script interruption
trap 'print_error "Deployment interrupted"; exit 1' INT

# Parse command line arguments
case "${1:-deploy}" in
    "build")
        print_status "Building website only..."
        check_hugo
        clean_build
        build_site
        validate_build
        print_success "Build completed successfully!"
        ;;
    "test")
        print_status "Testing website locally..."
        check_hugo
        hugo server --bind 0.0.0.0 --port 1313 --disableFastRender
        ;;
    "deploy")
        main
        ;;
    *)
        echo "Usage: $0 [build|test|deploy]"
        echo "  build  - Build the website only"
        echo "  test   - Start local development server"
        echo "  deploy - Full deployment (default)"
        exit 1
        ;;
esac