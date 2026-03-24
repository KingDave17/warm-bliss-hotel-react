# 🏨 Warm Bliss Hotel - Premium Management System

A modern, full-stack hotel management and booking application built with **React**, **Firebase**, and **Paystack**. This platform offers a seamless experience for users to explore luxury accommodations, manage bookings, and process secure payments.

🚀 **Live Demo:** [View on Vercel](https://warm-bliss-hotel-react-8w96.vercel.app)

---

## ✨ Key Features

- **🔐 Secure Authentication**: Integrated Firebase Auth for safe user registration and login.
- **📅 Dynamic Booking System**: Real-time room availability and streamlined booking forms.
- **💳 Integrated Payments**: Secure checkout experience powered by the **Paystack API**.
- **📊 Personal Dashboard**: Users can track their booking history and update profiles in real-time.
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.
- **⚡ Performance-First**: Built with Vite for lightning-fast load times and smooth transitions.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vite.dev/)
- **Styling**: [CSS Modules](https://github.com/css-modules/css-modules) (Vanilla CSS)
- **Backend / Database**: [Firebase](https://firebase.google.com/) (Firestore & Auth)
- **Payments**: [Paystack](https://paystack.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/KingDave17/warm-bliss-hotel-react.git
cd hotel-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and add your credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
```

### 4. Run the application
```bash
npm run dev
```

---

## 📸 Project Structure

```text
hotel-app/
├── src/
│   ├── assets/         # Images, icons, and static assets
│   ├── components/     # Reusable UI components (Modals, Nav, etc.)
│   ├── context/        # React Context API global state (Auth)
│   ├── firebase/       # Firebase service initialization & config
│   ├── pages/          # Main application views/routes
│   ├── App.jsx         # Main App routing and layout logic
│   └── main.jsx        # Application entry point
├── .env                # Local environment variables (Git Ignored)
├── .npmrc              # Production build configuration for Vercel
├── package.json        # Project metadata and dependencies
└── vite.config.js      # Vite build and server configuration
```

---

## 📝 License
Distributed under the MIT License. See `LICENSE` for more information.

---

*Developed by [KingDave17](https://github.com/KingDave17)*
