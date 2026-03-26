export const addTransaction = (accountId, amount, type) => axios.post('/transactions', { account_id: accountId, amount, type });
export const getTransactionsByAccountId = (accountId) => axios.get(`/transactions/account/${accountId}`);
// accountApi.js
// Account-related API calls
import axios from './axios';

export const getAccounts = () => axios.get('/accounts');
export const getAccountsById = (id) => axios.get(`/accounts/user/${id}`);
export const getUserById = (id) => axios.get(`/users/${id}`);
export const addAccount = (userId, balance, type) => axios.post('/accounts', { user_id: userId, balance, account_type: type });
export const removeAccount = (accountId) => axios.delete(`/accounts/${accountId}`);