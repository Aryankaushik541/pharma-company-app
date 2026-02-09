# 🏥 Pharmaceutical Company Management App

A comprehensive React Native mobile application for pharmaceutical company management with **complete backend integration**, multi-role authentication, and real-time data management.

## 🌟 Key Features

### ✨ Auto-Start Backend & Frontend
- **One command starts everything!** Backend automatically starts with frontend
- No need to run servers separately
- Backend runs on `http://localhost:3000`
- Frontend opens Expo DevTools automatically

### 🔐 Multi-Role Authentication System
The app supports 9 different user roles with separate login credentials and dashboards:

1. **Admin** - Complete system control and user management
2. **CEO** - Executive oversight and strategic planning
3. **Manager** - Team and operations management
4. **ABM (Area Business Manager)** - Area-level sales and team supervision
5. **ZBM (Zonal Business Manager)** - Zone-level operations and strategy
6. **District Manager** - District-level coordination and distribution
7. **MR (Medical Representative)** - Field operations and doctor visits
8. **Developer** - System maintenance and technical operations
9. **Customer** - Medicine browsing and order management

### 💾 Complete Backend API
- **Express.js REST API** with JSON file-based database
- **Auto-initialized data** - Users, medicines, orders, and reports
- **CRUD operations** for all entities
- **Real-time data persistence**
- **Health check endpoint** for monitoring

### Core Modules

#### 🔐 Authentication
- Role-based login with backend validation
- Secure credential management
- JWT-style token authentication
- Session persistence with AsyncStorage
- Backend health status indicator

#### 💊 Medicine Management
- Add new medicines with complete details
- Real-time sync with backend
- View medicine inventory from database
- Update stock information
- Delete medicines with confirmation
- Track expiry dates and batch numbers
- Manage pricing and manufacturers

#### 📊 Role-Specific Dashboards
Each role has a customized dashboard with:
- Real-time statistics from backend
- Role-specific menu options
- Quick access to common tasks
- Performance metrics

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- React Native development environment

### Installation & Running

**Option 1: Auto-Start (Recommended)**
```bash
# Clone repository
git clone https://github.com/Aryankaushik541/pharma-company-app.git
cd pharma-company-app

# Install all dependencies (frontend + backend)
npm run install-all

# Start both backend and frontend automatically
npm start
```

**Option 2: Manual Start**
```bash
# Terminal 1 - Start Backend
npm run backend

# Terminal 2 - Start Frontend
npm run frontend
```

### Running on Device

After starting the app:
- Scan the QR code with Expo Go app (Android/iOS)
- Press 'a' for Android emulator
- Press 'i' for iOS simulator

## 🔑 Demo Credentials

All credentials work with the backend API:

### Admin
- Email: `admin@pharma.com`
- Password: `admin123`

### CEO
- Email: `ceo@pharma.com`
- Password: `ceo123`

### Manager
- Email: `manager@pharma.com`
- Password: `manager123`

### ABM (Area Business Manager)
- Email: `abm@pharma.com`
- Password: `abm123`

### ZBM (Zonal Business Manager)
- Email: `zbm@pharma.com`
- Password: `zbm123`

### District Manager
- Email: `dm@pharma.com`
- Password: `dm123`

### MR (Medical Representative)
- Email: `mr@pharma.com`
- Password: `mr123`

### Developer
- Email: `dev@pharma.com`
- Password: `dev123`

### Customer
- Email: `customer@pharma.com`
- Password: `customer123`

## 📁 Project Structure

```
pharma-company-app/
├── App.js                          # Main app entry point
├── start.js                        # Auto-start script for backend + frontend
├── package.json                    # Frontend dependencies
├── backend/
│   ├── server.js                   # Express backend server
│   ├── package.json                # Backend dependencies
│   └── data/                       # JSON database files (auto-created)
│       ├── users.json
│       ├── medicines.json
│       ├── orders.json
│       └── reports.json
├── src/
│   ├── services/
│   │   └── api.js                  # API service layer
│   └── screens/
│       ├── LoginScreen.js          # Offline login (demo)
│       ├── LoginScreenWithAPI.js   # Backend-integrated login
│       ├── MedicineManagement.js   # Offline medicine management
│       ├── MedicineManagementWithAPI.js  # Backend-integrated
│       └── dashboards/
│           ├── AdminDashboard.js
│           ├── CEODashboard.js
│           ├── ManagerDashboard.js
│           ├── ABMDashboard.js
│           ├── ZBMDashboard.js
│           ├── DistrictManagerDashboard.js
│           ├── MRDashboard.js
│           ├── DeveloperDashboard.js
│           └── CustomerDashboard.js
```

## 🛠️ Technologies Used

### Frontend
- **React Native** - Mobile app framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **AsyncStorage** - Local data persistence
- **React Native Vector Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Body-Parser** - Request body parsing
- **File System (fs)** - JSON-based database

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Medicines
- `GET /api/medicines` - Get all medicines
- `GET /api/medicines/:id` - Get medicine by ID
- `POST /api/medicines` - Add new medicine
- `PUT /api/medicines/:id` - Update medicine
- `DELETE /api/medicines/:id` - Delete medicine

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order

### Reports
- `GET /api/reports` - Get all reports
- `POST /api/reports` - Create report

### Stats
- `GET /api/stats/dashboard` - Get dashboard statistics

### Health
- `GET /api/health` - Backend health check

## 📱 App Features

### Login Screen
- Role selection interface
- Email and password authentication
- Backend connection status indicator
- Demo credentials display
- Secure login validation with backend

### Dashboard Screens
Each role has a unique dashboard featuring:
- Welcome header with logout option
- Real-time statistics from backend
- Menu grid with role-specific options
- Color-coded interface elements

### Medicine Management
- Add new medicines with backend sync
- Real-time list from database
- Medicine details display
- Delete functionality with backend update
- Pull-to-refresh capability
- Loading states and error handling

## 🎨 Design Features

- Modern, clean UI with Material Design principles
- Color-coded role identification
- Responsive layouts for different screen sizes
- Intuitive navigation patterns
- Professional pharmaceutical theme
- Loading indicators and error states
- Pull-to-refresh functionality

## 🔒 Security Features

- Role-based access control
- Secure credential validation with backend
- Token-based authentication
- Session management
- Protected routes
- Data persistence security

## 📊 Data Management

- **JSON-based database** - Simple and portable
- **Auto-initialization** - Pre-populated with demo data
- **Real-time updates** - Changes reflect immediately
- **Data persistence** - All data saved to files
- **Easy backup** - Just copy the data folder

## 🚀 Deployment Options

### Backend Deployment
- Deploy to Heroku, Railway, or any Node.js hosting
- Environment variables for production
- Easy database migration to MongoDB/PostgreSQL

### Frontend Deployment
- Build APK for Android
- Build IPA for iOS
- Publish to Expo

## 📈 Future Enhancements

- [ ] MongoDB/PostgreSQL integration
- [ ] Real-time WebSocket notifications
- [ ] Advanced reporting and analytics
- [ ] Barcode scanning for medicines
- [ ] GPS tracking for field staff
- [ ] Chat and messaging system
- [ ] Document management
- [ ] Payment gateway integration
- [ ] Multi-language support
- [ ] Offline mode with sync
- [ ] Push notifications
- [ ] Image upload for medicines

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Created with ❤️ for pharmaceutical industry management

## 📞 Support

For support, email: support@pharmaapp.com

## 🎯 NPM Scripts

```bash
npm start              # Auto-start backend + frontend
npm run frontend       # Start only frontend (Expo)
npm run backend        # Start only backend server
npm run install-all    # Install all dependencies
npm run android        # Run on Android
npm run ios            # Run on iOS
npm run web            # Run on web
```

## 💡 Tips

- Backend runs on `http://localhost:3000`
- Check backend health at `http://localhost:3000/api/health`
- Data files are in `backend/data/` folder
- Use `npm start` for easiest setup
- Press Ctrl+C to stop both servers

---

**Note**: This app includes a complete backend with JSON-based database. For production use, consider migrating to a proper database like MongoDB or PostgreSQL and implement additional security measures like password hashing and JWT tokens.