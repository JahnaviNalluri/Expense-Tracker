💸 Expense Tracker – MERN Stack

A full-stack Expense Tracker application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).
The project helps users manage expenses, income, categories, and sessions with authentication, analytics, and a clean dashboard UI.

🚀 Overview

The Expense Tracker application allows users to:

Register and login securely using JWT authentication
Manage expenses and income
Create categorized transactions
Track expense sessions
View analytics and session history
Monitor remaining balance and category-wise spending
Access a modern dashboard UI

The application follows a scalable layered architecture with separate controllers, services, routes, and models.


🧱 Project Structure
Backend Structure
backend
│
├── src
│   ├── config              # MongoDB configuration
│   ├── controllers         # Request handling logic
│   ├── middleware          # Authentication middleware
│   ├── models              # MongoDB schemas
│   ├── routes              # API routes
│   ├── services            # Business logic layer
│
├── app.js
├── server.js
└── package.json
Frontend Structure
frontend
│
├── public
│
├── src
│   ├── assets              # Images and icons
│   ├── components          # Reusable components
│   ├── pages               # Application pages
│   ├── styles              # CSS files
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── package.json


🔐 Authentication & Security

🔒 Authentication Features
JWT-based authentication
Secure password hashing using BCrypt
Login & Registration system
Protected API architecture
Environment variable support using dotenv

🔄 Authentication Flow
User registers with name, email, phone number, and password
Password is hashed using BCrypt
User logs in with email and password
JWT token is generated upon successful authentication
Token is used to access protected resources


✨ Features

👤 User Management
Register new users
Login authentication
Get all users with pagination
Get user by username
Update user by:
ID
Username
Delete user by:
ID
Username

💳 Expense Management
Add expenses and income
Get all expenses
Update expenses
Delete expenses
Filter expenses by:
Type
Title
Category
Get expenses by session

🗂️ Category Management
Create categories
Prevent duplicate categories
Update categories
Delete categories
Paginated category listing

📂 Expense Sessions
Create expense sessions
Automatically deactivate old active sessions
Refresh sessions
Get active session
View session history
Get full session analytics
Delete sessions

📊 Analytics
Total income calculation
Total expense calculation
Remaining balance tracking
Category-wise breakdown
Expense vs Income breakdown
Previous session comparison analytics

🖥️ Frontend Pages
Login Page
Register Page
Dashboard
Expenses Page
Sessions Page
Admin Page

⚙️ Tech Stack
Frontend
React.js
Vite
Axios
CSS
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
BCrypt
dotenv


📡 API Endpoints
🔑 Authentication
Method	Endpoint	Description
POST	/users/login	Login user
👤 Users
Method	Endpoint	Description
POST	/users	Register user
GET	/users	Get all users
GET	/users/username/:username	Get user by username
PUT	/users/id/:id	Update user by ID
PUT	/users/username/:username	Update user by username
DELETE	/users/id/:id	Delete user by ID
DELETE	/users/username/:username	Delete user by username

💳 Expenses
Method	Endpoint	Description
POST	/expenses	Add expense
GET	/expenses	Get all expenses
GET	/expenses/:id	Get expense by ID
GET	/expenses/session/:sessionId	Get expenses by session
GET	/expenses/type/:type	Filter by type
GET	/expenses/title/:title	Filter by title
GET	/expenses/category/:category	Filter by category
PUT	/expenses/:id	Update expense
DELETE	/expenses/:id	Delete expense

🗂️ Categories
Method	Endpoint	Description
POST	/categories	Create category
GET	/categories	Get all categories
GET	/categories/:id	Get category by ID
PUT	/categories/:id	Update category
DELETE	/categories/:id	Delete category

📂 Expense Sessions
Method	Endpoint	Description
POST	/sessions	Create session
POST	/sessions/refresh	Refresh session
GET	/sessions/active/:userId	Get active session
GET	/sessions/history/:userId	Get session history
GET	/sessions/full-history/:userId	Get detailed session history
GET	/sessions/:id	Get session by ID
DELETE	/sessions/:id	Delete session

📊 Analytics
Method	Endpoint	Description
GET	/analytics/:sessionId	Get session analytics

📈 Key Functionalities
Session-Based Expense Tracking

Each user can maintain active sessions for tracking expenses separately.

Example:

Monthly Budget
Vacation Spending
College Expenses
Category-Wise Expense Analysis

The application calculates:

Total spent per category
Remaining balance
Total income
Total expenses
Pagination Support

Pagination is implemented for:

Users
Expenses
Categories
Sessions
▶️ How to Run
1️⃣ Clone Repository
git clone <your-repository-url>
2️⃣ Install Backend Dependencies
cd backend
npm install
3️⃣ Install Frontend Dependencies
cd frontend
npm install
4️⃣ Configure Environment Variables

Create a .env file inside backend:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
5️⃣ Run Backend
npm run dev
6️⃣ Run Frontend
npm run dev
🛠️ Future Enhancements
Role-based authorization
Charts & visual analytics
Monthly reports
Budget goals
Export reports to PDF
Dark mode UI
Notifications & reminders
Docker deployment
CI/CD integration
📝 Notes
Built using MERN stack architecture
Layered backend architecture
RESTful APIs
JWT-secured authentication
Responsive frontend dashboard
Designed for scalability and maintainability
