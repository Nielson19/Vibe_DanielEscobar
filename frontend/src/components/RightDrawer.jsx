import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';
import { getTransactionsByAccountId, addTransaction } from '../api/accountApi';
import Backdrop from '@mui/material/Backdrop';

// Props: open (bool), onClose (fn), transactions (array), accountId (number)
export default function RightDrawer({ open, onClose, transactions, accountId, onTransactionAdded }) {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('deposit');
  const [error, setError] = useState('');
  const [txList, setTxList] = useState(transactions || []);
  React.useEffect(() => { setTxList(transactions || []); }, [transactions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    try {
      await addTransaction(accountId, amount, type);
      // Refresh transaction list
      const res = await getTransactionsByAccountId(accountId);
      setTxList(res.data.transactions);
      setAmount('');
      setType('deposit');
      if (onTransactionAdded) onTransactionAdded();
    } catch (err) {
      setError('Failed to add transaction.');
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 2 }} role="presentation" className=" h-full">
        <Typography variant="h5" className='text-black font-bold flex justify-center items-center' gutterBottom>
          Account: 00000{accountId}
        </Typography>
        <Divider className='bg-yellow-500' sx={{ mb: 2 }} />
        <FormLabel onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
          <Typography variant="h6" className='text-black' gutterBottom>Add Transaction</Typography>
          <TextField
            id="amount-field"
            label="Amount"
            color='warning'
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            fullWidth
            size="small"
            sx={{ mb: 5 }}
            inputProps={{ min: 0.01, step: 0.01 }}
            required
          />
          <TextField
            id="type-field"
            select
            value={type}
            onChange={e => setType(e.target.value)}
            fullWidth
            label="Transaction Type"
            color='warning'
            size="small"
            sx={{ mb: 2 }}
            required
          >
            <MenuItem value="deposit">Deposit</MenuItem>
            <MenuItem value="withdrawal">Withdrawal</MenuItem>
          </TextField>
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>Add Transaction</Button>
        </FormLabel>

             <Divider className='bg-yellow-500' sx={{ mb: 2, mt: 2 }} />
        {txList && txList.length > 0 ? (
          <List>
            {txList.map((tx) => (
              <ListItem style={{ backgroundColor: "white", border: "1px solid black", marginBottom: "8px", borderRadius: "20px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }} key={tx.transaction_id}>
                <ListItemText
                  primary={`${tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}: $${Number(tx.amount).toFixed(2)}`}
                  secondary={`Transaction ID: ${tx.transaction_id}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography style={{ color: 'black', margin: '16px 0' }} variant="body2" color="text.secondary">
            No transactions found for this account.
          </Typography>
        )}
      </Box>
    </Drawer>
  );
}
