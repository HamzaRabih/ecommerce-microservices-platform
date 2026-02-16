@echo off
REM EOMMS Angular Client - Quick Start Script (Windows)
REM This script automates the setup and running of the Angular client

echo ================================
echo EOMMS Angular Client - Setup
echo ================================
echo.

REM Check Node.js installation
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed.
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✅ Node.js version: %NODE_VERSION%
echo ✅ npm version: %NPM_VERSION%
echo.

REM Parse command line argument
set COMMAND=%1

if "%COMMAND%"=="setup" goto SETUP
if "%COMMAND%"=="start" goto START
if "%COMMAND%"=="build" goto BUILD
if "%COMMAND%"=="test" goto TEST
if "%COMMAND%"=="clean" goto CLEAN
if "%COMMAND%"=="help" goto HELP
if "%COMMAND%"=="" goto START

:SETUP
echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully
echo.
echo 🚀 Starting development server...
call npm start
goto END

:START
if not exist "node_modules" (
    echo 📦 Dependencies not found. Installing...
    call npm install
)

echo 🚀 Starting development server...
echo.
echo The application will be available at: http://localhost:4200
echo.
call npm start
goto END

:BUILD
echo 🏗️ Building for production...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo ✅ Build successful!
echo 📁 Output: dist/eomms-client/
goto END

:TEST
echo 🧪 Running tests...
call npm test
goto END

:CLEAN
echo 🧹 Cleaning up...
if exist "node_modules" rmdir /s /q node_modules
if exist "dist" rmdir /s /q dist
if exist ".angular" rmdir /s /q .angular
echo ✅ Cleaned

echo.
echo 📦 Reinstalling dependencies...
call npm install
echo ✅ Ready to run: npm start
goto END

:HELP
echo Usage: start.bat [command]
echo.
echo Commands:
echo   setup       Full setup and run (install deps + start)
echo   start       Start development server (default)
echo   build       Build for production
echo   test        Run unit tests
echo   clean       Clean dependencies and reinstall
echo   help        Show this help message
echo.
echo Examples:
echo   start.bat              # Start development server
echo   start.bat setup        # Full setup
echo   start.bat build        # Build for production
echo   start.bat clean        # Clean and reinstall
goto END

:END
if "%COMMAND%"=="help" (
    pause
)
