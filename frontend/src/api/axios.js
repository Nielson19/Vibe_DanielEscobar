// axios.js
// Axios instance setup for API calls
import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
