#!/bin/bash
# EOMMS Angular Client - Quick Start Script
# This script automates the setup and running of the Angular client

echo "================================"
echo "EOMMS Angular Client - Setup"
echo "================================"
echo ""

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Option 1: Full setup and run
if [ "$1" == "setup" ]; then
    echo "📦 Installing dependencies..."
    npm install
    
    if [ $? -eq 0 ]; then
        echo "✅ Dependencies installed successfully"
        echo ""
        echo "🚀 Starting development server..."
        npm start
    else
        echo "❌ Failed to install dependencies"
        exit 1
    fi
fi

# Option 2: Just run (dependencies already installed)
if [ "$1" == "start" ] || [ -z "$1" ]; then
    if [ ! -d "node_modules" ]; then
        echo "📦 Dependencies not found. Installing..."
        npm install
    fi
    
    echo "🚀 Starting development server..."
    echo ""
    echo "The application will be available at: http://localhost:4200"
    echo ""
    npm start
fi

# Option 3: Build for production
if [ "$1" == "build" ]; then
    echo "🏗️ Building for production..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build successful!"
        echo "📁 Output: dist/eomms-client/"
    else
        echo "❌ Build failed"
        exit 1
    fi
fi

# Option 4: Run tests
if [ "$1" == "test" ]; then
    echo "🧪 Running tests..."
    npm test
fi

# Option 5: Clean and reinstall
if [ "$1" == "clean" ]; then
    echo "🧹 Cleaning up..."
    rm -rf node_modules dist .angular
    echo "✅ Cleaned"
    echo ""
    echo "📦 Reinstalling dependencies..."
    npm install
    echo "✅ Ready to run: npm start"
fi

# Show help
if [ "$1" == "help" ] || [ "$1" == "-h" ]; then
    echo "Usage: ./start.sh [command]"
    echo ""
    echo "Commands:"
    echo "  setup       Full setup and run (install deps + start)"
    echo "  start       Start development server (default)"
    echo "  build       Build for production"
    echo "  test        Run unit tests"
    echo "  clean       Clean dependencies and reinstall"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./start.sh              # Start development server"
    echo "  ./start.sh setup        # Full setup"
    echo "  ./start.sh build        # Build for production"
    echo "  ./start.sh clean        # Clean and reinstall"
fi
