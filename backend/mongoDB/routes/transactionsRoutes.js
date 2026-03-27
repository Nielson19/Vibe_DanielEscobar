const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const TransactionModel = mongoose.models.Transaction || mongoose.model('Transaction', new mongoose.Schema({
	account_id: String,
	amount: Number,
	type: String, // 'deposit' or 'withdrawal'
}));
const AccountModel = mongoose.models.Account || mongoose.model('Account', new mongoose.Schema({
	user_id: String,
	balance: Number,
	account_type: String,
}));

// Create transaction for an account
router.post('/account/:account_id', async (req, res) => {
	const { account_id } = req.params;
	const { amount, type } = req.body;
	const account = await AccountModel.findById(account_id);
	if (!account) return res.status(404).json({ error: 'Account not found' });
	let new_balance = account.balance;
	if (type === 'deposit') {
		new_balance += Number(amount);
	} else if (type === 'withdrawal') {
		if (account.balance < amount) return res.status(400).json({ error: 'Insufficient funds' });
		new_balance -= Number(amount);
	} else {
		return res.status(400).json({ error: 'Invalid transaction type' });
	}
	account.balance = new_balance;
	await account.save();
	const tx = new TransactionModel({ account_id, amount, type });
	await tx.save();
	res.status(201).json({ message: 'Transaction created successfully', transaction: tx, currentBalance: new_balance });
});

// Get all transactions
router.get('/', async (req, res) => {
	const txs = await TransactionModel.find();
	res.json({ transactions: txs });
});

// Get transactions by account
router.get('/account/:account_id', async (req, res) => {
	const txs = await TransactionModel.find({ account_id: req.params.account_id });
	res.json({ transactions: txs });
});

module.exports = router;
