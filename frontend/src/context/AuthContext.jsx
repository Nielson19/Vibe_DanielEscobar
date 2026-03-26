// AuthContext.jsx
import { createContext, useState, useContext } from 'react';
import { login, register, logout } from '../api/authApi';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

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

  return (
    <AuthContext.Provider value={{ user, setUser, login: handleLogin, register: handleRegister, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}