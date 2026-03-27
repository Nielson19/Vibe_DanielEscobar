// authApi.js
// Authentication API calls
import axios from './axios';

//NOTE: credentials is an object that can contain email, password, and name (for registration)

export const login = (credentials) => axios.post('/users/auth/login', credentials);
export const register = (credentials) => axios.post('/users/auth/register', credentials);
export const logout = () => axios.post('/users/auth/logout');
