// AppRoutes.jsx


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Accounts from '../pages/Accounts';
import Transactions from '../pages/Transactions';
import Register from '../pages/Register';
import Auth from '../pages/Auth';
import { Toaster } from 'react-hot-toast';

export default function AppRoutes() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </Router>
  );
}
