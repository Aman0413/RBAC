# **Task Management System with RBAC**

This is a Task Management System with **Role-Based Access Control (RBAC)** that allows admins to manage tasks and users. The project demonstrates the assignment of tasks to users and provides functionalities for users to update their tasks, and for admins to approve or reject tasks, as well as manage user roles.

## **Features**

### **Admin Features**

1. Assign tasks to users.
2. Approve or reject tasks once the user updates their task status to "Completed."
3. Manage users (promote, demote, or delete users).

### **User Features**

1. View and update assigned tasks.
2. Change task status to "Completed."

## Setup Instructions

1.  Clone the repository

```bash
git clone <repository-url>
cd <project-folder>

```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables.
   Create a .env file and add the following:

```bash
For server

'MONGO_URI'=your_mongodb_connection_url
'JWT_SECRET'=your_jwt_secret_key
'PORT'=4000

For client
'VITE_API_URL'=server-url

Follow env.example file

```

4. Run the application

```bash
Start frontend
npm run dev

Start backend
npm run dev
```

## **Technologies Used**

```bash
# Frontend
React.js

# Backend
Node.js, Express.js

# Database
MongoDB

# Authentication
JWT (JSON Web Tokens)

# Password Hashing
bcrypt

# Role Management
Admin and User roles using RBAC
```
