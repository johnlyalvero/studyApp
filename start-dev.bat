@echo off
:: Kill any existing node processes (development servers)
echo Killing any running development server...
taskkill /F /IM node.exe >nul 2>&1

:: Start development environment
@echo off
echo 📡 Starting backend...
start cmd /k "cd backend && nodemon server.js"

timeout /t 3

echo 🌐 Starting frontend (browser)...
start cmd /k "cordova run browser --livereload --watch"

echo ✅ Everything is running!
pause
