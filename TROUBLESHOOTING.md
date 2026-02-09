# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### ❌ Error: Port 3000 Already in Use

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution 1: Use Kill Port Script (Easiest)**
```bash
npm run kill-port
```
Then run:
```bash
npm start
```

**Solution 2: Manual Kill (Windows)**
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Solution 3: Manual Kill (Mac/Linux)**
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9
```

**Solution 4: Change Backend Port**

Edit `backend/server.js`:
```javascript
const PORT = process.env.PORT || 3001; // Change to 3001
```

Edit `src/services/api.js`:
```javascript
const API_URL = 'http://localhost:3001/api'; // Change to 3001
```

---

### ❌ Backend Won't Start

**Symptoms:**
- Backend crashes immediately
- No "Server running" message
- Port error

**Solutions:**

1. **Check Node.js version:**
```bash
node --version
# Should be v14 or higher
```

2. **Reinstall backend dependencies:**
```bash
cd backend
rm -rf node_modules
npm install
cd ..
```

3. **Check for syntax errors:**
```bash
cd backend
node server.js
# Look for error messages
```

4. **Verify data directory:**
```bash
# Backend should auto-create this, but you can manually create:
mkdir backend/data
```

---

### ❌ Frontend Can't Connect to Backend

**Symptoms:**
- Login shows "Backend: offline"
- API calls fail
- Network errors

**Solutions:**

1. **Verify backend is running:**
```bash
# Open in browser
http://localhost:3000/api/health
```

Should show:
```json
{
  "success": true,
  "message": "Backend server is running"
}
```

2. **For Physical Device - Update API URL:**

Find your computer's IP address:
```bash
# Windows
ipconfig
# Look for IPv4 Address

# Mac/Linux
ifconfig
# Look for inet address
```

Edit `src/services/api.js`:
```javascript
// Replace localhost with your IP
const API_URL = 'http://192.168.1.100:3000/api';
```

3. **Check Firewall:**
- Windows: Allow Node.js through Windows Firewall
- Mac: System Preferences → Security & Privacy → Firewall

4. **Same WiFi Network:**
- Ensure phone and computer are on same WiFi
- Disable VPN if active

---

### ❌ Expo Won't Start

**Error Messages:**
- "Metro bundler error"
- "Unable to start server"
- "Port 19000 in use"

**Solutions:**

1. **Clear Expo cache:**
```bash
expo start -c
```

2. **Clear all caches:**
```bash
# Clear npm cache
npm cache clean --force

# Clear watchman (Mac/Linux)
watchman watch-del-all

# Clear Metro bundler cache
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/haste-*
```

3. **Reinstall Expo CLI:**
```bash
npm uninstall -g expo-cli
npm install -g expo-cli
```

4. **Delete and reinstall node_modules:**
```bash
rm -rf node_modules
npm install
```

---

### ❌ Dependencies Installation Fails

**Error Messages:**
- "npm ERR!"
- "EACCES permission denied"
- "Cannot find module"

**Solutions:**

1. **Clear npm cache:**
```bash
npm cache clean --force
```

2. **Delete node_modules and reinstall:**
```bash
# Frontend
rm -rf node_modules
rm package-lock.json
npm install

# Backend
cd backend
rm -rf node_modules
rm package-lock.json
npm install
cd ..
```

3. **Use npm instead of yarn (or vice versa):**
```bash
# If using npm fails, try yarn
yarn install

# If using yarn fails, try npm
npm install
```

4. **Check Node.js version:**
```bash
node --version
npm --version

# Update if needed
# Download from: https://nodejs.org/
```

5. **Run as Administrator (Windows):**
- Right-click Command Prompt
- Select "Run as Administrator"
- Navigate to project folder
- Run `npm install`

---

### ❌ App Crashes on Startup

**Symptoms:**
- White screen
- Immediate crash
- "Unable to resolve module"

**Solutions:**

1. **Clear Metro bundler cache:**
```bash
expo start -c
```

2. **Check for missing dependencies:**
```bash
npm install
```

3. **Verify all imports:**
- Check for typos in import statements
- Ensure all imported files exist

4. **Reset Expo:**
```bash
expo start --clear
```

---

### ❌ Login Fails

**Symptoms:**
- "Invalid credentials" error
- Login button doesn't work
- Backend connection error

**Solutions:**

1. **Verify credentials:**
```
Email: admin@pharma.com
Password: admin123
```

2. **Check backend is running:**
```bash
# Should see backend logs in terminal
```

3. **Check backend data files:**
```bash
# Verify users.json exists
cat backend/data/users.json
```

4. **Reset backend data:**
```bash
# Delete data folder
rm -rf backend/data

# Restart backend (will recreate data)
npm run backend
```

---

### ❌ Medicine Management Not Working

**Symptoms:**
- Can't add medicines
- List doesn't update
- Delete doesn't work

**Solutions:**

1. **Check backend connection:**
- Look for "Backend: online" on login screen

2. **Verify API endpoint:**
```bash
# Test in browser
http://localhost:3000/api/medicines
```

3. **Check backend logs:**
- Look for errors in backend terminal

4. **Verify data file:**
```bash
cat backend/data/medicines.json
```

---

### ❌ Data Not Persisting

**Symptoms:**
- Added data disappears after restart
- Changes don't save

**Solutions:**

1. **Check data directory exists:**
```bash
ls backend/data/
```

2. **Verify file permissions:**
```bash
# Mac/Linux
chmod -R 755 backend/data/
```

3. **Check disk space:**
```bash
# Ensure you have free disk space
df -h
```

4. **Verify backend is writing files:**
```bash
# Check file modification time
ls -la backend/data/
```

---

### ❌ "Cannot find module" Error

**Error Message:**
```
Error: Cannot find module 'express'
Error: Cannot find module '@react-navigation/native'
```

**Solutions:**

1. **Install missing module:**
```bash
# For backend modules
cd backend
npm install express cors body-parser

# For frontend modules
npm install @react-navigation/native @react-navigation/stack
```

2. **Reinstall all dependencies:**
```bash
npm run install-all
```

---

### ❌ Slow Performance

**Symptoms:**
- App is laggy
- Backend responds slowly
- Long loading times

**Solutions:**

1. **Close unnecessary apps:**
- Free up RAM and CPU

2. **Restart Metro bundler:**
```bash
# Press 'r' in Expo terminal to reload
```

3. **Clear caches:**
```bash
expo start -c
```

4. **Check system resources:**
- Task Manager (Windows)
- Activity Monitor (Mac)

---

## 🆘 Still Having Issues?

### Debug Checklist:

- [ ] Node.js v14+ installed
- [ ] All dependencies installed (`npm run install-all`)
- [ ] Port 3000 is free (`npm run kill-port`)
- [ ] Backend running (`npm run backend`)
- [ ] Backend health check passes (http://localhost:3000/api/health)
- [ ] Frontend running (`npm run frontend`)
- [ ] Phone and computer on same WiFi (for physical device)
- [ ] Correct API URL in `src/services/api.js`

### Get Detailed Logs:

**Backend logs:**
```bash
cd backend
node server.js
# Watch for errors
```

**Frontend logs:**
- Check Expo DevTools console
- Check React Native debugger
- Check terminal output

### Test Backend Manually:

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@pharma.com","password":"admin123","role":"admin"}'

# Test medicines
curl http://localhost:3000/api/medicines
```

---

## 📞 Need More Help?

1. Check error messages carefully
2. Search error message online
3. Review this guide thoroughly
4. Check GitHub issues
5. Create new issue with:
   - Error message
   - Steps to reproduce
   - System info (OS, Node version)
   - Screenshots if applicable

---

**Remember:** Most issues are solved by:
1. Killing port 3000: `npm run kill-port`
2. Reinstalling dependencies: `npm run install-all`
3. Clearing caches: `expo start -c`