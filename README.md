# 🔐 Web3 Message Signer & Verifier

A full-stack Web3 application that allows users to authenticate using Dynamic.xyz embedded wallet (headless implementation), sign custom messages, and verify signatures on the backend.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Highlights & Design Decisions](#highlights--design-decisions)
- [Future Improvements](#future-improvements)

---

## 🎯 Overview

This project implements a complete Web3 authentication and message signing flow:

1. **User authenticates** via Dynamic.xyz Embedded Wallet (headless email authentication)
2. **Signs custom messages** using their wallet
3. **Backend verifies** the signature using `ethers.js`
4. **Displays history** of all signed messages with persistence

---

## 🏗️ Architecture

### Backend (Node.js + Express)

The backend follows a clean, modular architecture with separation of concerns:

```
backend/
├── src/
│   ├── index.ts                 # Express app entry point
│   ├── middlewares/
│   │   └── validateSchema.ts    # Zod schema validation middleware
│   ├── routes/
│   │   ├── applyRoutes.ts       # Route registration
│   │   └── verify-signature/
│   │       ├── controller.ts    # Request handler
│   │       ├── schema.ts        # Zod validation schema
│   │       └── index.ts         # Route definition
│   └── utils/
│       └── verifyMessage.ts     # Signature verification logic
```

**Key Backend Features:**

- ✅ **Single Responsibility Principle**: Each module has a clear purpose
- ✅ **Type-safe Validation**: Zod schemas ensure request data integrity
- ✅ **Modular Routes**: Easy to add new endpoints without cluttering main file
- ✅ **Reusable Middleware**: Validation logic centralized and reusable

### Frontend (React + Vite)

The frontend uses a scalable architecture designed for growth:

```
frontend/
├── src/
│   ├── components/
│   │   ├── GuardAuth/          # Route protection component
│   │   ├── Loading/            # Loading state component
│   │   ├── LoginForm/          # Multi-step login flow
│   │   │   ├── LoginForm.tsx
│   │   │   ├── LoginFormContext.tsx  # Context for login steps
│   │   │   ├── LoginFormEmail.tsx
│   │   │   └── LoginFormOTP.tsx
│   │   └── SignMessageForm/    # Message signing component
│   ├── Pages/
│   │   ├── Home/               # Landing page
│   │   ├── Login/              # Login page
│   │   └── Dashboard/          # Protected dashboard
│   ├── Providers/
│   │   └── DynamicProvider.tsx # Dynamic.xyz configuration
│   ├── store/
│   │   ├── store.ts            # Redux store configuration
│   │   └── slices/
│   │       └── HistorySlice.ts # Signature history state
│   ├── hooks/
│   │   └── useIsAuthenticated.ts  # Auth status hook
│   ├── services/
│   │   └── validateSign.ts     # API call to backend
│   └── routes.tsx              # React Router configuration
```

**Key Frontend Features:**

- ✅ **Component Isolation**: Each component is self-contained and reusable
- ✅ **Context-based State**: Login flow managed via Context API
- ✅ **Redux + Persist**: Global state with automatic localStorage persistence
- ✅ **Protected Routes**: GuardAuth component secures authenticated pages
- ✅ **Custom Hooks**: Abstracts complex logic (authentication, etc.)

---

## ⚡ Key Features

### 🔒 Authentication

- **Dynamic.xyz Headless Implementation**: Email-based authentication without using the pre-built widget
- **Multi-step Login Flow**: Email input → OTP verification (managed via Context)
- **Session Persistence**: Automatic session management via Dynamic SDK

### ✍️ Message Signing

- **Custom Message Input**: Users can sign any text message
- **Wallet Integration**: Direct integration with Dynamic.xyz primary wallet
- **React Hook Form + Zod**: Type-safe form handling with validation

### ✅ Signature Verification

- **Backend Validation**: Uses `ethers.js` to cryptographically verify signatures
- **Address Recovery**: Extracts and validates the signer's address
- **Type-safe API**: Zod schemas ensure data integrity

### 📜 Signature History

- **Persistent Storage**: Redux Persist automatically saves history to localStorage
- **Auto-clear on Logout**: History is wiped when user logs out (security best practice)
- **Real-time Updates**: Redux state immediately reflects new signatures

### 🎨 User Experience

- **Toast Notifications**: Real-time feedback using react-toastify
- **Loading States**: Clear loading indicators during async operations
- **Error Handling**: Graceful error handling with user-friendly messages

---

## 🛠️ Tech Stack

### Frontend

| Technology          | Purpose                                 |
| ------------------- | --------------------------------------- |
| **React 19**        | UI framework with latest features       |
| **Vite**            | Fast build tool and dev server          |
| **TypeScript**      | Type safety across the application      |
| **Redux Toolkit**   | State management with best practices    |
| **Redux Persist**   | Automatic localStorage synchronization  |
| **React Router v7** | Client-side routing                     |
| **React Hook Form** | Performant form handling                |
| **Zod**             | Schema validation                       |
| **Dynamic.xyz SDK** | Web3 authentication & wallet management |
| **ethers.js v6**    | Ethereum library for signing            |
| **React Toastify**  | Toast notifications                     |

### Backend

| Technology       | Purpose                         |
| ---------------- | ------------------------------- |
| **Node.js**      | JavaScript runtime              |
| **Express**      | Web framework                   |
| **TypeScript**   | Type safety                     |
| **ethers.js v6** | Signature verification          |
| **Zod**          | Request validation              |
| **CORS**         | Cross-origin resource sharing   |
| **dotenv**       | Environment variable management |

---

## 📂 Project Structure

```
.
├── backend/               # Express API
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/              # React application
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
└── README.md             # This file
```

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Dynamic.xyz account with Environment ID

### 1. Clone the Repository

```bash
git clone <repository-url>
cd decentralizedmasters-test
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
echo "PORT=3000" > .env

# Run development server
npm run dev

# Or build and run production
npm run build
npm start
```

The backend will run on `http://localhost:3000`

**Available Endpoints:**

- `GET /` - Welcome message
- `POST /api/verify-signature` - Verify message signature
- `GET /api/health` - Health check

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file with your Dynamic.xyz credentials
echo "VITE_DYNAMIC_XYZ_ENV_ID=your_environment_id_here" > .env
echo "VITE_API_URL=http://localhost:3000" >> .env

# Run development server
npm run dev

# Or build for production
npm run build
npm run preview
```

The frontend will run on `http://localhost:5173`

### 4. Environment Variables

**Backend (.env):**

```env
PORT=3000
```

**Frontend (.env):**

```env
VITE_DYNAMIC_XYZ_ENV_ID=your_dynamic_xyz_environment_id
VITE_API_URL=http://localhost:3000
```

---

## 📡 API Documentation

### POST /api/verify-signature

Verifies a signed message and returns the signer's address.

**Request:**

```json
{
	"message": "Hello, Web3!",
	"signature": "0x..."
}
```

**Response (Success):**

```json
{
	"isValid": true,
	"signer": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
	"originalMessage": "Hello, Web3!"
}
```

**Response (Validation Error):**

```json
{
	"success": false,
	"message": "Validation error",
	"errors": [
		{
			"path": ["message"],
			"message": "Required"
		}
	]
}
```

---

## 💡 Highlights & Design Decisions

### 1. **Redux Persist for History Management** ⭐

Instead of implementing a custom localStorage solution, Redux Persist was chosen to:

- Automatically sync state with localStorage
- Provide a standardized state management approach
- Enable future expansion to other storage mechanisms (IndexedDB, sessionStorage, etc.)
- Maintain type safety with TypeScript

**Implementation:**

```typescript
// store/store.ts
const persistConfig = {
	key: "root",
	storage,
	whitelist: ["history"], // Only persist history slice
};
```

### 2. **Automatic History Cleanup on Logout** 🧹

When a user logs out, their signature history is automatically cleared for security:

```typescript
// Providers/DynamicProvider.tsx
events: {
	onLogout: () => {
		dispatch(HistorySlice.actions.clear());
		window.location.href = "/";
	};
}
```

**Why this matters:**

- Prevents signature history from being accessible after logout
- Follows security best practices
- Provides a clean state for next login session

### 3. **Context-based Multi-step Login Flow** 🔄

The login flow uses React Context to manage the email → OTP verification steps:

```typescript
// components/LoginForm/LoginFormContext.tsx
export const LoginFormContext = createContext<{
	step: number;
	setStep: (step: number) => void;
}>({ step: 1, setStep: () => {} });
```

**Benefits:**

- Decouples step management from individual components
- Easy to add more steps (e.g., MFA, profile setup)
- Clean component composition

### 4. **GuardAuth Component for Route Protection** 🛡️

Custom authentication guard prevents unauthorized access:

```typescript
// components/GuardAuth/GuardAuth.tsx
// Checks authentication status and redirects if needed
```

**Advantages:**

- Centralized auth logic
- Reusable across all protected routes
- Handles loading states gracefully

### 5. **Middleware-based Validation** ✅

Backend uses a reusable middleware for all route validation:

```typescript
// middlewares/validateSchema.ts
export const validateSchema = (schema: ZodSchema) => {
	return (req, res, next) => {
		const validatedData = schema.parse(req.body);
		// ...
	};
};
```

**Benefits:**

- DRY principle: Write validation once, use everywhere
- Consistent error responses
- Type-safe request bodies with TypeScript

### 6. **Separation of Concerns in Backend** 🏛️

Each endpoint has its own directory with clear responsibilities:

- `schema.ts` - Data validation
- `controller.ts` - Business logic
- `index.ts` - Route definition

**This makes it easy to:**

- Add new endpoints without modifying existing code
- Test individual components in isolation
- Scale the application as requirements grow

### 7. **Type Safety Everywhere** 🔒

Both frontend and backend use TypeScript with Zod for runtime validation:

```typescript
// Type inference from Zod schemas
export type VerifySignatureRequest = z.infer<typeof verifySignatureSchema>;
```

**Benefits:**

- Catch errors at compile time
- Better IDE autocomplete
- Self-documenting code

### 8. **Custom Hooks for Reusability** 🪝

Logic is abstracted into reusable hooks:

```typescript
// hooks/useIsAuthenticated.ts
export const useIsAuthenticated = (): AuthState => {
	const { user } = useDynamicContext();
	return user ? "authenticated" : "unauthenticated";
};
```

### 9. **Scalable Component Structure** 📦

Components are organized by feature, with index files for clean imports:

```typescript
// components/SignMessageForm/index.ts
export { SignMessageForm } from "./SignMessageForm";

// Usage elsewhere:
import { SignMessageForm } from "@/components/SignMessageForm";
```

### 10. **Error Handling & User Feedback** 🎯

Comprehensive error handling with user-friendly messages:

- Toast notifications for success/error states
- Try-catch blocks with specific error messages
- Validation errors displayed inline

---

## 🎨 Design Patterns Used

| Pattern                      | Implementation        | Benefit                      |
| ---------------------------- | --------------------- | ---------------------------- |
| **Context API**              | Login flow management | Avoids prop drilling         |
| **Custom Hooks**             | `useIsAuthenticated`  | Reusable auth logic          |
| **Middleware Pattern**       | Schema validation     | DRY, consistent validation   |
| **Module Pattern**           | Route organization    | Scalable backend structure   |
| **Container/Presentational** | Components separation | Testability, reusability     |
| **Redux Slices**             | State management      | Organized, predictable state |

---

## 📝 Requirements Checklist

Based on the [original assignment](https://github.com/DM-SaaS/legacy-fe-candidate-assignment/tree/main):

### Frontend Requirements

- ✅ Dynamic.xyz Embedded Wallet Headless Implementation (email-based)
- ✅ Show connected wallet address
- ✅ Form to input custom message
- ✅ Sign message functionality
- ✅ Submit `{ message, signature }` to backend
- ✅ Display backend validation result
- ✅ Show local signature history
- ✅ In-memory session state
- ✅ Good React patterns and component structure

### Backend Requirements

- ✅ REST API endpoint: `POST /api/verify-signature`
- ✅ Accept `{ message, signature }` payload
- ✅ Use `ethers.js` for signature verification
- ✅ Recover signer address from signature
- ✅ Return `{ isValid, signer, originalMessage }`
- ✅ Modular, scalable code structure

### Evaluation Focus

- ✅ **React Architecture**: Clean component design, hooks, separation of concerns
- ✅ **Dynamic.xyz Usage**: Headless implementation, wallet context management
- ✅ **Node.js + Express**: REST API, signature validation, modularity
- ✅ **Code Quality**: TypeScript, organization, error handling
- ✅ **User Experience**: Clear flows, feedback, intuitive UI
- ✅ **Extensibility**: Room for auth roles, message types, features
- ⏳ **Design**: Could be enhanced visually (I'm not very creative, so I focused on making higher quality code and using multiple libraries and features, such as Context API, Redux, etc. I believe this demonstrates both my React mastery, coding skills, and knowledge of various libraries that are useful in day-to-day work)

---

## 🙏 Acknowledgments

Built as a take-home assignment for DecentralizedMasters.

**Key Technologies:**

- [Dynamic.xyz](https://www.dynamic.xyz/) - Web3 Authentication
- [ethers.js](https://docs.ethers.org/) - Ethereum Library
- [Vite](https://vitejs.dev/) - Build Tool
- [Redux Toolkit](https://redux-toolkit.js.org/) - State Management
- [Zod](https://zod.dev/) - Schema Validation

---

**Made with ❤️ and Web3**
