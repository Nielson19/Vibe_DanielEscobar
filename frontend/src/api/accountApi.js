// accountApi.js
// Account-related API calls
import axios from './axios';

export const getAccounts = () => axios.get('/accounts');
export const getAccountById = (id) => axios.get(`/accounts/${id}`);
