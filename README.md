# 🏥 Pharmaceutical Company Management App

A comprehensive React Native mobile application for pharmaceutical company management with multi-role authentication and complete business operations support.

## 📱 Features

### Multi-Role Authentication System
The app supports 9 different user roles with separate login credentials and dashboards:

1. **Admin** - Complete system control
2. **CEO** - Executive oversight and strategic planning
3. **Manager** - Team and operations management
4. **ABM (Area Business Manager)** - Area-level sales and team supervision
5. **ZBM (Zonal Business Manager)** - Zone-level operations and strategy
6. **District Manager** - District-level coordination and distribution
7. **MR (Medical Representative)** - Field operations and doctor visits
8. **Developer** - System maintenance and technical operations
9. **Customer** - Medicine browsing and order management

### Core Modules

#### 🔐 Authentication
- Role-based login system
- Secure credential management
- Session persistence with AsyncStorage
- Demo credentials for testing

#### 💊 Medicine Management
- Add new medicines with complete details
- View medicine inventory
- Update stock information
- Delete medicines
- Track expiry dates
- Manage pricing and manufacturers

#### 📊 Role-Specific Dashboards
Each role has a customized dashboard with:
- Real-time statistics
- Role-specific menu options
- Quick access to common tasks
- Performance metrics

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- React Native development environment

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Aryankaushik541/pharma-company-app.git
cd pharma-company-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
expo start
```

4. Run on your device:
- Scan the QR code with Expo Go app (Android/iOS)
- Press 'a' for Android emulator
- Press 'i' for iOS simulator

## 🔑 Demo Credentials

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
├── package.json                    # Dependencies
├── src/
│   └── screens/
│       ├── LoginScreen.js          # Multi-role login
│       ├── MedicineManagement.js   # Medicine CRUD operations
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

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **AsyncStorage** - Local data persistence
- **React Native Vector Icons** - Icon library

## 📱 App Screens

### Login Screen
- Role selection interface
- Email and password authentication
- Demo credentials display
- Secure login validation

### Dashboard Screens
Each role has a unique dashboard featuring:
- Welcome header with logout option
- Statistics cards with key metrics
- Menu grid with role-specific options
- Color-coded interface elements

### Medicine Management
- Add new medicines with form validation
- List view of all medicines
- Medicine details display
- Delete functionality with confirmation
- Search and filter capabilities

## 🎨 Design Features

- Modern, clean UI with Material Design principles
- Color-coded role identification
- Responsive layouts for different screen sizes
- Intuitive navigation patterns
- Professional pharmaceutical theme

## 🔒 Security Features

- Role-based access control
- Secure credential validation
- Session management
- Protected routes
- Data persistence security

## 📈 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time data synchronization
- [ ] Push notifications
- [ ] Advanced reporting and analytics
- [ ] Barcode scanning for medicines
- [ ] GPS tracking for field staff
- [ ] Chat and messaging system
- [ ] Document management
- [ ] Payment gateway integration
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Created with ❤️ for pharmaceutical industry management

## 📞 Support

For support, email: support@pharmaapp.com

---

**Note**: This is a demo application with mock data. For production use, integrate with a proper backend API and implement additional security measures.