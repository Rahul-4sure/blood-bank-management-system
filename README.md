# 🩸 Blood Bank Management System (BBMS)

A comprehensive full-stack application for managing blood donations, inventory, hospital requests, and blood camps in real-time. Streamline operations across donors, blood labs, hospitals, and administrators in one unified platform.

---

## 🎯 Problem Statement

Traditional blood bank management faces critical challenges:

- ❌ No real-time visibility of blood availability
- ❌ Delayed responses to emergency blood requirements  
- ❌ Manual data entry errors and inconsistencies
- ❌ Difficulty coordinating between donors, hospitals, and labs
- ❌ Lack of centralized system for operational efficiency

**BBMS solves this** with a modern, digital-first approach to blood bank management.

---

## ✨ Key Features

### 🩸 **Donor Portal**
- Register and manage donor profile
- View upcoming blood donation camps
- Track donation history
- Receive notifications for blood urgency requests

### 🏥 **Hospital Dashboard**
- Request blood units based on inventory needs
- Track blood request history and status
- Monitor current blood stock levels
- Access donor directory for emergencies

### 🧪 **Blood Lab Management**
- Manage blood inventory and stock levels
- Organize and track blood camps
- Process blood requests from hospitals
- Monitor donor attendance and donations

### 👨‍💼 **Admin Control Panel**
- Verify and manage facilities (hospitals & blood labs)
- Monitor all donors in the system
- View system-wide analytics and statistics
- Oversee facility registrations

### 🔐 **Security & Authentication**
- JWT-based authentication
- Role-based access control (RBAC)
- Password encryption with bcryptjs
- Protected API endpoints

---

## 🛠️ Tech Stack

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose 8.19.0
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Security**: bcryptjs 3.0.2
- **API Documentation**: Swagger/OpenAPI 3.0
- **Validation**: bcryptjs for password hashing

### **Frontend**
- **Framework**: React 19.1.1 with Vite 7.1.2
- **Styling**: Tailwind CSS 4.1.12
- **Routing**: React Router DOM 7.8.2
- **Authentication**: Clerk Auth 5.43.1
- **HTTP Client**: Axios 1.11.0
- **Animations**: Framer Motion 12.23.12
- **UI Components**: Radix UI, Lucide React Icons
- **Notifications**: React Hot Toast 2.6.0

### **Deployment**
- **Backend**: Docker (Node.js 18-Alpine)
- **Frontend**: Docker (Node.js 20 + Nginx)

---

## 📁 Project Structure

```
blood-bank-management-system/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/              # Business logic
│   │   ├── authController.js
│   │   ├── donorController.js
│   │   ├── facilityController.js
│   │   ├── bloodLabController.js
│   │   ├── hospitalController.js
│   │   └── adminController.js
│   ├── models/                   # MongoDB schemas
│   │   ├── donorModel.js
│   │   ├── facilityModel.js
│   │   ├── adminModel.js
│   │   ├── bloodModel.js
│   │   ├── bloodRequestModel.js
│   │   └── CampModel.js
│   ├── routes/                   # API endpoints
│   │   ├── authRoutes.js
│   │   ├── donorRoutes.js
│   │   ├── facilityRoutes.js
│   │   ├── bloodLabRoutes.js
│   │   ├── hospitalRoutes.js
│   │   └── adminRoutes.js
│   ├── middlewares/              # Auth & authorization
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   ├── donorMiddleware.js
│   │   └── facilityMiddleware.js
│   ├── openapi/
│   │   └── index.js              # Swagger documentation
│   ├── utils/
│   │   └── authToken.js          # JWT utilities
│   ├── server.js                 # Express server
│   ├── seedAdmin.js              # Admin seed script
│   ├── Dockerfile
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/           # Reusable components
    │   │   ├── Header.jsx
    │   │   ├── Footer.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── layouts/
    │   │   ├── about/
    │   │   └── contact/
    │   ├── pages/                # Route pages
    │   │   ├── auth/             # Login, Register, RoleSetup
    │   │   ├── donor/            # Donor dashboard & features
    │   │   ├── hospital/         # Hospital dashboard & features
    │   │   ├── bloodlab/         # Lab dashboard & features
    │   │   ├── admin/            # Admin dashboard & features
    │   │   └── Landing.jsx
    │   ├── utils/                # Helper functions
    │   ├── assets/
    │   ├── App.jsx               # Main router
    │   └── main.jsx
    ├── Dockerfile
    ├── nginx.conf
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud - MongoDB Atlas recommended)
- **Docker** (optional, for containerization)

### Environment Setup

#### Backend (.env)
```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
JWT_SECRET=your-secret-key-here
PORT=5000
CORS_ORIGIN=http://localhost:5173,http://localhost:5174
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-key-here
```

### Installation & Running Locally

#### 1. Clone the Repository
```bash
git clone https://github.com/Rahul-4sure/blood-bank-management-system.git
cd blood-bank-management-system
```

#### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
The backend will run on `http://localhost:5000`

#### 3. Frontend Setup (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`

#### 4. Seed Admin Account (Optional)
```bash
cd backend
node seedAdmin.js
```
Default admin credentials:
- **Email**: rahul@admin.com
- **Password**: Password@123

---

## 📚 API Documentation

Once the backend is running, access the interactive API documentation at:

```
http://localhost:5000/api/doc
```

### Key API Endpoints

**Authentication**
- `POST /api/auth/register` - Register new user (donor/facility)
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `GET /api/auth/session` - Get session info (protected)

**Donor Management**
- `GET /api/donor/` - Get all donors
- `POST /api/donor/` - Create donor profile
- `GET /api/donor/:id` - Get donor details
- `PUT /api/donor/:id` - Update donor profile

**Facilities (Hospitals & Labs)**
- `GET /api/facility/` - Get all facilities
- `POST /api/facility/` - Register facility
- `GET /api/facility/:id` - Get facility details
- `PUT /api/facility/:id` - Update facility

**Blood Lab Operations**
- `GET /api/blood-lab/inventory` - Get blood stock
- `POST /api/blood-lab/camps` - Create blood camp
- `GET /api/blood-lab/requests` - View blood requests

**Hospital Operations**
- `POST /api/hospital/request-blood` - Request blood
- `GET /api/hospital/inventory` - View hospital blood stock
- `GET /api/hospital/requests` - View request history

**Admin Operations**
- `GET /api/admin/facilities` - Verify facilities
- `GET /api/admin/donors` - View all donors
- `GET /api/admin/analytics` - System analytics

---

## 🐳 Docker Deployment

### Build Docker Images

**Backend**
```bash
cd backend
docker build -t bbms-backend .
docker run -p 5000:5000 --env-file .env bbms-backend
```

**Frontend**
```bash
cd frontend
docker build -t bbms-frontend .
docker run -p 80:80 bbms-frontend
```

### Docker Compose (Coming Soon)
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=${MONGO_URI}
      - JWT_SECRET=${JWT_SECRET}
  
  frontend:
    build: ./frontend
    ports:
      - "80:80"
```

---

## 👥 User Roles & Workflows

### Donor
1. Register account
2. Browse upcoming blood camps
3. Donate blood at camps
4. View donation history
5. Receive emergency requests

### Hospital
1. Register facility
2. Request blood units
3. Track request status
4. Monitor blood inventory
5. Access donor directory

### Blood Lab
1. Register laboratory
2. Organize blood camps
3. Process donations
4. Manage blood inventory
5. Fulfill hospital requests

### Admin
1. Verify facility registrations
2. Monitor all donors
3. View system statistics
4. Manage user roles
5. Oversee compliance

---

## 🔐 Security Features

- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Password Hashing** - bcryptjs with salt rounds
- ✅ **Role-Based Access Control (RBAC)** - Different permissions per role
- ✅ **Protected Routes** - ProtectedRoute component on frontend
- ✅ **CORS Configuration** - Restricted to allowed origins
- ✅ **Input Validation** - Schema-level validation with Mongoose
- ✅ **Error Handling** - Consistent error responses

---

## 🧪 Testing

Currently, the project uses manual testing. To add automated tests:

```bash
# Backend (add Jest/Mocha)
npm install --save-dev jest supertest

# Frontend (add Vitest/React Testing Library)
npm install --save-dev vitest @testing-library/react
```

---

## 📊 Database Models

### Key Collections

**Donor**
- Personal information (name, email, phone)
- Blood group, health status
- Donation history
- Emergency contact

**Facility** (Hospital/Lab)
- Registration details
- Address & contact info
- Verification status
- Type (hospital or blood-lab)

**Blood Stock**
- Blood group type
- Unit count
- Expiry date
- Facility reference

**Blood Request**
- Hospital requesting
- Units needed
- Blood group type
- Status (pending/fulfilled)
- Priority level

**Blood Camp**
- Date & location
- Organized by blood lab
- Donor attendance
- Units collected

---

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first with Tailwind CSS
- **Dark Mode Support** - Clerk theme integration
- **Smooth Animations** - Framer Motion transitions
- **Toast Notifications** - User feedback with React Hot Toast
- **Accessible Icons** - Lucide React icons
- **Clean Dashboard Layouts** - Role-specific interfaces

---

## 📈 Future Enhancements

- [ ] SMS/Email notifications for blood urgency
- [ ] Blood donation appointment scheduling
- [ ] Donor eligibility checker
- [ ] Analytics dashboard with charts
- [ ] Mobile app (React Native)
- [ ] AI-based blood matching
- [ ] Donation eligibility verification
- [ ] Automated email alerts
- [ ] QR code for blood tracking
- [ ] Integration with government health systems

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **ISC License** - see details in package.json

---

## 👨‍💻 Author

**Rahul** - [@Rahul-4sure](https://github.com/Rahul-4sure)

---

## 📞 Support & Contact

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review API docs at `/api/doc`

---

## 🙏 Acknowledgments

- Express.js for robust API framework
- MongoDB for flexible data storage
- React for dynamic UI
- Clerk for authentication
- Tailwind CSS for beautiful styling
- All contributors and testers

---

**Made with ❤️ for saving lives through better blood bank management.**
