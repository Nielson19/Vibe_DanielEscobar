// accountApi.js
// Account-related API calls
import axios from './axios';

export const getAccounts = () => axios.get('/accounts');
export const getAccountsById = (id) => axios.get(`/accounts/user/${id}`);
export const getUserById = (id) => axios.get(`/users/${id}`);
export const addAccount = (userId, balance, type) => axios.post('/accounts', { userId, balance, type });
