
import React, { useEffect, useState } from 'react';
import { getAccounts } from '../api/accountApi';




function TestPage() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAccounts()
      .then(res => {
        setAccounts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Error fetching accounts');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading accounts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Accounts</h2>
      <ul>
        {Array.isArray(accounts) && accounts.length > 0 ? (
          accounts.map((acc, idx) => (
            <li key={acc.id || idx}>{JSON.stringify(acc)}</li>
          ))
        ) : (
          <li>No accounts found.</li>
        )}
      </ul>
    </div>
  );
}

export default TestPage