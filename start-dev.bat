@echo off
echo 📡 Starting backend...
start cmd /k "cd backend && nodemon server.js"

timeout /t 3

echo 🌐 Starting frontend (browser)...
start cmd /k "cordova run browser --livereload --watch"

echo ✅ Everything is running!
pause