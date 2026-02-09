# 🚀 Complete Setup Guide - Pharma Company App

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version`

2. **npm** (comes with Node.js)
   - Verify: `npm --version`

3. **Expo CLI** (for React Native)
   ```bash
   npm install -g expo-cli
   ```

4. **Git**
   - Download from: https://git-scm.com/
   - Verify: `git --version`

## 🔧 Installation Steps

### Step 1: Clone the Repository

```bash
git clone https://github.com/Aryankaushik541/pharma-company-app.git
cd pharma-company-app
```

### Step 2: Install All Dependencies

**Option A: Install Everything at Once (Recommended)**
```bash
npm run install-all
```

**Option B: Install Separately**
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 3: Start the Application

**Option A: Auto-Start (Easiest)**
```bash
npm start
```
This will:
- Automatically install backend dependencies if needed
- Start the backend server on port 3000
- Start the Expo development server
- Open Expo DevTools in your browser

**Option B: Manual Start**

Terminal 1 (Backend):
```bash
npm run backend
```

Terminal 2 (Frontend):
```bash
npm run frontend
```

## 📱 Running on Your Device

### Android

1. Install **Expo Go** app from Google Play Store
2. Make sure your phone and computer are on the same WiFi network
3. Scan the QR code shown in the terminal or Expo DevTools
4. App will load on your phone

**OR use Android Emulator:**
```bash
npm run android
```

### iOS

1. Install **Expo Go** app from App Store
2. Make sure your phone and computer are on the same WiFi network
3. Scan the QR code shown in the terminal or Expo DevTools
4. App will load on your phone

**OR use iOS Simulator (Mac only):**
```bash
npm run ios
```

## 🔍 Verifying Backend is Running

### Method 1: Check Terminal Output
You should see:
```
==================================================
🏥 PHARMA COMPANY BACKEND SERVER
==================================================
✅ Server running on port 3000
🌐 API URL: http://localhost:3000
📊 Health Check: http://localhost:3000/api/health
==================================================
```

### Method 2: Open in Browser
Visit: http://localhost:3000/api/health

You should see:
```json
{
  "success": true,
  "message": "Backend server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Method 3: Check Data Files
Navigate to `backend/data/` folder. You should see:
- `users.json` - User accounts
- `medicines.json` - Medicine inventory
- `orders.json` - Order records
- `reports.json` - Report data

## 🎯 Testing the App

### 1. Login Test

Use any of these credentials:

**Admin:**
- Email: `admin@pharma.com`
- Password: `admin123`

**Customer:**
- Email: `customer@pharma.com`
- Password: `customer123`

### 2. Medicine Management Test

1. Login as Admin
2. Navigate to Medicine Management
3. Add a new medicine
4. Verify it appears in the list
5. Check `backend/data/medicines.json` to see the data saved

### 3. Backend Connection Test

1. Login screen shows "Backend: online" status
2. If offline, check if backend server is running
3. Restart backend if needed: `npm run backend`

## 🛠️ Troubleshooting

### Problem: Backend won't start

**Solution 1: Check if port 3000 is already in use**
```bash
# Windows
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :3000
```

**Solution 2: Kill the process using port 3000**
```bash
# Windows
taskkill /PID <PID> /F

# Mac/Linux
kill -9 <PID>
```

**Solution 3: Change backend port**
Edit `backend/server.js`:
```javascript
const PORT = process.env.PORT || 3001; // Change to 3001
```

Then update `src/services/api.js`:
```javascript
const API_URL = 'http://localhost:3001/api'; // Change to 3001
```

### Problem: Frontend can't connect to backend

**Solution 1: Check backend is running**
- Visit http://localhost:3000/api/health
- Should show success message

**Solution 2: Update API URL for physical device**
Edit `src/services/api.js`:
```javascript
// Replace localhost with your computer's IP address
const API_URL = 'http://192.168.1.100:3000/api';
```

To find your IP:
```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

### Problem: Dependencies installation fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules
rm -rf backend/node_modules

# Reinstall
npm run install-all
```

### Problem: Expo won't start

**Solution:**
```bash
# Clear Expo cache
expo start -c

# Or reinstall Expo CLI
npm install -g expo-cli
```

### Problem: App shows "Backend: offline"

**Checklist:**
1. ✅ Backend server is running (`npm run backend`)
2. ✅ Backend shows "Server running on port 3000"
3. ✅ http://localhost:3000/api/health works in browser
4. ✅ API_URL in `src/services/api.js` is correct
5. ✅ Phone and computer on same WiFi (for physical device)

## 📂 Project Structure Explained

```
pharma-company-app/
├── backend/                    # Backend server
│   ├── server.js              # Main server file
│   ├── package.json           # Backend dependencies
│   └── data/                  # JSON database (auto-created)
│       ├── users.json
│       ├── medicines.json
│       ├── orders.json
│       └── reports.json
│
├── src/                       # Frontend source code
│   ├── services/
│   │   └── api.js            # API integration layer
│   └── screens/              # All app screens
│       ├── LoginScreen.js    # Offline login
│       ├── LoginScreenWithAPI.js  # Backend login
│       └── dashboards/       # Role-specific dashboards
│
├── App.js                    # Main app entry
├── start.js                  # Auto-start script
└── package.json              # Frontend dependencies
```

## 🔐 Security Notes

### For Development:
- Demo credentials are hardcoded
- No password hashing (plain text)
- Simple token authentication
- CORS enabled for all origins

### For Production:
- [ ] Implement bcrypt for password hashing
- [ ] Use proper JWT tokens
- [ ] Add rate limiting
- [ ] Implement HTTPS
- [ ] Use environment variables
- [ ] Migrate to proper database (MongoDB/PostgreSQL)
- [ ] Add input validation and sanitization
- [ ] Implement proper error handling

## 📊 Data Management

### Viewing Data
All data is stored in JSON files in `backend/data/`:
```bash
# View users
cat backend/data/users.json

# View medicines
cat backend/data/medicines.json
```

### Resetting Data
Delete the data files and restart backend:
```bash
rm -rf backend/data
npm run backend
```
Backend will auto-create fresh data files with demo data.

### Backing Up Data
```bash
# Create backup
cp -r backend/data backend/data-backup

# Restore backup
cp -r backend/data-backup backend/data
```

## 🎓 Learning Resources

- **React Native:** https://reactnative.dev/
- **Expo:** https://docs.expo.dev/
- **Express.js:** https://expressjs.com/
- **React Navigation:** https://reactnavigation.org/

## 💡 Development Tips

1. **Hot Reload:** Changes to frontend code auto-reload in Expo
2. **Backend Changes:** Restart backend server after changes
3. **Debugging:** Use React Native Debugger or Chrome DevTools
4. **Logs:** Check terminal for backend logs
5. **API Testing:** Use Postman or Thunder Client for API testing

## 🚀 Next Steps

After successful setup:

1. ✅ Test all user roles
2. ✅ Add/edit/delete medicines
3. ✅ Explore different dashboards
4. ✅ Check backend data files
5. ✅ Customize for your needs

## 📞 Getting Help

If you encounter issues:

1. Check this guide thoroughly
2. Review error messages in terminal
3. Check backend logs
4. Verify all prerequisites are installed
5. Try the troubleshooting section

## 🎉 Success Checklist

- [ ] Node.js and npm installed
- [ ] Repository cloned
- [ ] Dependencies installed (frontend + backend)
- [ ] Backend server running on port 3000
- [ ] Frontend Expo server running
- [ ] Backend health check passes
- [ ] Can login with demo credentials
- [ ] Can add/view medicines
- [ ] Data persists in JSON files

---

**Congratulations! 🎊** Your Pharma Company App is now fully set up and running!