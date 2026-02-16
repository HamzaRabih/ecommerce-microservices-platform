# NPM Commands Cheat Sheet

Quick reference for common commands used in EOMMS Angular Client.

## 🚀 Running

```bash
# Start development server (default port 4200)
npm start

# Start with custom port
ng serve --port 4300

# Start and open browser automatically
ng serve --open
```

## 🏗️ Building

```bash
# Build for production
npm run build

# Build with specific configuration
ng build --configuration production

# Build in watch mode (auto-rebuild)
npm run watch
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
ng test --code-coverage

# Run tests in headless mode (CI)
ng test --watch=false --browsers=ChromeHeadless
```

## 🧹 Cleanup

```bash
# Remove build artifacts
rm -rf dist .angular

# Remove dependencies
rm -rf node_modules

# Clean and reinstall everything
rm -rf dist .angular node_modules && npm install

# On Windows, use:
rmdir /s /q dist .angular node_modules
npm install
```

## 📦 Dependencies

```bash
# Install all dependencies
npm install

# Install specific package
npm install @angular/router

# Install dev dependency
npm install --save-dev @angular/cli

# Update all packages
npm update

# Check for outdated packages
npm outdated

# Update specific package to specific version
npm install @angular/core@17.0.0
```

## 🔍 Analysis

```bash
# Check project structure
ng version

# List all npm scripts available
npm run

# Show installed packages
npm list

# Show local packages with size
npm list --depth=0
```

## 🛠️ Development Tools

```bash
# Start linter (if configured)
ng lint

# Analyze bundle size
ng build --stats-json
webpack-bundle-analyzer dist/eomms-client/stats.json
```

## 📝 Debugging

```bash
# Start with debugging enabled
ng serve --poll

# Build source map for production debugging
ng build --source-map

# Check TypeScript compilation
npx tsc --noEmit
```

## 🔄 Git Integration

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit"

# Add remote repository
git remote add origin <repository-url>

# Push to remote
git push -u origin main
```

## 🐳 Docker

```bash
# Build Docker image
docker build -t eomms-client .

# Run Docker container
docker run -p 8080:8080 eomms-client
```

## 📊 Performance

```bash
# Build with stats
ng build --stats-json

# View bundle analysis
npm install -g webpack-bundle-analyzer
webpack-bundle-analyzer dist/eomms-client/stats.json
```

## 🚨 Common Issues & Solutions

```bash
# Port already in use
lsof -i :4200  # Find process
kill -9 <PID>  # Kill process

# Clear npm cache
npm cache clean --force

# Reinstall with clean state
npm ci

# Update npm itself
npm install -g npm@latest

# Update Angular CLI
ng update @angular/cli @angular/core
```

## 📚 Help & Information

```bash
# Get help for any ng command
ng help
ng serve --help

# Check Angular version
ng version

# Display npm version
npm --version

# Show installed global packages
npm list -g --depth=0
```

## 💡 Pro Tips

### Make commands shorter with aliases

```bash
# In your shell profile (.bashrc, .zshrc, etc.)

alias start="npm start"
alias build="npm run build"
alias test="npm test"
alias clean="rm -rf dist .angular node_modules && npm install"
alias serve="ng serve --open"

# Usage: just type 'start' instead of 'npm start'
```

### Useful VS Code Extensions

```bash
# Install globally
npm install -g code

# Command line: open folder in VS Code
code .

# Open specific file
code path/to/file.ts
```

### Quick Development Workflow

```bash
# 1. Install dependencies (first time only)
npm install

# 2. Start development server
npm start

# 3. In another terminal, run tests
npm test

# 4. When ready, build for production
npm run build
```

---

**Last Updated:** January 2026
**Version:** 1.0
