# SimpleBankingProject Frontend

## Technology Stack

- **React**: UI library for building user interfaces
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing tool
- **Autoprefixer**: PostCSS plugin to parse CSS and add vendor prefixes
- **Axios**: Promise-based HTTP client for API calls
- **React Router DOM**: Routing for React applications
- **ESLint**: Linting utility for JavaScript/JSX

## File Structure

```
frontend/
├── src/
│   ├── api/              # All API calls (VERY IMPORTANT)
│   │   ├── axios.js
│   │   ├── authApi.js
│   │   └── accountApi.js
│   ├── components/       # Reusable UI pieces
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Button.jsx
│   │   └── Card.jsx
│   ├── pages/            # Full pages (routes)
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Accounts.jsx
│   │   └── Transactions.jsx
│   ├── hooks/            # Custom hooks
│   │   └── useAuth.js
│   ├── context/          # Global state
│   │   └── AuthContext.jsx
│   ├── layouts/          # Page layouts
│   │   └── MainLayout.jsx
│   ├── routes/           # Routing config
│   │   └── AppRoutes.jsx
│   ├── utils/            # Helpers
│   │   └── formatCurrency.js
│   ├── App.jsx
│   └── main.jsx
```

## Coding Plan

- Organize all API logic in `src/api` for maintainability and separation of concerns.
- Use `src/components` for reusable UI elements (Navbar, Sidebar, Button, Card, etc).
- Place full page components in `src/pages` for each route/view.
- Store custom React hooks in `src/hooks`.
- Manage global state/context in `src/context`.
- Use `src/layouts` for layout wrappers (e.g., MainLayout).
- Define all routing in `src/routes`.
- Place utility/helper functions in `src/utils`.
- Entry point is `main.jsx`, main app component is `App.jsx`.

---


---

## Project Progress (as of March 25, 2026)

### Core Features Implemented

- **Modern UI/UX**: Built with React, Tailwind CSS, and Vite for a fast, responsive, and visually appealing experience.
- **Authentication**: Combined login/register page with animated transitions, error handling, and backend integration.
- **API Integration**: All authentication and account actions use a dedicated API layer (`src/api`) with Axios, connecting to a Flask backend.
- **Backend**: Flask API with MySQL for persistent user/account/transaction data. Auth routes (`/auth/login`, `/auth/register`) are live and tested.
- **Proxy Setup**: Vite dev server proxies `/api` requests to Flask backend for seamless local development.
- **Reusable Components**: Navbar, Sidebar, Button, Card, and more for consistent UI.
- **Routing**: React Router DOM for navigation between pages (Login, Register, Dashboard, Accounts, Transactions, etc).
- **State Management**: Context and custom hooks for authentication and global state.

### Next Steps
- Add more backend endpoints for accounts and transactions
- Implement user dashboard and account management features
- Add tests and further error handling

---

_This README is updated as features are added and the project evolves._
