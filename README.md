# Voting App - Frontend

This is the frontend application for the Voting App built with React and TypeScript. It provides a role-based UI for both regular users (to vote) and admins (to manage users and candidates).

---

## 🛠️ Tech Stack

- React
- TypeScript
- TailwindCSS
- Axios
- JWT-based Authentication

---

## 🚀 Getting Started

Follow the steps below to get the frontend up and running locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/voting-app-frontend.git
cd voting-app-frontend
```

### 2. Install Dependencies

Make sure you have Node.js installed (preferably v18+). Then run:

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

> ⚠️ Adjust the base URL based on where your backend is running.

### 4. Run the App

```bash
npm run dev
# or
yarn dev
```

This will start the frontend on `http://localhost:5173`.

---

## 🧪 Features

- ✅ Login / Register using JWT
- ✅ Role-based UI rendering
- ✅ Voting system for users
- ✅ Admin dashboard to:
  - View voting stats
  - Manage users and candidates

---

## 🔗 Backend

Make sure the [Voting App Backend](https://github.com/your-username/voting-app-backend) is running before starting the frontend.

You can follow the backend setup instructions in its own README.