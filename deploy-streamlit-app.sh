#!/bin/bash

# Streamlit Competitive Intelligence Platform Deployment Script

set -e

echo "🚀 Deploying Streamlit Competitive Intelligence Platform..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip3 first."
    exit 1
fi

echo "✅ Python and pip verified"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "🏗️  Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "⚡ Activating virtual environment..."
source venv/bin/activate

# Create requirements.txt if it doesn't exist
if [ ! -f "requirements.txt" ]; then
    echo "📦 Creating requirements.txt..."
    cat > requirements.txt << EOF
streamlit>=1.28.0
pandas>=2.0.0
plotly>=5.17.0
requests>=2.31.0
numpy>=1.24.0
openpyxl>=3.1.0
python-dateutil>=2.8.0
EOF
fi

# Install requirements
echo "📦 Installing Python packages..."
pip3 install -r requirements.txt

# Create the main Streamlit app file if it doesn't exist
if [ ! -f "streamlit_app.py" ]; then
    echo "📝 Creating streamlit_app.py..."
    # The file content would be copied from the artifact here
    # For brevity, we'll indicate this step
    echo "Please ensure streamlit_app.py contains the competitive intelligence platform code"
fi

# Create .streamlit directory and config
if [ ! -d ".streamlit" ]; then
    mkdir -p .streamlit
fi

# Create Streamlit config
cat > .streamlit/config.toml << EOF
[theme]
primaryColor = "#3730a3"
backgroundColor = "#ffffff"
secondaryBackgroundColor = "#f0f2f6"
textColor = "#262730"

[server]
headless = true
enableCORS = false
enableXsrfProtection = false
maxUploadSize = 200
port = 8501
EOF

# Create secrets template
if [ ! -f ".streamlit/secrets.toml" ]; then
    cat > .streamlit/secrets.toml << EOF
# Add your API keys here (don't commit this file to version control)
# ANTHROPIC_API_KEY = "your-api-key-here"
# GOOGLE_SHEETS_API_KEY = "your-google-sheets-key-here"
EOF
fi

# Create data directory for sample files
mkdir -p data
if [ ! -f "data/sample_traction_data.csv" ]; then
    cat > data/sample_traction_data.csv << EOF
Channel,Monthly_Spend,Impressions,Clicks,Conversions,ROI
Search Engine Marketing,10000,50000,2500,125,2.5
Social & Display Ads,8000,100000,4000,160,3.2
Content Marketing,5000,25000,1200,60,1.8
Email Marketing,3000,15000,800,80,4.1
SEO,2000,30000,1500,90,5.5
Trade Shows,15000,5000,200,50,2.0
Business Development,5000,2000,100,40,6.0
EOF
fi

# Create deployment directory structure
mkdir -p deployment/{hugo-static,streamlit-app}

echo ""
echo "📁 Project Structure Created:"
echo "=========================="
echo "📂 Root Directory"
echo "  ├── 📄 streamlit_app.py          # Main Streamlit application"
echo "  ├── 📄 requirements.txt          # Python dependencies"
echo "  ├── 📂 .streamlit/               # Streamlit configuration"
echo "  │   ├── 📄 config.toml           # App configuration"
echo "  │   └── 📄 secrets.toml          # API keys (keep secure)"
echo "  ├── 📂 data/                     # Sample data files"
echo "  │   └── 📄 sample_traction_data.csv"
echo "  ├── 📂 venv/                     # Virtual environment"
echo "  └── 📂 deployment/               # Deployment configurations"
echo ""

echo "🧪 Testing Streamlit installation..."
if python3 -c "import streamlit; print('Streamlit version:', streamlit.__version__)" 2>/dev/null; then
    echo "✅ Streamlit successfully installed"
else
    echo "❌ Streamlit installation failed"
    exit 1
fi

echo ""
echo "🚀 Deployment Options:"
echo "====================="
echo ""
echo "1. 🖥️  LOCAL DEVELOPMENT"
echo "   To run locally:"
echo "   source venv/bin/activate"
echo "   streamlit run streamlit_app.py"
echo "   Then visit: http://localhost:8501"
echo ""
echo "2. ☁️  STREAMLIT CLOUD (Recommended)"
echo "   1. Push your code to GitHub"
echo "   2. Visit: https://share.streamlit.io"
echo "   3. Connect your GitHub repository"
echo "   4. Deploy with one click"
echo ""
echo "3. 🐳 DOCKER DEPLOYMENT"
echo "   Create Dockerfile and deploy to any cloud provider"
echo ""
echo "4. 🌐 HEROKU DEPLOYMENT"
echo "   Use Heroku's git-based deployment"
echo ""

# Create Docker files for containerized deployment
echo "🐳 Creating Docker deployment files..."

cat > Dockerfile << 'EOF'
FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    software-properties-common \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Copy application files
COPY . .

# Expose port
EXPOSE 8501

# Health check
HEALTHCHECK CMD curl --fail http://localhost:8501/_stcore/health

# Run the application
ENTRYPOINT ["streamlit", "run", "streamlit_app.py", "--server.port=8501", "--server.address=0.0.0.0"]
EOF

cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  competitive-intelligence:
    build: .
    ports:
      - "8501:8501"
    environment:
      - STREAMLIT_SERVER_HEADLESS=true
      - STREAMLIT_SERVER_ENABLE_CORS=false
      - STREAMLIT_SERVER_ENABLE_XSRF_PROTECTION=false
    volumes:
      - ./data:/app/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8501/_stcore/health"]
      interval: 30s
      timeout: 10s
      retries: 3
EOF

# Create Heroku deployment files
echo "🎯 Creating Heroku deployment files..."

cat > Procfile << 'EOF'
web: sh setup.sh && streamlit run streamlit_app.py --server.port=$PORT --server.address=0.0.0.0
EOF

cat > setup.sh << 'EOF'
mkdir -p ~/.streamlit/
echo "\
[general]\n\
email = \"your-email@domain.com\"\n\
" > ~/.streamlit/credentials.toml
echo "\
[server]\n\
headless = true\n\
enableCORS=false\n\
port = $PORT\n\
" > ~/.streamlit/config.toml
EOF

chmod +x setup.sh

# Create GitHub Actions workflow for CI/CD
mkdir -p .github/workflows

cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to Streamlit Cloud

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.9'
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
    
    - name: Test imports
      run: |
        python -c "import streamlit, pandas, plotly, requests"
    
    - name: Lint with flake8
      run: |
        pip install flake8
        # Stop the build if there are Python syntax errors or undefined names
        flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics --exclude=venv
EOF

echo ""
echo "📋 Next Steps Checklist:"
echo "======================="
echo "□ 1. Copy the Streamlit app code to streamlit_app.py"
echo "□ 2. Add your API keys to .streamlit/secrets.toml"
echo "□ 3. Test locally: streamlit run streamlit_app.py"
echo "□ 4. Choose deployment method:"
echo "   □ Streamlit Cloud (easiest)"
echo "   □ Docker + cloud provider"
echo "   □ Heroku"
echo "   □ Custom server"
echo "□ 5. Set up domain name (optional)"
echo "□ 6. Configure monitoring and analytics"
echo ""

echo "🔐 Security Reminders:"
echo "====================="
echo "⚠️  Never commit .streamlit/secrets.toml to version control"
echo "⚠️  Use environment variables for production API keys"
echo "⚠️  Enable HTTPS in production"
echo "⚠️  Regularly update dependencies"
echo ""

echo "📊 Feature Comparison:"
echo "====================="
echo "Hugo + React Implementation:"
echo "  ✅ Static site hosting (faster, cheaper)"
echo "  ✅ SEO optimized"
echo "  ✅ Blog + Resources integration"
echo "  ✅ Custom domain friendly"
echo "  ❌ More complex deployment"
echo ""
echo "Streamlit Implementation:"
echo "  ✅ Easier development and deployment"
echo "  ✅ Built-in data visualization"
echo "  ✅ File upload capabilities"
echo "  ✅ Interactive widgets"
echo "  ✅ Planning tool with data analysis"
echo "  ❌ Requires Python server"
echo ""

# Test if we can run Streamlit
echo "🧪 Testing Streamlit functionality..."
if [ -f "streamlit_app.py" ]; then
    echo "✅ streamlit_app.py found"
    
    # Quick syntax check
    python3 -m py_compile streamlit_app.py 2>/dev/null && echo "✅ Python syntax valid" || echo "⚠️  Python syntax check failed"
else
    echo "⚠️  streamlit_app.py not found - please create it with the competitive intelligence code"
fi

echo ""
echo "🎉 Streamlit Competitive Intelligence Platform Setup Complete!"
echo ""
echo "🚀 Quick Start Commands:"
echo "========================"
echo "# Activate virtual environment"
echo "source venv/bin/activate"
echo ""
echo "# Run locally"
echo "streamlit run streamlit_app.py"
echo ""
echo "# Deploy to Streamlit Cloud"
echo "1. Push to GitHub: git push origin main"
echo "2. Visit: https://share.streamlit.io"
echo "3. Connect repository and deploy"
echo ""
echo "# Docker deployment"
echo "docker-compose up --build"
echo ""

# Prompt for immediate testing
echo "🖥️  Local Development:"
read -p "Would you like to start the local development server now? (y/n): " start_local

if [[ $start_local =~ ^[Yy]$ ]]; then
    if [ -f "streamlit_app.py" ]; then
        echo "🚀 Starting Streamlit server..."
        source venv/bin/activate
        streamlit run streamlit_app.py
    else
        echo "❌ Please create streamlit_app.py first with the competitive intelligence platform code"
        echo "You can find the complete code in the provided artifacts"
    fi
else
    echo "✅ Setup complete! Run 'streamlit run streamlit_app.py' when ready to test"
fi

echo ""
echo "📚 Additional Resources:"
echo "======================="
echo "• Streamlit Documentation: https://docs.streamlit.io/"
echo "• Streamlit Cloud: https://share.streamlit.io/"
echo "• Docker Documentation: https://docs.docker.com/"
echo "• Heroku Deployment: https://devcenter.heroku.com/articles/getting-started-with-python"
echo ""
echo "🎯 Both implementations (Hugo+React and Streamlit) are now ready!"
echo "Choose based on your needs:"
echo "- Hugo+React: For marketing website + embedded tool"
echo "- Streamlit: For standalone data analysis application"
