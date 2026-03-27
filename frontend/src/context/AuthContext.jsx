// AuthContext.jsx
import { createContext, useEffect, useState, useContext } from 'react';
import { login, register, logout } from '../api/authApi';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('simplebank_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('simplebank_user', JSON.stringify(user));
      return;
    }

    localStorage.removeItem('simplebank_user');
  }, [user]);

  // Updated: Accept both email and password
  const handleLogin = async (email, password) => {
    try {
      const res = await login({ email, password });
      return res;
    } catch (err) {
      throw err;
    }
  };

  // Updated: Accept name, email, and password
  const handleRegister = async (name, email, password) => {
    try {
      const res = await register({ name, email, password });
      return res;
    } catch (err) {
      throw err;
    }
  };

  const handleLogout = async () => {
    const res = await logout();
    setUser(null);
    return res;
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login: handleLogin, register: handleRegister, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}
