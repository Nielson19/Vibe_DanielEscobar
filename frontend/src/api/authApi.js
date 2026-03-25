// authApi.js
// Authentication API calls
import axios from './axios';

export const login = (credentials) => axios.post('/auth/login', credentials);
export const register = (credentials) => axios.post('/auth/register', credentials);
export const logout = () => axios.post('/auth/logout');
