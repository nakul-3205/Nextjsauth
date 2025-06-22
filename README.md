Next.js Authentication App
A full-stack authentication system built with Next.js 14/15 App Router, MongoDB, and TypeScript/JavaScript. It supports user sign-up, login, logout, email verification, and protected profile routes using JWT, bcryptjs, and middleware.

Features
User Registration with hashed passwords

JWT-based authentication and session management

Email verification system

Protected API and pages using server-side middleware

Profile page with dynamic routing

Logout functionality

Modular, scalable folder structure

Tech Stack
Frontend: Next.js App Router (React, Server Components, Client Components)

Backend: Node.js with Next.js API Routes

Database: MongoDB with Mongoose

Authentication: JWT + bcryptjs

Email: Nodemailer with Ethereal test email

Styling: Tailwind CSS

Folder Structure
bash
Copy
Edit
├── app/
│   ├── api/
│   │   └── users/
│   │       ├── signup/        # User registration API
│   │       ├── login/         # User login API
│   │       ├── logout/        # Logout and clear cookies
│   │       ├── verifyemail/   # Email verification API
│   │       └── me/            # Authenticated user info
│   ├── profile/               # Protected profile page
│   ├── login/                 # Login UI
│   ├── signup/                # Signup UI
│   └── verifyemail/           # Email verification handler
|   └── email/
├── models/
│   └── usermodel.ts          # Mongoose User schema
├── helpers/
│   └── mailer.ts             # Email sending function
├── dbconfig/
│   └── dbconfig.ts           # MongoDB connection logic
├── middleware.ts             # JWT verification middleware
├── .env.local                # Environment variables
└── README.md
Environment Variables
Create a .env.local file in the root of your project and add the following:

ini
Copy
Edit'
In your .env fike-
MONGO_URL=your_mongodb_connection_string
TOKEN_SECRET=your_jwt_secret_key
EMAIL_USER=your_email_user (for nodemailer)
EMAIL_PASS=your_email_password_or_app_password
Installation
Clone the repository

bash
Copy
Edit
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
Install dependencies

bash
Copy
Edit
npm install
Configure environment variables in .env.local

Run the development server

bash
Copy
Edit
npm run dev
Open http://localhost:3000 to view the app in your browser.

Future Improvements
Add refresh token system

Role-based access control (admin, user)

OAuth (Google, GitHub)

UI improvements and animations

Add forgot/reset password flow

Use a real email provider 

## there are few errors to be fixed soon
